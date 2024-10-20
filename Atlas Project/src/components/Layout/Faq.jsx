import React, { useState } from "react";

const Faq = ({ curData, ontoggle, isActive }) => {
  const { question, answer } = curData;

  return (
    <li>
      <div className="accordion-grid">
        <p className="accordion-question">{question}</p>
        <button onClick={ontoggle} className={isActive ? "active-btn" : ""}>
          {isActive ? "👎" : "👍"}
        </button>
      </div>
      {isActive && (
        <p
          style={{
            padding: "10px 15px",
            backgroundColor: "#fafafa",
            color: "#555",
            fontSize: "16px",
            lineHeight: "1.5",
            borderRadius: "5px",
            marginTop: "5px",
          }}
        >
          {answer}
        </p>
      )}
    </li>
  );
};

export default Faq;
