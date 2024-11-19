"use client";

import {
  HomeHero,
  Features,
  WhatWeDo,
  ProblemStatement,
  WhyChooseUs,
  HowItWorks,
  VisionSection,
} from "@/components/public";

export default function HomePage() {
  return (
    <main
      className={`dark:bg-gray-900 dark:text-white transition-colors duration-300`}
    >
      <HomeHero />

      <ProblemStatement />

      <Features />

      <WhatWeDo />

      <WhyChooseUs />

      <HowItWorks />

      <VisionSection />
    </main>
  );
}
