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
      {isActive && answer}
    </li>
  );
};

export default Faq;
