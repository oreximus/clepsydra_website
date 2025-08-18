import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    console.log(
      "GMAIL_USER:",
      process.env.GMAIL_USER ? "✓ Loaded" : "✗ Missing",
    );
    console.log(
      "GMAIL_APP_PASSWORD:",
      process.env.GMAIL_APP_PASSWORD ? "✓ Loaded" : "✗ Missing",
    );

    const { name, email, phone, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Missing environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Create transporter using Gmail with App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password
      },
    });

    // Email content for the business
    const businessEmailOptions = {
      from: process.env.GMAIL_USER,
      to: "clepsydratechnologies@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #007bff; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #6c757d;">
              This message was sent from the Clepsydra Technologies contact form on ${new Date().toLocaleString()}.
            </p>
          </div>
        </div>
      `,
    };

    // Auto-reply email for the customer
    const customerEmailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Thank you for contacting Clepsydra Technologies",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px; background-color: #007bff; color: white; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Clepsydra Technologies</h1>
            <p style="margin: 10px 0 0 0;">Professional Software Development Solutions</p>
          </div>
          
          <div style="padding: 30px; background-color: #ffffff; border: 1px solid #dee2e6; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #333; margin-top: 0;">Thank you for reaching out!</h2>
            
            <p>Dear ${name},</p>
            
            <p>We have received your message regarding "<strong>${subject}</strong>" and appreciate you taking the time to contact us.</p>
            
            <p>Our team will review your inquiry and get back to you within 24-48 hours. In the meantime, feel free to explore our services or connect with us on social media.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007bff; margin-top: 0;">Quick Links</h3>
              <p><strong>Website:</strong> <a href="https://clepsydratechnologies.com" style="color: #007bff;">clepsydratechnologies.com</a></p>
              <p><strong>Email:</strong> clepsydratechnologies@gmail.com</p>
              <p><strong>Phone:</strong> +91 6267665525</p>
              <p><strong>WhatsApp:</strong> <a href="http://wa.me/916267665525" style="color: #007bff;">Chat with us</a></p>
            </div>
            
            <p>Best regards,<br>
            <strong>Clepsydra Technologies Team</strong></p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(businessEmailOptions);
    await transporter.sendMail(customerEmailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
