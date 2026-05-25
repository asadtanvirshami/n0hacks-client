import { z } from "zod";

/**
 * Contact Form Validation Schema
 * Ensures all contact form inputs are properly validated and sanitized
 */
export const ContactFormSchema = z.object({
  email: z
    .string("Email is required")
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters")
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase()
    .trim()
    .refine(
      (email) => !email.includes(".."),
      "Invalid email format (consecutive dots)"
    ),

  company: z
    .string("Company is required")
    .min(2, "Company must be at least 2 characters")
    .max(100, "Company must not exceed 100 characters")
    .trim()
    .regex(
      /^[a-zA-Z0-9\s\-\.&()]+$/,
      "Company contains invalid characters"
    )
    .refine(
      (company) => company.trim().length > 0,
      "Company cannot be empty or whitespace only"
    ),

  message: z
    .string("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must not exceed 5000 characters")
    .trim()
    .refine(
      (message) => message.trim().length > 0,
      "Message cannot be empty or whitespace only"
    ),
});

/**
 * Lead Form Validation Schema
 * For the leads API endpoint
 */
export const LeadsFormSchema = z.object({
  email: z
    .string("Email is required")
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters")
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase()
    .trim(),

  phone: z
    .string("Phone is required")
    .min(10, "Phone must be at least 10 characters")
    .max(20, "Phone must not exceed 20 characters")
    .regex(/^[\d\s\-\+\(\)]+$/, "Phone contains invalid characters")
    .optional()
    .or(z.literal("")),

  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .trim()
    .regex(
      /^[a-zA-Z\s\-']+$/,
      "Name contains invalid characters (only letters, spaces, hyphens, apostrophes allowed)"
    ),

  company: z
    .string("Company is required")
    .min(2, "Company must be at least 2 characters")
    .max(100, "Company must not exceed 100 characters")
    .trim(),

  serviceInterest: z
    .enum([
      "red-team",
      "penetration-testing",
      "vulnerability-assessment",
      "security-audit",
      "training",
      "other",
    ])
    .optional(),

  message: z
    .string()
    .max(5000, "Message must not exceed 5000 characters")
    .optional()
    .or(z.literal("")),
});

/**
 * Type definitions derived from schemas
 */
export type ContactFormData = z.infer<typeof ContactFormSchema>;
export type LeadsFormData = z.infer<typeof LeadsFormSchema>;

/**
 * Utility function to escape HTML and prevent XSS
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char] ?? char);
}

/**
 * Utility function to sanitize user input
 * Removes potentially dangerous characters
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[\x00-\x1F\x7F]/g, "") // Remove control characters
    .replace(/\s+/g, " "); // Normalize whitespace
}

/**
 * Validate API key format
 */
export const ApiKeySchema = z.object({
  apiKey: z
    .string()
    .min(32, "Invalid API key format")
    .max(256, "Invalid API key format")
    .regex(/^[a-zA-Z0-9\-_]+$/, "Invalid API key format"),
});

/**
 * Validate pagination parameters
 */
export const PaginationSchema = z.object({
  page: z
    .number()
    .int()
    .positive("Page must be a positive integer")
    .optional()
    .default(1),
  limit: z
    .number()
    .int()
    .positive("Limit must be a positive integer")
    .max(100, "Limit cannot exceed 100")
    .optional()
    .default(10),
});

export type PaginationParams = z.infer<typeof PaginationSchema>;
