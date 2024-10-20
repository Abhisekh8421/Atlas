import React, { useEffect, useState } from "react";
import "../../App.css";
import faq from "../../Api/Faq.json";
import Faq from "../Layout/Faq";

const Accordion = () => {
  const [data, setData] = useState([]);
  const [activeId, setactiveId] = useState(false);

  useEffect(() => {
    setData(faq);
  }, []);

  const handleButton = (id) => {
    setactiveId((prev) => (prev == id ? false : id));
  };
  return (
    <>
      <h1
        style={{
          color: "#fff",
          textAlign: "center",
          fontSize: "3.4rem",
          textDecoration: "none",
          fontFamily: "syne",
          letterSpacing: "0.1rem",
        }}
      >
        Most Asked Questions
      </h1>
      <ul className="section-accordion">
        {data.map((ele) => {
          const { id } = ele;
          return (
            <Faq
              key={id}
              curData={ele}
              isActive={activeId === id}
              ontoggle={() => handleButton(id)}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Accordion;
