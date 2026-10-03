import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Appointment requests submitted from the booking form
 * (phone appointments and in-person appointments).
 */
export const appointmentRequests = pgTable(
  "appointment_requests",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    appointmentType: varchar("appointment_type", { length: 20 }).notNull(),
    firstName: varchar("first_name", { length: 120 }).notNull(),
    lastName: varchar("last_name", { length: 120 }).notNull(),
    phone: varchar("phone", { length: 40 }).notNull(),
    email: varchar("email", { length: 200 }).notNull(),
    propertyAddress: varchar("property_address", { length: 300 }),
    city: varchar("city", { length: 120 }),
    state: varchar("state", { length: 60 }),
    zipCode: varchar("zip_code", { length: 20 }),
    service: varchar("service", { length: 120 }).notNull(),
    preferredDate: varchar("preferred_date", { length: 20 }).notNull(),
    preferredTime: varchar("preferred_time", { length: 40 }).notNull(),
    notes: text("notes"),
    consent: boolean("consent").notNull().default(false),
    status: varchar("status", { length: 30 }).notNull().default("new"),
    source: varchar("source", { length: 60 }).notNull().default("website"),
    notified: boolean("notified").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("appointment_requests_created_at_idx").on(table.createdAt)],
);

/** General "Send Request" submissions from the contact section. */
export const contactRequests = pgTable(
  "contact_requests",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    fullName: varchar("full_name", { length: 200 }).notNull(),
    phone: varchar("phone", { length: 40 }).notNull(),
    email: varchar("email", { length: 200 }).notNull(),
    propertyAddress: varchar("property_address", { length: 300 }),
    service: varchar("service", { length: 120 }).notNull(),
    message: text("message").notNull(),
    status: varchar("status", { length: 30 }).notNull().default("new"),
    source: varchar("source", { length: 60 }).notNull().default("website"),
    notified: boolean("notified").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("contact_requests_created_at_idx").on(table.createdAt)],
);

export type AppointmentRequest = typeof appointmentRequests.$inferSelect;
export type NewAppointmentRequest = typeof appointmentRequests.$inferInsert;
export type ContactRequest = typeof contactRequests.$inferSelect;
export type NewContactRequest = typeof contactRequests.$inferInsert;
