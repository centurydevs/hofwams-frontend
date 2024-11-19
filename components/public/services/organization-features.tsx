"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Ban,
  Calendar,
  Check,
  Calculator,
  MessageSquare,
  Package,
  Users,
  Utensils,
} from "lucide-react";

import { containerVariants, itemVariants } from "@/utils";
import { Button } from "@/components/ui/button";

const organizationFeatures = [
  {
    title: "Event Creation and Customisation",
    description:
      "Hospitality businesses can collaborate with organisers to create customised events, including meal planning, venue setup, and other services.",
    icon: Calendar,
  },
  {
    title: "Comprehensive Capacity Management",
    description:
      "Businesses can track guest attendance in real time and manage event capacity to ensure smooth execution.",
    icon: Users,
  },
  {
    title: "Advanced Meal Planning",
    description:
      "Businesses can handle all aspects of meal planning for the event, including customised menus, portion control, and ingredient calculations.",
    icon: Utensils,
  },
  {
    title: "Pricing and Invoicing",
    description:
      "The app allows businesses to calculate and present organisers with an accurate price for the event, including food, venue, and services.",
    icon: Calculator,
  },
  {
    title: "Customer Interaction and Planning",
    description:
      "The app enables hospitality businesses to interact directly with organisers, ensuring all event logistics are handled, from guest seating arrangements to meal preferences.",
    icon: MessageSquare,
  },
  {
    title: "Full Inventory Management",
    description:
      "Track and manage both cooked and uncooked food inventory to avoid wastage and ensure efficiency.",
    icon: Package,
    subItems: [
      "Cooked Food Inventory: Track and manage cooked food items to avoid wastage and ensure efficiency.",
      "Uncooked Food Inventory: Manage raw ingredients, ensuring that everything required for the event is available and tracked.",
    ],
  },
  {
    title: "Ad-Free Experience",
    description:
      "Paid users enjoy a completely ad-free interface for uninterrupted use of the app.",
    icon: Ban,
  },
];

export const OrganizationFeatures = () => {
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
          ORGANIZATION
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          This mode is tailored for owners of hospitality businesses like
          restaurants, caterers, or event venues. It offers advanced features to
          allow businesses to handle large-scale event planning and management
          seamlessly.
          <span className="text-red-600 font-semibold ml-2">
            It requires payment
          </span>
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {organizationFeatures.map((feature) => (
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
                {feature.subItems && (
                  <ul className="mt-2 space-y-2">
                    {feature.subItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                      >
                        <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
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
