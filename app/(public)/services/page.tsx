import {
  FeatureComparison,
  IndividualFeatures,
  OrganizationFeatures,
  ServicesHero,
} from "@/components/public";

const ServicesPage = () => {
  return (
    <main className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <ServicesHero />

      <div className="bg-green-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          {/* Individual Section */}
          <IndividualFeatures />

          {/* Organization Section */}
          <OrganizationFeatures />

          {/* Comparison Section */}
          <FeatureComparison />
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;
