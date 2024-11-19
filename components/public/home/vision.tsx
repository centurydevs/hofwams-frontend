"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const VisionSection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-green-50 dark:bg-gray-900">
      {/* Background Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/30 dark:bg-green-800/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200/30 dark:bg-green-800/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square relative rounded-full overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                alt="Food waste illustration"
                fill
                className="object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent" />
            </div>
          </motion.div>

          {/* Vision Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-green-600 dark:bg-green-700 rounded-[40px] p-8 md:p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                OUR VISION
              </h2>
              <p className="text-lg md:text-xl leading-relaxed">
                To become a leading force in transforming the hospitality
                industry&apos;s approach to food waste management through
                cutting-edge, data-driven solutions. Our vision is to empower
                businesses with advanced tools and technologies that promote
                sustainability, enhance operational efficiency, and reduce
                environmental impact.
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-500/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-500/20 rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
