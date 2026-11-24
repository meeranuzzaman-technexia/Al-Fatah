/* Membership & Approvals — three equal, motion-enhanced credential tiles. */
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { APPROVALS } from "../../data.js";
import { Container } from "../ported/ui.jsx";
import "../../styles/approvals.css";

const EASE = [0.22, 1, 0.36, 1];
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } };
const rise = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };
const logoReveal = { hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 }, show: { clipPath: "inset(0 0% 0 0)", opacity: 1, transition: { duration: 0.9, ease: EASE, delay: 0.15 } } };
const tick = { hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.6, ease: EASE, delay: 0.6 } } };

function Tile({ item }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 140, damping: 18, mass: 0.4 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const gx = useTransform(sx, [-0.5, 0.5], [0, 100]);
  const gy = useTransform(sy, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(184, 140, 50, 0.22), transparent 60%)`;
  const onMove = (e) => { if (reduce || e.pointerType !== "mouse") return; const r=e.currentTarget.getBoundingClientRect(); mx.set((e.clientX-r.left)/r.width-.5); my.set((e.clientY-r.top)/r.height-.5); };
  const onLeave = () => { mx.set(0); my.set(0); };
  const Wrapper = item.href ? motion.a : motion.div;
  const linkProps = item.href ? { href:item.href, target:"_blank", rel:"noreferrer", "aria-label":item.label } : {};
  return <motion.li className="apv-cell" variants={rise}>
    <Wrapper className="apv-tile" onPointerMove={onMove} onPointerLeave={onLeave} style={reduce?undefined:{rotateX,rotateY,transformPerspective:1100}} {...linkProps}>
      <motion.span className="apv-glare" style={{background:glare}} aria-hidden="true" />
      <span className="apv-tag">{item.tag}</span>
      <motion.span className="apv-logo-wrap" variants={logoReveal}><img src={item.logo} alt={item.alt} className="apv-logo" loading="lazy" decoding="async" /></motion.span>
      <span className="apv-caption"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="11" className="apv-ring"/><motion.path d="M7 12.5l3.2 3.2L17 9" className="apv-tick" variants={tick}/></svg><span>{item.caption}</span></span>
    </Wrapper>
  </motion.li>;
}

export function ApprovalsSection() {
  const items = [
    { key:"member", tag:APPROVALS.memberHeading, logo:APPROVALS.memberLogo, alt:"ABAD — Association of Builders And Developers of Pakistan", href:APPROVALS.memberHref, label:APPROVALS.member, caption:APPROVALS.membershipNumber },
    ...APPROVALS.approvals.map((a,index)=>({ key:a.key??a.label??`approval-${index}`, tag:APPROVALS.approvalsHeading, logo:a.logo, alt:a.label, href:a.href, label:a.label, caption:a.label })),
  ];
  return <section className="section section-alt apv" data-header-theme="light"><Container>
    <motion.div className="apv-inner" variants={stagger} initial="hidden" whileInView="show" viewport={{once:true,amount:.25}}>
      <motion.header className="apv-head" variants={rise}><span className="eyebrow">{APPROVALS.intro}</span><h2 className="section-title">Member of &amp; Approvals</h2></motion.header>
      <ul className="apv-grid">{items.map(item=><Tile key={item.key} item={item}/>)}</ul>
      <motion.p className="apv-claim" variants={rise}><span className="apv-claim-line" aria-hidden="true"/>{APPROVALS.claim}</motion.p>
    </motion.div>
  </Container></section>;
}
