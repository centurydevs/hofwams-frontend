"use client";

import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/common/logo";
import {
  ForgotPasswordForm,
  LoginForm,
  OTPVerificationForm,
  RegisterForm,
  ResetPasswordForm,
} from "@/components/auth";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [showOTPVerification, setShowOTPVerification] = useState(false);

  const handleLoginSuccess = () => {
    setShowOTPVerification(true);
  };

  const handleOTPVerificationSuccess = () => {
    // Here you would typically redirect to the main app or dashboard
    console.log("OTP verified successfully. Redirect to dashboard.");
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background shapes */}
      <div className="fixed inset-0 bg-sage-50 dark:bg-gray-950">
        <div className="absolute inset-0">
          <div className="absolute -left-1/4 -top-1/4 w-3/4 h-3/4 bg-green-100/50 dark:bg-green-900/20 rounded-full blur-3xl transform rotate-12" />
          <div className="absolute -right-1/4 -bottom-1/4 w-3/4 h-3/4 bg-green-100/50 dark:bg-green-900/20 rounded-full blur-3xl transform -rotate-12" />
        </div>
      </div>

      {/* Home button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 left-4 z-10"
      >
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-full shadow-lg cursor-pointer"
          >
            <Home className="w-6 h-6 text-green-600 dark:text-green-400" />
            <span className="sr-only">Back to Home</span>
          </motion.div>
        </Link>
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl space-y-8 relative z-10"
      >
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Logo />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white"
          >
            Welcome to HOFWAMS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-2 text-sm text-gray-600 dark:text-gray-400"
          >
            Manage your food waste efficiently
          </motion.p>
        </div>

        <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-950/50 border border-white/20 dark:border-gray-800/30 shadow-2xl">
          <CardContent className="pt-6">
            {showOTPVerification ? (
              <OTPVerificationForm
                onVerificationSuccess={handleOTPVerificationSuccess}
              />
            ) : (
              <>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/50 dark:bg-gray-900/50">
                    <TabsTrigger
                      value="login"
                      className="data-[state=active]:bg-white/80 dark:data-[state=active]:bg-gray-800/80"
                    >
                      Login
                    </TabsTrigger>
                    <TabsTrigger
                      value="register"
                      className="data-[state=active]:bg-white/80 dark:data-[state=active]:bg-gray-800/80"
                    >
                      Register
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="login">
                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                  </TabsContent>
                  <TabsContent value="register">
                    <RegisterForm />
                  </TabsContent>
                </Tabs>

                {activeTab === "login" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center mt-4"
                  >
                    <button
                      onClick={() => setActiveTab("forgotPassword")}
                      className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                    >
                      Forgot your password?
                    </button>
                  </motion.div>
                )}

                {activeTab === "forgotPassword" && <ForgotPasswordForm />}
                {activeTab === "resetPassword" && <ResetPasswordForm />}
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
