import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

export const contact = async (req, res) => {
  console.log("📩 Incoming contact request...");
  const { name, email, contact, message } = req.body || {};

  console.log("Request Body:", req.body);

  // ✅ Validate input
  if (!name || !email || !contact || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // ✅ Send email using Resend
    const data = await resend.emails.send({
      from: "Camramen Contact <onboarding@resend.dev>", // use a verified sender
      to: process.env.SMTP_EMAIL, // your receiving email
      subject: `🎬 New Contact Message from ${name}`,
      text: `
📸 New Contact Form Submission
-------------------------------
Name: ${name}
Email: ${email}
Contact: ${contact}
Message: ${message}
      `,
    });

    console.log("✅ Email sent successfully:", data);
    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
};
