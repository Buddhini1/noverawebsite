import { z } from "zod";

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z
    .string()
    .trim()
    .max(255, { message: "Email must be under 255 characters" })
    .email({ message: "Enter a valid email address" })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(7, { message: "Enter a valid phone number" })
    .max(30, { message: "Phone number must be under 30 characters" })
    .regex(/^[0-9+()\-\s]+$/, { message: "Phone can only contain digits and + ( ) -" }),
  destination: z.string().trim().max(80).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(2000, { message: "Message must be under 2000 characters" })
    .optional()
    .or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const leadStatuses = ["new", "contacted", "in_progress", "closed"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  in_progress: "In progress",
  closed: "Closed",
};
