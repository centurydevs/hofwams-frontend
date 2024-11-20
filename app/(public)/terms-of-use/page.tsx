"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { terms } from "@/constants";

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      Object.entries(sectionRefs.current).forEach(([id, ref]) => {
        if (
          ref &&
          ref.offsetTop <= scrollPosition &&
          ref.offsetTop + ref.offsetHeight > scrollPosition
        ) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      const yOffset = -80; // Adjust this value to fine-tune the scroll position
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-green-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-gradient-to-r from-green-600 to-green-400 dark:from-green-900 dark:to-green-700">
        <div className="absolute inset-0 bg-grid-white/15" />
        <div className="relative container mx-auto h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Terms of Use
            </h1>
            <p className="text-green-100 text-lg">
              Last Updated: September 2024
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-[300px,1fr] gap-8">
          {/* Sidebar Navigation */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <nav className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <ul className="space-y-2">
                {terms.map((term) => (
                  <li key={term.id}>
                    <button
                      onClick={() => scrollToSection(term.id)}
                      className={`flex items-center gap-2 p-2 rounded-md transition-colors w-full text-left ${
                        activeSection === term.id
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                          : "hover:bg-green-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <ChevronRight
                        className={`w-4 h-4 ${
                          activeSection === term.id
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      />
                      <span className="text-sm">{term.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.aside>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
          >
            <div className="prose prose-green dark:prose-invert max-w-none">
              {terms.map((term) => (
                <section
                  key={term.id}
                  id={term.id}
                  ref={(el) => {
                    if (el) {
                      sectionRefs.current[term.id] = el;
                    }
                  }}
                  className="mb-12 scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold mb-4">{term.title}</h2>
                  {term.content && <p className="mb-4">{term.content}</p>}
                  {term.subsections && (
                    <div className="space-y-4 ml-6">
                      {term.subsections.map((subsection, index) => (
                        <div key={index}>
                          <h3 className="text-xl font-semibold mb-2">
                            {subsection.title}
                          </h3>
                          <p>{subsection.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {term.contactInfo && (
                    <div className="mt-4 space-y-2">
                      <p>
                        <strong>Email:</strong> {term.contactInfo.email}
                      </p>
                      <p>
                        <strong>Website:</strong> {term.contactInfo.website}
                      </p>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
