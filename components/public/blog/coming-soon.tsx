"use client";

import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogIllustration } from "@/components/illustration/blog";

export function BlogComingSoon() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(
      <div>
        <h1>Subscription Successful!</h1>
        <p>You&apos;ll be notified when our blog launches.</p>
      </div>
    );

    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-green-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-gradient-to-r from-emerald-600 to-green-400 dark:from-green-900 dark:to-green-700">
        <div className="absolute inset-0 bg-grid-white/15" />
        <div className="relative container mx-auto h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              HOFWAMS Blog
            </h1>
            <p className="text-green-100 text-lg max-w-2xl mx-auto">
              Insights, tips, and stories about food waste management,
              sustainability, and event planning
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">
              Coming Soon!
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We&apos;re working hard to bring you valuable content. Stay tuned
              for our launch!
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <BlogIllustration />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
          >
            <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4 text-center">
              Get Notified When We Launch
            </h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="text-green-50"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4">
              What to Expect
            </h3>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2 inline-block text-left">
              <li className="flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-500" />
                Expert tips on reducing food waste
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-500" />
                Sustainable event planning strategies
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-500" />
                Industry insights and trends
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-500" />
                Success stories from our clients
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
