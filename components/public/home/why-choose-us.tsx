"use client";

import { motion } from "framer-motion";
import { DollarSign, Leaf, BarChart2, Expand } from "lucide-react";

const features = [
  {
    title: "Cost Efficiency",
    description: "Reduce operational costs by minimizing food waste",
    icon: DollarSign,
  },
  {
    title: "Sustainability",
    description: "Contribute to environmental efforts with a greener approach",
    icon: Leaf,
  },
  {
    title: "Data-Driven Insights",
    description: "Make informed decisions based on analytics",
    icon: BarChart2,
  },
  {
    title: "Scalability",
    description: "Adaptable to different hospitality businesses",
    icon: Expand,
  },
];

export const WhyChooseUs = () => {
  return (
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
                <feature.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
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
  );
};
