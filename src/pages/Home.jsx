import React, { lazy, Suspense } from "react";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import StatsSection from "../components/home/StatsSection";
import Features from "../components/home/Features";
import { useInView } from "../hooks/useInView";
import FadeInSection from "../components/common/FadeInSection";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Testimonials = lazy(() => import("../components/home/Testimonials"));
const Steps = lazy(() => import("../components/home/Steps"));
const FAQ = lazy(() => import("../components/home/FAQ"));

export const Home = () => {
  const [testimonialRef, isTestimonialInView] = useInView();
  const [stepsRef, isStepsInView] = useInView();
  const [faqRef, isFaqInView] = useInView();

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

      <div ref={testimonialRef}>
        {isTestimonialInView && (
          <Suspense fallback={<LoadingSpinner />}>
            <FadeInSection>
              <Testimonials />
            </FadeInSection>
          </Suspense>
        )}
      </div>

      <div ref={stepsRef}>
        {isStepsInView && (
          <Suspense fallback={<LoadingSpinner />}>
            <FadeInSection>
              <Steps />
            </FadeInSection>
          </Suspense>
        )}
      </div>

      <section id="faq" ref={faqRef}>
        {isFaqInView && (
          <Suspense fallback={<LoadingSpinner />}>
            <FadeInSection>
              <FAQ />
            </FadeInSection>
          </Suspense>
        )}
      </section>
    </div>
  );
};
