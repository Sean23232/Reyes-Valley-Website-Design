/**
 * ---------------------------------------------------------------------------
 * OUTBOUND NOTIFICATION INTEGRATION POINT
 * ---------------------------------------------------------------------------
 * Every website submission is written to PostgreSQL first — nothing is ever
 * lost. This module is the single, clearly-defined place where those requests
 * can additionally be pushed to an email service, CRM, or webhook.
 *
 * It is DISABLED until the environment variables below are supplied, and the
 * API responses report that honestly instead of pretending an email was sent.
 *
 * To enable, add either of these to `.env`:
 *   NOTIFICATION_WEBHOOK_URL=https://hooks.example.com/...   (generic webhook)
 *   RESEND_API_KEY=re_xxx + NOTIFICATION_TO_EMAIL=owner@example.com
 *     (optional: NOTIFICATION_FROM_EMAIL=notifications@yourdomain.com)
 * ---------------------------------------------------------------------------
 */

export type NotificationResult = {
  delivered: boolean;
  channel: "webhook" | "email" | "none";
  reason?: "not_configured" | "transport_error";
  detail?: string;
};

export type NotificationPayload = {
  kind: "appointment" | "contact";
  reference: string;
  subject: string;
  fields: Record<string, string>;
};

function renderText(payload: NotificationPayload): string {
  const lines = Object.entries(payload.fields)
    .filter(([, value]) => value && value.trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`);
  return [payload.subject, `Reference: ${payload.reference}`, "", ...lines].join(
    "\n",
  );
}

export function isNotificationConfigured(): boolean {
  return Boolean(
    process.env.NOTIFICATION_WEBHOOK_URL ||
      (process.env.RESEND_API_KEY && process.env.NOTIFICATION_TO_EMAIL),
  );
}

export async function sendNotification(
  payload: NotificationPayload,
): Promise<NotificationResult> {
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFICATION_TO_EMAIL;
  const fromEmail =
    process.env.NOTIFICATION_FROM_EMAIL ?? "notifications@example.com";

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        return {
          delivered: false,
          channel: "webhook",
          reason: "transport_error",
          detail: `Webhook responded with ${response.status}`,
        };
      }
      return { delivered: true, channel: "webhook" };
    } catch (error) {
      return {
        delivered: false,
        channel: "webhook",
        reason: "transport_error",
        detail: error instanceof Error ? error.message : "Unknown webhook error",
      };
    }
  }

  if (resendKey && toEmail) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          subject: `${payload.subject} (${payload.reference})`,
          text: renderText(payload),
        }),
      });
      if (!response.ok) {
        return {
          delivered: false,
          channel: "email",
          reason: "transport_error",
          detail: `Email provider responded with ${response.status}`,
        };
      }
      return { delivered: true, channel: "email" };
    } catch (error) {
      return {
        delivered: false,
        channel: "email",
        reason: "transport_error",
        detail: error instanceof Error ? error.message : "Unknown email error",
      };
    }
  }

  return { delivered: false, channel: "none", reason: "not_configured" };
}
