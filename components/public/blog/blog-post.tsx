"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Facebook,
  Linkedin,
  Twitter,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

// Mock data for a single blog post
const blogPost = {
  id: 1,
  title: "Reducing Food Waste in Restaurants: A Comprehensive Guide",
  content: `
    <p>Food waste is a significant issue in the restaurant industry, with environmental and economic implications. This comprehensive guide explores effective strategies to minimize food waste in your restaurant, helping you save money and contribute to a more sustainable future.</p>

    <h2>1. Conduct a Waste Audit</h2>
    <p>Begin by assessing your current waste levels. Track what's being thrown away, when, and why. This information will help you identify problem areas and set realistic reduction goals.</p>

    <h2>2. Implement Inventory Management Systems</h2>
    <p>Use digital inventory tools to track stock levels, expiration dates, and usage patterns. This can help prevent over-ordering and reduce spoilage.</p>

    <h2>3. Train Staff on Proper Food Handling</h2>
    <p>Educate your team on best practices for food storage, preparation, and portion control. Proper training can significantly reduce waste due to spoilage or overproduction.</p>

    <h2>4. Optimize Menu Planning</h2>
    <p>Design your menu to use ingredients across multiple dishes. This approach, known as cross-utilization, can help reduce waste and lower food costs.</p>

    <h2>5. Embrace the "First In, First Out" (FIFO) Method</h2>
    <p>Organize your storage areas so that older ingredients are used before newer ones. This simple practice can greatly reduce spoilage.</p>

    <h2>6. Offer Flexible Portion Sizes</h2>
    <p>Consider providing different portion options to cater to varying appetites. This can reduce plate waste and improve customer satisfaction.</p>

    <h2>7. Donate Excess Food</h2>
    <p>Partner with local food banks or charities to donate surplus food that's still safe to eat. This not only reduces waste but also supports your community.</p>

    <h2>8. Compost Unavoidable Food Waste</h2>
    <p>For food scraps that can't be avoided, implement a composting system. This turns waste into a valuable resource for gardening or agriculture.</p>

    <h2>Conclusion</h2>
    <p>Reducing food waste in restaurants requires a multifaceted approach and ongoing commitment. By implementing these strategies, you can significantly decrease your environmental impact, reduce costs, and potentially even enhance your reputation as a sustainable business. Remember, every small step counts towards creating a more sustainable food service industry.</p>
  `,
  author: "Jane Doe",
  date: "2024-11-15",
  readTime: "8 min read",
  image: "/placeholder.svg?height=600&width=1200",
  category: "Restaurant Management",
};

export default function BlogPostPage() {
  return (
    <main className="min-h-screen bg-green-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={blogPost.image}
          alt={blogPost.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative container h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl mx-auto">
              {blogPost.title}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-green-100">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  {new Date(blogPost.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" passHref>
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
          >
            <div
              className="prose prose-green dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </motion.article>

          {/* Share buttons */}
          <div className="mt-8 flex items-center justify-center space-x-4">
            <Button variant="outline" size="icon">
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Share on Facebook</span>
            </Button>
            <Button variant="outline" size="icon">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Share on Twitter</span>
            </Button>
            <Button variant="outline" size="icon">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">Share on LinkedIn</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
