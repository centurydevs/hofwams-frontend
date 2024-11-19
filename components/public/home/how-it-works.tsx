"use client";

import { motion } from "framer-motion";
import { Database, LineChart, Lightbulb, BarChart3 } from "lucide-react";

import { Button } from "@/components/ui/button";

const processSteps = [
  {
    title: "Data collection",
    description:
      "Gather historical data on attendance, inventory, and consumption",
    icon: Database,
  },
  {
    title: "Predictive Analysis",
    description:
      "Use machine learning models to forecast demand and optimize portioning.",
    icon: LineChart,
  },
  {
    title: "Actionable Insights",
    description: "Receive recommendations to adjust inventory and reduce",
    icon: Lightbulb,
  },
  {
    title: "Monitor and Adjust",
    description: "Track performance and make real time changes",
    icon: BarChart3,
  },
];

export const HowItWorks = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-500 mb-4">
            How we do what we do
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-12 relative"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full shrink-0">
                <step.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>

              {index !== processSteps.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-12 bg-green-200 dark:bg-green-800 hidden md:block" />
              )}

              <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Want to reduce waste and save cost? Click on the button below to get
            started!!!
          </h3>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
          >
            Sign Up Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
