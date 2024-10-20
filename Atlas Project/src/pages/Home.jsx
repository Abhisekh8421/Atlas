import React from "react";
import HeroSection from "../components/UI/HeroSection";
import About from "./About";
import Accordion from "../components/UI/Accordion";

const Home = () => {
  return (
    <>
      <HeroSection />
      <About />
      <Accordion />
    </>
  );
};

export default Home;
