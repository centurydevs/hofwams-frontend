"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    content: "Plot 12, hotspot lane, Edinburgh",
    href: "https://maps.google.com",
  },
  {
    icon: Phone,
    title: "Phone number",
    content: "+442 6637 3783 738",
    href: "tel:+4426637383738",
  },
  {
    icon: Mail,
    title: "Email Address",
    content: "hofwams@gmail.com",
    href: "mailto:hofwams@gmail.com",
  },
];

export const ContactInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-500">
          Find our office
        </h2>
        <h3 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
          Connect with the team
        </h3>
      </div>

      <div className="space-y-6">
        {contactInfo.map((item) => (
          <motion.a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400">
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {item.content}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};
