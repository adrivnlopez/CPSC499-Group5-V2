import React, { useState } from "react";
import "../styles/Card.css";

const Card = ({
  RichMedia = "/images/Default_Card_Image.jpg",
  tag,
  title,
  subtitle,
  details,
  variant = "original",
  buttonLabel = "Expand",
  onButtonClick,
  linkButton = false, // Determines if the button acts as a link
  linkUrl = "#", // URL for the link-style button
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    if (linkButton) return; // Skip toggle if it's a link-style button
    setExpanded((prev) => !prev); // Correctly toggle expanded state
    if (onButtonClick) onButtonClick(); // Call any external button click handler
  };

  return (
    <div className={`card ${variant} ${expanded ? "expanded" : ""}`}>
      {/* Render image and tag */}
      {variant === "original" && (
        <div className="card-image">
          <img src={RichMedia} alt="Card visual" />
          {tag && <div className="card-tag">{tag}</div>}
        </div>
      )}
      <div className="card-content">
        {/* Title and subtitle */}
        <h3 className="card-title">{title}</h3>
        <h4 className="card-subtitle">{subtitle}</h4>

        {/* Details in expanded mode */}
        {expanded && <p className="card-details">{details}</p>}

        {/* Action button */}
        {linkButton ? (
          <a href={linkUrl} className="card-button">
            {buttonLabel}
          </a>
        ) : (
          <button className="card-button" onClick={toggleExpand}>
            {expanded ? "Collapse" : buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;