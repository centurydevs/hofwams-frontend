"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  PhoneIcon as WhatsApp,
} from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: WhatsApp, href: "#", label: "WhatsApp" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const footerLinks = {
  Links: [
    { label: "About us", href: "/about-us" },
    { label: "Services", href: "/services" },
    { label: "Terms of services", href: "/terms" },
    { label: "Privacy policy", href: "/privacy" },
  ],
  Support: [
    { label: "Account", href: "/account" },
    { label: "Feedback", href: "/feedback" },
    { label: "FAQs", href: "/faqs" },
  ],
  Information: [
    { label: "+234 7063 929 833", href: "tel:+2347063929833" },
    { label: "e - mail Address", href: "mailto:info@hofwams.com" },
  ],
};

export const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <footer className="bg-green-900 text-white py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-2xl font-bold">HOFWAMS</h2>
            <p className="text-gray-300 leading-relaxed">
              Explore our platform and join us in the movement towards reducing
              food waste and building a more sustainable future.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold">{title}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="border-t border-green-800 mt-12 pt-8 text-center text-gray-300"
        >
          <p>Copyright © {new Date().getFullYear()} - HOFWAMS</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};
