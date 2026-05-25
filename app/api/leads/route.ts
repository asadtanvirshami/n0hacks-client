import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { LeadsFormSchema, sanitizeInput } from "@/lib/validation";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/**
 * Sends notification to Telegram
 * Escapes markdown to prevent injection attacks
 */
async function sendTelegramNotification(
  lead: z.infer<typeof LeadsFormSchema>
): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram credentials not configured");
    return false;
  }

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  // Escape special markdown characters
  const escapeTelegramMarkdown = (text: string): string => {
    return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
  };

  const text = `
🚨 *Nuevo Lead en n0hacks*

📧 *Email:* \`${escapeTelegramMarkdown(lead.email)}\`
🏢 *Empresa:* ${escapeTelegramMarkdown(lead.company)}
${lead.name ? `👤 *Nombre:* ${escapeTelegramMarkdown(lead.name)}` : ""}
${lead.phone ? `📱 *Teléfono:* ${escapeTelegramMarkdown(lead.phone)}` : ""}
${lead.serviceInterest ? `🎯 *Servicio:* ${escapeTelegramMarkdown(lead.serviceInterest)}` : ""}
${lead.message ? `💬 *Mensaje:* ${escapeTelegramMarkdown(lead.message)}` : ""}
⏰ *Hora:* ${new Date().toLocaleString("es-ES")}
  `.trim();

  try {
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: "MarkdownV2",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Telegram API error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    return false;
  }
}

/**
 * POST /api/leads
 * Receives lead submissions from forms
 * Validates input and sends notifications
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Validate Content-Type
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid Content-Type. Expected application/json" },
        { status: 400 }
      );
    }

    // 2. Check request size
    const bodySize = request.headers.get("content-length");
    const maxBodySize = 10 * 1024; // 10KB
    if (bodySize && parseInt(bodySize, 10) > maxBodySize) {
      return NextResponse.json(
        { error: "Request body too large" },
        { status: 413 }
      );
    }

    // 3. Parse JSON
    let body: unknown;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // 4. Validate with Zod
    const validationResult = LeadsFormSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          error: "Validation failed",
          details: errors,
        },
        { status: 400 }
      );
    }

    const validatedLead = validationResult.data;

    // 5. Sanitize data
    const sanitizedLead = {
      email: sanitizeInput(validatedLead.email),
      company: sanitizeInput(validatedLead.company),
      name: sanitizeInput(validatedLead.name),
      phone: validatedLead.phone ? sanitizeInput(validatedLead.phone) : undefined,
      message: validatedLead.message ? sanitizeInput(validatedLead.message) : undefined,
      serviceInterest: validatedLead.serviceInterest,
    };

    // 6. Send Telegram notification
    const notificationSent = await sendTelegramNotification(sanitizedLead);

    if (!notificationSent) {
      console.error("Failed to send Telegram notification for lead:", sanitizedLead.email);
      // Don't fail the API response, just log it
    }

    // 7. Return success
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your submission. We will contact you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Leads API error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/leads
 * Method not allowed
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

