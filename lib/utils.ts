import { clsx, type ClassValue } from "clsx";
import { jwtVerify } from "jose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkStrength = (pass: string) => {
  const requirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[0-9]/, text: "At least 1 number" },
    { regex: /[a-z]/, text: "At least 1 lowercase letter" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  ];

  return requirements.map((req) => ({
    met: req.regex.test(pass),
    text: req.text,
  }));
};

export const getStrengthColor = (score: number) => {
  if (score === 0) return "bg-border";
  if (score <= 1) return "bg-red-500";
  if (score <= 2) return "bg-orange-500";
  if (score === 3) return "bg-amber-500";
  return "bg-emerald-500";
};

export const getStrengthText = (score: number) => {
  if (score === 0) return "Enter a password";
  if (score <= 2) return "Weak password";
  if (score === 3) return "Medium password";
  return "Strong password";
};

export const verifyToken = async (token: string | undefined) => {
  try {
    if (!token) return null;
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "");
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    console.error("Token verification failed:", JSON.stringify(error, null, 2));
    return null;
  }
};
