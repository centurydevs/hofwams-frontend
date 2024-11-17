"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { HomeHero } from "@/components/public";

export default function HomePage() {
  return (
    <main
      className={`dark:bg-gray-900 dark:text-white transition-colors duration-300`}
    >
      <HomeHero />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="py-20 dark:bg-gray-800"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://images.unsplash.com/photo-1505935428862-770b6f24f629"
                alt="Food waste"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="font-fraunces text-3xl md:text-4xl font-bold mb-6 dark:text-white">
                The food waste challenge
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Food waste is a critical issue in the hospitality industry,
                leading to economic losses and environmental impact. Our
                solution helps businesses reduce waste, improve efficiency, and
                contribute to sustainability.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-gray-50 dark:bg-gray-900 py-20"
      >
        <div className="container mx-auto px-4">
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-center mb-12 dark:text-white">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Cost Efficiency",
                description:
                  "Reduce operational costs by minimizing food waste",
              },
              {
                title: "Sustainability",
                description:
                  "Contribute to environmental efforts with a greener approach",
              },
              {
                title: "Data-Driven Insights",
                description: "Make informed decisions based on analytics",
              },
              {
                title: "Scalability",
                description: "Adaptable to different hospitality businesses",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
              >
                <h3 className="font-bold text-xl mb-3 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}
