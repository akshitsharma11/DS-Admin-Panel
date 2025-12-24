import "./FeatureAnnotation.css";

/**
 * Feature Annotation Component
 * Shows arrow and tooltip explaining a feature/button
 * Simple positioning relative to parent container
 */
export function FeatureAnnotation({
  position = "top", // top, bottom, left, right
  text,
  className = "",
}) {
  return (
    <div
      className={`feature-annotation feature-annotation-${position} ${className}`}
    >
      <div className="annotation-tooltip">
        <div className="annotation-icon">💡</div>
        <p className="annotation-text">{text}</p>
      </div>
      <div className="annotation-arrow"></div>
    </div>
  );
}
