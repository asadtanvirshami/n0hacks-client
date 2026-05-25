import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ContactFormSchema, escapeHtml, sanitizeInput } from "@/lib/validation";

/**
 * Sends email via Resend API
 * Implements proper error handling and validation
 */
async function sendEmail(
  data: z.infer<typeof ContactFormSchema>
): Promise<boolean> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "info@n0hacks.com";
  const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

  if (!RESEND_API_KEY) {
    console.warn("⚠️ RESEND_API_KEY not configured");
    return false;
  }

  try {
    // Generate safe HTML email with escaped content
    const emailHTML = generateEmailHTML(data);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: CONTACT_EMAIL,
        subject: `🚨 Nuevo Lead de n0hacks - ${escapeHtml(data.company)}`,
        html: emailHTML,
      }),
    });

    if (!response.ok) {
      const error = (await response.json()) as Record<string, unknown>;
      console.error("Resend API error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
}

/**
 * Generates safe HTML email content
 * All user input is properly escaped to prevent XSS
 */
function generateEmailHTML(data: z.infer<typeof ContactFormSchema>): string {
  const timestamp = new Date().toLocaleString("es-ES");

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px; border-radius: 8px;">
      <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h2 style="color: #ef4444; margin-top: 0; margin-bottom: 20px;">🚨 Nuevo Lead Recibido</h2>
        
        <div style="border-left: 4px solid #ef4444; padding-left: 15px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>📧 Email:</strong></p>
          <p style="margin: 0 0 15px 0; background: #f3f4f6; padding: 10px; border-radius: 4px; word-break: break-all;">${escapeHtml(data.email)}</p>
          
          <p style="margin: 10px 0;"><strong>🏢 Empresa:</strong></p>
          <p style="margin: 0 0 15px 0; background: #f3f4f6; padding: 10px; border-radius: 4px;">${escapeHtml(data.company)}</p>
          
          <p style="margin: 10px 0;"><strong>💬 Mensaje:</strong></p>
          <p style="margin: 0; background: #f3f4f6; padding: 10px; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word;">${escapeHtml(data.message)}</p>
        </div>
        
        <p style="color: #6b7280; font-size: 12px; margin-top: 20px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
          ⏰ Recibido: ${timestamp}
        </p>
      </div>
    </div>
  `;
}

/**
 * POST /api/contact
 * Receives contact form submissions
 * Validates input, sanitizes data, and sends email
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Validate Content-Type header
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid Content-Type. Expected application/json" },
        { status: 400 }
      );
    }

    // 2. Check request size (prevent DoS)
    const bodySize = request.headers.get("content-length");
    const maxBodySize = 10 * 1024; // 10KB limit
    if (bodySize && parseInt(bodySize, 10) > maxBodySize) {
      return NextResponse.json(
        { error: "Request body too large" },
        { status: 413 }
      );
    }

    // 3. Parse JSON body
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

    // 4. Validate with Zod schema
    const validationResult = ContactFormSchema.safeParse(body);

    if (!validationResult.success) {
      // Format error messages for client
      const errors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          error: "Validation failed",
          details: errors,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // 5. Additional sanitization (defense in depth)
    const sanitizedData = {
      email: sanitizeInput(validatedData.email),
      company: sanitizeInput(validatedData.company),
      message: sanitizeInput(validatedData.message),
    };

    // 6. Send email
    const emailSent = await sendEmail(sanitizedData);

    if (!emailSent) {
      console.error("Failed to send email for lead:", sanitizedData.email);
      // Return success to user but log failure internally
      // This prevents attackers from knowing if email service is down
    }

    // 7. Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your submission. We will contact you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        error: "An error occurred while processing your request",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Method not allowed
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

