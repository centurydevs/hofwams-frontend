import { fadeInUp } from "@/utils";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import Image from "next/image";

export const WhatWeDo = () => {
  return (
    <motion.section
      className="mt-24 grid lg:grid-cols-2 gap-12 items-center container mx-auto px-4"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <div className="order-2 lg:order-1">
        <Image
          src="/assets/what-we-do2.png"
          width={400}
          height={400}
          alt="Team collaboration illustration"
          className=""
        />
      </div>
      <div className="space-y-6 order-1 lg:order-2">
        <h2 className="text-4xl font-bold text-green-800 dark:text-green-100">
          What we do........
        </h2>
        <ul className="space-y-4">
          {[
            "Advanced forecasting for accurate guest attendance and meal planning.",
            "Customizable reports for business insights.",
            "User-friendly interface for seamless integration into daily operations.",
            "Real-time inventory tracking and waste analysis.",
          ].map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-start space-x-2"
              variants={fadeInUp}
            >
              <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <span className="text-lg text-green-700 dark:text-green-200">
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

{
  /* <section className="bg-green-50 dark:bg-green-900 py-16 overflow-hidden">
</section> */
}
