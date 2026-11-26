/* ==========================================================================
   FATAH AI — offline matcher
   --------------------------------------------------------------------------
   No API, no key, no network. The knowledge base lives in data.js and this
   file only decides "which intent does this message look like" and returns
   that intent's pre-written answer.
   ========================================================================== */

/* --- normalise: lowercase, strip punctuation, collapse spaces ------------- */
function norm(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* --- tiny stemmer: drops common English/Urdu suffixes so "prices",
       "pricing", "pricey" all compare against "price" --------------------- */
function stem(word) {
  let w = word;
  if (w.length > 5) w = w.replace(/(ings?|ed|es|s)$/, "");
  if (w.length > 6) w = w.replace(/(on|an|en)$/, "");
  return w;
}

/* --- Levenshtein distance, capped: typo tolerance ("prce", "locaton") ---- */
function editDistance(a, b, max = 2) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const prev = new Array(b.length + 1);
  const cur = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j += 1) prev[j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    cur[0] = i;
    let rowMin = cur[0];
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      rowMin = Math.min(rowMin, cur[j]);
    }
    if (rowMin > max) return max + 1;
    for (let j = 0; j <= b.length; j += 1) prev[j] = cur[j];
  }
  return prev[b.length];
}

/* --- words that carry no meaning on their own ---------------------------- */
const STOP = new Set(
  ("a an the is are was were be been am do does did you your i me my we our of for to in on at " +
   "and or but if then so it its this that these those what which who how when where why can could " +
   "would should will please tell give show any some about with from by as not no " +
   "ka ki ke ko kya kia hai hain he ho hoon hum aap apna apni mera meri mujhe aur ya bhi " +
   "me mein se par per tak koi kuch batao bata bataye dein dena do kar karna karte karta " +
   "sakte sakta chahte chahiye abhi kahan kisi unse inse humein mujhse unka unki ap ").split(" ")
);

function hasContent(words) {
  return words.some((w) => w.length > 2 && !STOP.has(w));
}

/* --- does a keyword appear in the message? ------------------------------- */
function keywordHit(messageWords, keyword) {
  const kw = norm(keyword);
  if (!kw) return 0;
  const kwWords = kw.split(" ");

  // multi-word keyword: check the joined message string
  if (kwWords.length > 1) {
    return messageWords.join(" ").includes(kw) ? 1 : 0;
  }

  const target = stem(kw);
  for (const raw of messageWords) {
    const w = stem(raw);
    if (w === target) return 1;
    // short words: no fuzzy (too many false positives)
    if (target.length > 4 && editDistance(w, target, 1) <= 1) return 0.8;
    // prefix match, but only when both sides are long enough to be meaningful
    // ("approv" → "approvals" is fine; "a" → "approval" is not)
    if (target.length >= 6 && w.length >= 5 && (w.startsWith(target) || target.startsWith(w))) {
      return 0.8;
    }
  }
  return 0;
}

/* --- score every intent, pick the best ---------------------------------- */
export function matchIntent(text, intents) {
  const words = norm(text).split(" ").filter(Boolean);
  if (!words.length) return { intent: null, score: 0 };

  const joined = words.join(" ");
  const contentWords = words.filter((w) => w.length > 2 && !STOP.has(w));
  let best = null;
  let bestScore = 0;

  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords || []) score += keywordHit(words, kw);

    // the typed text being an exact sample question is the strongest signal
    for (const q of intent.examples || []) {
      const qNorm = norm(q);
      if (!qNorm) continue;
      if (qNorm === joined) score += 3;
      else {
        /* only meaningful words count — otherwise "what is …" would match
           every example sentence and drag unrelated intents up */
        const qWords = qNorm.split(" ").filter((w) => w.length > 2 && !STOP.has(w));
        if (!qWords.length) continue;
        const overlap = qWords.filter((w) =>
          contentWords.some((cw) => cw === w || stem(cw) === stem(w))
        ).length;
        score += (overlap / qWords.length) * 2.2;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  return { intent: best, score: bestScore };
}

/* where does this intent first show up in the message? (keeps reply order
   the same as the question: "price aur location" → price first) */
function positionOf(text, intent) {
  const joined = norm(text);
  let min = Infinity;
  for (const kw of intent.keywords || []) {
    const at = joined.indexOf(norm(kw));
    if (at >= 0 && at < min) min = at;
  }
  return min;
}

/* --- one message can ask two things ("icon ka price aur location?") ----- */
export function matchIntents(text, intents, { threshold = 1, max = 2 } = {}) {
  const first = matchIntent(text, intents);
  if (!first.intent || first.score < threshold) return [];

  const results = [first.intent];
  let cursor = norm(text);

  if (max > 1) {
    // strip what the first intent already answered, then look again
    for (const kw of first.intent.keywords || []) {
      cursor = cursor.replace(new RegExp(`\\b${norm(kw)}\\b`, "g"), " ");
    }
    const rest = cursor.replace(/\s+/g, " ").trim();
    // need at least one meaningful word left, otherwise there is no 2nd question
    if (hasContent(rest.split(" "))) {
      const second = matchIntent(rest, intents.filter((i) => i.id !== first.intent.id));
      if (second.intent && second.score >= 1.6) results.push(second.intent);
    }
  }

  return results.sort((a, b) => positionOf(text, a) - positionOf(text, b));
}

export const SUGGESTIONS_AFTER_MISS = ["Prices", "Projects", "Location", "Contact"];

/* what to offer after a given intent — keeps chips relevant */
export const FOLLOW_UPS = {
  prices: ["Projects", "Location", "Site visit", "Contact"],
  projects: ["Prices", "Location", "Approvals", "Photos"],
  location: ["Projects", "Site visit", "Contact", "Prices"],
  approvals: ["Projects", "Prices", "Location", "Contact"],
  sitevisit: ["Contact", "Location", "Prices", "Projects"],
  contact: ["Site visit", "Prices", "Location", "Projects"],
  about: ["Projects", "Approvals", "Contact", "Prices"],
  services: ["Projects", "Prices", "Contact", "Site visit"],
  units: ["Prices", "Projects", "Site visit", "Contact"],
  news: ["Projects", "Photos", "Contact", "Prices"],
  gallery: ["Projects", "Site visit", "Prices", "Contact"],
  human: ["Contact", "Site visit", "Prices", "Projects"],
  greeting: ["Prices", "Projects", "Location", "Approvals"],
  thanks: ["Prices", "Projects", "Site visit", "Contact"],
};
