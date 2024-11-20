"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "Reducing Food Waste in Restaurants: A Comprehensive Guide",
    excerpt:
      "Learn effective strategies to minimize food waste in your restaurant, saving money and helping the environment.",
    author: "Jane Doe",
    date: "2024-11-15",
    readTime: "8 min read",
    image: "/placeholder.svg?height=400&width=600",
    category: "Restaurant Management",
  },
  {
    id: 2,
    title: "The Future of Sustainable Catering: Trends to Watch",
    excerpt:
      "Explore upcoming trends in sustainable catering that are shaping the future of the food service industry.",
    author: "John Smith",
    date: "2024-11-10",
    readTime: "6 min read",
    image: "/placeholder.svg?height=400&width=600",
    category: "Sustainability",
  },
  {
    id: 3,
    title: "Maximizing Efficiency in Event Planning with HOFWAMS",
    excerpt:
      "Discover how HOFWAMS can streamline your event planning process and reduce waste.",
    author: "Emily Johnson",
    date: "2024-11-05",
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=600",
    category: "Event Planning",
  },
  {
    id: 4,
    title: "The Impact of Food Waste on Climate Change",
    excerpt:
      "Understanding the environmental consequences of food waste and how we can make a difference.",
    author: "Michael Brown",
    date: "2024-10-30",
    readTime: "7 min read",
    image: "/placeholder.svg?height=400&width=600",
    category: "Environment",
  },
  {
    id: 5,
    title: "Innovative Technologies in Food Waste Management",
    excerpt:
      "Explore cutting-edge technologies that are revolutionizing how we handle and reduce food waste.",
    author: "Sarah Lee",
    date: "2024-10-25",
    readTime: "9 min read",
    image: "/placeholder.svg?height=400&width=600",
    category: "Technology",
  },
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-green-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-gradient-to-r from-green-600 to-green-400 dark:from-green-900 dark:to-green-700">
        <div className="absolute inset-0 bg-grid-white/15" />
        <div className="relative container h-full flex items-center justify-center">
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
        {/* Search Bar */}
        <div className="mb-12">
          <Input
            type="text"
            placeholder="Search articles by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xl mx-auto"
          />
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-600 dark:text-green-400 font-semibold">
                    {post.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.author}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <Link href={`/blog/${post.id}`} passHref>
                  <Button className="w-full mt-4" variant="outline">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No articles found matching your search.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
