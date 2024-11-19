"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Package,
  Link,
  PenTool,
  ClipboardList,
  Briefcase,
  BarChart2,
  Speaker,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { containerVariants, itemVariants } from "@/utils";

const individualFeatures = [
  {
    title: "Guest Management",
    description:
      "A unique link is generated for the organiser, which can be shared with friends and family to register as guests for the event.",
    icon: Link,
  },
  {
    title: "Event Creation",
    description:
      "Organisers can create an event by naming it and listing the food and drinks they wish to serve.",
    icon: PenTool,
  },
  {
    title: "Capacity Management",
    description:
      "Organisers must manually track their guest list and manage the event's capacity on their own.",
    icon: ClipboardList,
  },
  {
    title: "Freelancer Services",
    description:
      "Access to a marketplace where organisers can find and hire freelancers (chefs, bakers, caterers, venue providers) to assist with meal planning, cooking, venue booking, and other event needs.",
    icon: Briefcase,
  },
  {
    title: "Limited Inventory Management",
    description:
      "Organisers can manage basic inventory items like drinks and appetizers but with restrictions on the number of items.",
    icon: Package,
  },
  {
    title: "Basic Reporting",
    description:
      "Simple event and guest statistics to help organisers understand attendance trends and preferences.",
    icon: BarChart2,
  },
  {
    title: "Ads Supported",
    description: "Free users will experience ads within the app.",
    icon: Speaker,
  },
];

export const IndividualFeatures = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="mb-20"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-500 mb-4">
          INDIVIDUAL
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          This mode is designed for individual organisers who manage their
          events independently. They have access to essential features but will
          need to handle much of the event logistics themselves.
          <span className="text-red-600 font-semibold ml-2">It is FREE</span>
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {individualFeatures.map((feature) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <feature.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="mt-8 text-center">
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Get This
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.section>
  );
};
