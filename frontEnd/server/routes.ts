import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactSchema.parse(req.body);

      // Save to storage
      const contactSubmission =
        await storage.createContactSubmission(validatedData);

      // Send email notification
      try {
        await sendContactEmail(validatedData);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Continue even if email fails - we still saved the submission
      }

      res.json({
        success: true,
        message: "Contact form submitted successfully",
        id: contactSubmission.id,
      });
    } catch (error) {
      console.error("Contact form submission error:", error);

      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors,
        });
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function sendContactEmail(data: z.infer<typeof insertContactSchema>) {
  console.log(process.env.EMAIL_USER, "<===this is email user");
  // Create transporter using Gmail with environment variables
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // Email to business owner
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to the business email
    subject: `New Contact Form Submission - ${data.service}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #86a788; border-bottom: 2px solid #86a788; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
          <p><strong>Service Interest:</strong> ${data.service}</p>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border-left: 4px solid #86a788; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          This email was sent from the Clepsydra Technologies contact form at ${new Date().toLocaleString()}
        </p>
      </div>
    `,
  };

  // Auto-reply to customer
  const autoReplyOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: "Thank you for contacting Clepsydra Technologies",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #86a788; border-bottom: 2px solid #86a788; padding-bottom: 10px;">
          Thank You for Your Inquiry
        </h2>
        
        <p>Dear ${data.firstName},</p>
        
        <p>Thank you for reaching out to Clepsydra Technologies! We have received your inquiry regarding <strong>${data.service}</strong> and appreciate your interest in our services.</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">What's Next?</h3>
          <ul style="color: #555;">
            <li>Our team will review your requirements within 24 hours</li>
            <li>We'll prepare a customized solution proposal</li>
            <li>A project specialist will contact you to discuss next steps</li>
          </ul>
        </div>
        
        <p>In the meantime, feel free to explore our services or contact us directly:</p>
        <p>📧 Email: <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a></p>
        <p>📱 Phone: +91 9039545880</p>
        
        <p>Best regards,<br>
        <strong>The Clepsydra Technologies Team</strong></p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          Clepsydra Technologies | Innovative Software Solutions
        </p>
      </div>
    `,
  };

  // Send both emails
  await Promise.all([
    transporter.sendMail(mailOptions),
    transporter.sendMail(autoReplyOptions),
  ]);
}
