/* Interactive 3D TiltCard with split status badge, full-card hover image expand & ClippedCircle. */
import { Tilt } from "./Tilt.jsx";
import { ClippedCircle } from "./ClippedCircle.jsx";

export function TiltCard({
  title,
  description,
  price,
  badgeLabel,
  badgeVariant = "success",
  imageSrc,
  imageAlt = "",
  href,
  children,
  tiltProps,
  className = "",
  ...props
}) {
  const inner = (
    <Tilt
      rotationFactor={11}
      {...tiltProps}
      className={`tilt-card ${className}`.trim()}
    >
      <div className="tilt-card-head">
        <div className="tilt-card-meta">
          <h4 className="tilt-card-title">{title}</h4>
          {description && <p className="tilt-card-desc">{description}</p>}
          {children && <div className="tilt-card-extra">{children}</div>}
        </div>

        {price && badgeLabel ? (
          <div className="tilt-badge-split">
            <span className="tilt-badge-price">{price}</span>
            <span className={`tilt-badge-label is-${badgeVariant}`}>{badgeLabel}</span>
          </div>
        ) : price ? (
          <span className="tilt-badge-single">{price}</span>
        ) : null}
      </div>

      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          width={288}
          height={224}
          loading="lazy"
          decoding="async"
          className="tilt-card-image"
        />
      )}

      <div className="tilt-card-hover-scrim" aria-hidden="true" />
      <ClippedCircle circleSize={800} />
    </Tilt>
  );

  if (href) {
    return (
      <a href={href} className="tilt-card-link" {...props}>
        {inner}
      </a>
    );
  }

  return (
    <div className="tilt-card-wrap" {...props}>
      {inner}
    </div>
  );
}

export default TiltCard;
