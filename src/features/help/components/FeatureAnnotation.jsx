import "./FeatureAnnotation.css";

/**
 * Feature Annotation Component
 * Shows arrow and tooltip explaining a feature/button
 * Simple positioning relative to parent container
 */
export function FeatureAnnotation({
  position = "top", // top, bottom, left, right, top-right, top-left, bottom-right, bottom-left
  text,
  className = "",
  style = {},
  innerStyle = {},
}) {
  return (
    <div
      className={`feature-annotation feature-annotation-${position} ${className}`}
      style={style}
    >
      <div className="annotation-tooltip" style={innerStyle}>
        <div className="annotation-icon">💡</div>
        <p className="annotation-text">{text}</p>
      </div>
      <div className="annotation-arrow"></div>
    </div>
  );
}
