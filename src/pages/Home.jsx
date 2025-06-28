import React from "react";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import StatsSection from '../components/home/StatsSection';
import Features from "../components/home/Features";
import Testimonials from "../components/home/Testimonials";
import Steps from "../components/home/Steps";
import FAQ from "../components/home/FAQ";


export const Home = () => {
  return (
    <div className="bg-green-50 min-h-screen w-screen">
      <section id="hero">
      <Hero />
      </section>
      <section id="about">
      <About />
      </section>
      <StatsSection /> 
      <Features />
      <Testimonials />
      <Steps />
      <section id="faq">
      <FAQ />
      </section>
    </div>
  );
};
