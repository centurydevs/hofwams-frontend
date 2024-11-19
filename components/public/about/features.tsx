"use client";

import { motion } from "framer-motion";
import {
  Users,
  BarChart,
  Calendar,
  Bell,
  Leaf,
  ChefHat,
  LineChart,
  LayoutDashboard,
} from "lucide-react";

import { containerVariants, itemVariants } from "@/utils";

const features = [
  {
    title: "Accurate Guest Attendance Forecasting",
    description:
      "Utilize advanced data analytics to predict guest attendance for events and daily operations, reducing over-preparation and waste.",
    icon: Users,
  },
  {
    title: "Inventory Management",
    description:
      "Track and manage inventory in real-time to ensure accurate stock levels, prevent over-purchasing, and minimize expired or unused ingredients.",
    icon: BarChart,
  },
  {
    title: "Menu Optimization",
    description:
      "Tailor meal portions and menu items based on demand forecasts and customer preferences, ensuring optimal food use while maintaining variety.",
    icon: ChefHat,
  },
  {
    title: "Waste Monitoring and Reporting",
    description:
      "Automatically track food waste levels and generate detailed reports to help identify areas for improvement in kitchen processes.",
    icon: LineChart,
  },
  {
    title: "Customizable Alerts and Notifications",
    description:
      "Receive real-time alerts on stock levels, predicted demand, and waste thresholds to make informed decisions on the go.",
    icon: Bell,
  },
  {
    title: "Sustainability Metrics",
    description:
      "Measure the environmental impact of your waste reduction efforts, including CO2 savings and food waste diversion from landfills.",
    icon: Leaf,
  },
];

const moreFeatures = [
  {
    title: "Event Planning Support",
    description:
      "Assist event organizers and caterers in preparing for specific guest counts, providing tailored recommendations to minimize excess.",
    icon: Calendar,
  },
  {
    title: "User-Friendly Dashboard",
    description:
      "Access all key insights and tools through an intuitive dashboard, designed for ease of use by chefs, caterers, and hospitality professionals.",
    icon: LayoutDashboard,
  },
  {
    title: "Multi-User Access",
    description:
      "Allow multiple team members to collaborate and manage operations, from kitchen staff to event planners, ensuring everyone is on the same page.",
    icon: Users,
  },
];

export const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-500 mb-4">
              What we are offering
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <feature.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
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

          <motion.div variants={itemVariants} className="text-center mt-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-500 mb-8">
              More...............
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {moreFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <feature.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
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
        </motion.div>
      </div>
    </section>
  );
};
