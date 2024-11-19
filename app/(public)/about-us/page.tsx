import {
  AboutFeatures,
  AboutHero,
  OurApproach,
  Sustainability,
  Vision,
  Welcome,
} from "@/components/public";

const AboutPage = () => {
  return (
    <main
      className={`dark:bg-gray-900 dark:text-white transition-colors duration-300`}
    >
      <AboutHero />

      <div className="bg-green-50 dark:bg-gray-900">
        <Welcome />
        <OurApproach />
        <AboutFeatures />
        <Vision />
        <Sustainability />
      </div>
    </main>
  );
};

export default AboutPage;
