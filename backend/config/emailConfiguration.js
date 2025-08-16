import nodemailer from "nodemailer";

// Create reusable transporter object using Gmail SMTP
const transport = nodemailer.createTransport({
  service: "gmail", // Fixed typo: was "gamil"
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // Use App Password for Gmail
  },
  // Additional security options
  secure: true,
  port: 465,
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter configuration
transport.verify((error, success) => {
  if (error) {
    console.error("❌ Email service configuration error:", error);
    console.log("🔧 Please check your Gmail configuration and App Password");
    console.log("📧 Email User:", process.env.EMAIL_USER);
    console.log("🔑 App Password Length:", process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.length : "NOT SET");
  } else {
    console.log("✅ Vehiql Email Service is ready to send emails");
  }
});

// Base email template with Vehiql branding
const getEmailTemplate = (content, title = "Vehiql - Your Trusted Car Partner") => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          background-color: #f8fafc;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: white; 
          border-radius: 12px; 
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .header { 
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); 
          color: white; 
          padding: 30px 20px; 
          text-align: center; 
        }
        .logo { 
          font-size: 28px; 
          font-weight: bold; 
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }
        .tagline { 
          font-size: 14px; 
          opacity: 0.9; 
        }
        .content { 
          padding: 40px 30px; 
        }
        .button { 
          display: inline-block; 
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); 
          color: white; 
          padding: 14px 28px; 
          text-decoration: none; 
          border-radius: 8px; 
          font-weight: 600;
          margin: 20px 0;
          transition: transform 0.2s;
        }
        .button:hover { 
          transform: translateY(-2px); 
        }
        .footer { 
          background: #f1f5f9; 
          padding: 25px; 
          text-align: center; 
          font-size: 12px; 
          color: #64748b; 
          border-top: 1px solid #e2e8f0;
        }
        .divider { 
          height: 3px; 
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); 
          margin: 20px 0; 
        }
        .highlight { 
          background: #eff6ff; 
          padding: 15px; 
          border-left: 4px solid #3b82f6; 
          margin: 15px 0; 
          border-radius: 0 8px 8px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🚗 Vehiql</div>
          <div class="tagline">Your Trusted AI-Powered Car Marketplace</div>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p><strong>Vehiql</strong> - Find Your Dream Car with AI</p>
          <p>📧 support@vehiql.com | 📱 1-800-VEHIQL | 🌐 www.vehiql.com</p>
          <p style="margin-top: 10px;">© 2025 Vehiql. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Generic email sending function
const sendEmail = async (to, subject, content, title) => {
  try {
    const htmlBody = getEmailTemplate(content, title);
    
    await transport.sendMail({
      from: `"Vehiql - AI Car Marketplace" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlBody,
    });
    
    console.log(`✅ Email sent successfully to ${to}: ${subject}`);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error);
    return { success: false, error: error.message };
  }
};

// Password Reset Email
export const sendResetPasswordLinkToEmail = async (to, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  const content = `
    <h2 style="color: #1e293b; margin-bottom: 20px;">🔐 Password Reset Request</h2>
    <p>Hello there!</p>
    <p>We received a request to reset your password for your Vehiql account. Don't worry, it happens to the best of us!</p>
    
    <div class="highlight">
      <p><strong>🛡️ Security Notice:</strong> This link will expire in 24 hours for your security.</p>
    </div>
    
    <p>Click the button below to create a new password:</p>
    <center>
      <a href="${resetUrl}" class="button">🔑 Reset My Password</a>
    </center>
    
    <p>Or copy and paste this link in your browser:</p>
    <p style="word-break: break-all; color: #3b82f6; font-family: monospace; background: #f8fafc; padding: 10px; border-radius: 4px;">${resetUrl}</p>
    
    <div class="divider"></div>
    
    <p><strong>⚠️ Didn't request this?</strong></p>
    <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged and your account is secure.</p>
    
    <p style="margin-top: 30px;">
      Best regards,<br>
      <strong>The Vehiql Security Team</strong>
    </p>
  `;
  
  return await sendEmail(to, "🔐 Reset Your Vehiql Password", content, "Vehiql - Password Reset");
};

// Welcome Email for New Users
// export const sendWelcomeEmail = async (to, userName) => {
//   const content = `
//     <h2 style="color: #1e293b; margin-bottom: 20px;">🎉 Welcome to Vehiql!</h2>
//     <p>Hi ${userName},</p>
//     <p>Welcome to the future of car shopping! We're thrilled to have you join our community of smart car buyers.</p>
    
//     <div class="highlight">
//       <p><strong>🚀 You now have access to:</strong></p>
//       <ul style="margin: 10px 0; padding-left: 20px;">
//         <li>AI-powered car search and recommendations</li>
//         <li>Instant test drive booking</li>
//         <li>50,000+ verified vehicles</li>
//         <li>Trusted dealer network</li>
//         <li>Advanced filtering and comparison tools</li>
//       </ul>
//     </div>
    
//     <p>Ready to find your dream car?</p>
//     <center>
//       <a href="${process.env.FRONTEND_URL}/cars" class="button">🚗 Start Browsing Cars</a>
//     </center>
    
//     <div class="divider"></div>
    
//     <p><strong>💡 Pro Tips:</strong></p>
//     <ul style="margin: 10px 0; padding-left: 20px;">
//       <li>Use our AI search to find cars by uploading photos</li>
//       <li>Save your favorite cars to your wishlist</li>
//       <li>Book test drives directly through the app</li>
//       <li>Get price alerts for your preferred models</li>
//     </ul>
    
//     <p style="margin-top: 30px;">
//       Happy car hunting!<br>
//       <strong>The Vehiql Team</strong>
//     </p>
//   `;
  
//   return await sendEmail(to, "🎉 Welcome to Vehiql - Let's Find Your Dream Car!", content, "Welcome to Vehiql");
// };

// Test Drive Confirmation Email
// export const sendTestDriveConfirmation = async (to, bookingDetails) => {
//   const { userName, carMake, carModel, carYear, dealerName, appointmentDate, appointmentTime, dealerAddress, dealerPhone } = bookingDetails;
  
//   const content = `
//     <h2 style="color: #1e293b; margin-bottom: 20px;">✅ Test Drive Confirmed!</h2>
//     <p>Hi ${userName},</p>
//     <p>Great news! Your test drive has been confirmed. Get ready to experience your potential new car!</p>
    
//     <div class="highlight">
//       <p><strong>🚗 Vehicle Details:</strong></p>
//       <p>${carYear} ${carMake} ${carModel}</p>
//     </div>
    
//     <div style="background: #f0fdf4; padding: 15px; border-left: 4px solid #22c55e; margin: 15px 0; border-radius: 0 8px 8px 0;">
//       <p><strong>📅 Appointment Details:</strong></p>
//       <p><strong>Date:</strong> ${appointmentDate}</p>
//       <p><strong>Time:</strong> ${appointmentTime}</p>
//       <p><strong>Dealer:</strong> ${dealerName}</p>
//       <p><strong>Address:</strong> ${dealerAddress}</p>
//       <p><strong>Phone:</strong> ${dealerPhone}</p>
//     </div>
    
//     <center>
//       <a href="${process.env.FRONTEND_URL}/test-drives" class="button">📱 View My Bookings</a>
//     </center>
    
//     <div class="divider"></div>
    
//     <p><strong>📋 What to Bring:</strong></p>
//     <ul style="margin: 10px 0; padding-left: 20px;">
//       <li>Valid driver's license</li>
//       <li>Proof of insurance</li>
//       <li>This confirmation email</li>
//     </ul>
    
//     <p><strong>💡 Test Drive Tips:</strong></p>
//     <ul style="margin: 10px 0; padding-left: 20px;">
//       <li>Test various driving conditions (city, highway, parking)</li>
//       <li>Check all features and controls</li>
//       <li>Bring a list of questions for the dealer</li>
//       <li>Take your time - don't rush the decision</li>
//     </ul>
    
//     <p style="margin-top: 30px;">
//       Best regards,<br>
//       <strong>The Vehiql Team</strong>
//     </p>
//   `;
  
//   return await sendEmail(to, `🚗 Test Drive Confirmed - ${carYear} ${carMake} ${carModel}`, content, "Vehiql - Test Drive Confirmation");
// };

// Price Alert Email
// export const sendPriceAlert = async (to, carDetails) => {
//   const { userName, carMake, carModel, carYear, oldPrice, newPrice, savings, carUrl } = carDetails;
  
//   const content = `
//     <h2 style="color: #1e293b; margin-bottom: 20px;">💰 Price Drop Alert!</h2>
//     <p>Hi ${userName},</p>
//     <p>Great news! The car you're watching has dropped in price. This could be your chance to save big!</p>
    
//     <div style="background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 15px 0; border-radius: 0 8px 8px 0;">
//       <p><strong>🚗 Vehicle:</strong> ${carYear} ${carMake} ${carModel}</p>
//       <p><strong>🏷️ Was:</strong> <span style="text-decoration: line-through; color: #ef4444;">$${oldPrice.toLocaleString()}</span></p>
//       <p><strong>🎉 Now:</strong> <span style="color: #22c55e; font-weight: bold; font-size: 18px;">$${newPrice.toLocaleString()}</span></p>
//       <p><strong>💵 You Save:</strong> <span style="color: #f59e0b; font-weight: bold;">$${savings.toLocaleString()}</span></p>
//     </div>
    
//     <center>
//       <a href="${carUrl}" class="button">🚗 View This Deal</a>
//     </center>
    
//     <p style="margin-top: 20px;"><strong>⏰ Don't wait too long!</strong> Great deals like this tend to go fast. Consider booking a test drive today.</p>
    
//     <p style="margin-top: 30px;">
//       Happy savings,<br>
//       <strong>The Vehiql Team</strong>
//     </p>
//   `;
  
//   return await sendEmail(to, `💰 Price Drop: ${carYear} ${carMake} ${carModel} - Save $${savings.toLocaleString()}!`, content, "Vehiql - Price Alert");
// };

// // Newsletter/Updates Email
// export const sendNewsletterEmail = async (to, newsletterData) => {
//   const { userName, featuredCars, marketTrends, tips } = newsletterData;
  
//   const content = `
//     <h2 style="color: #1e293b; margin-bottom: 20px;">📰 Your Weekly Vehiql Update</h2>
//     <p>Hi ${userName},</p>
//     <p>Here's what's trending in the automotive world this week, plus some handpicked recommendations just for you!</p>
    
//     <div class="highlight">
//       <h3 style="color: #3b82f6; margin-bottom: 10px;">🌟 Featured Cars This Week</h3>
//       ${featuredCars.map(car => `
//         <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 6px; border: 1px solid #e2e8f0;">
//           <strong>${car.year} ${car.make} ${car.model}</strong> - $${car.price.toLocaleString()}
//           <br><small style="color: #64748b;">${car.mileage.toLocaleString()} miles • ${car.location}</small>
//         </div>
//       `).join('')}
//     </div>
    
//     <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
//       <h3 style="color: #1e293b; margin-bottom: 10px;">📈 Market Trends</h3>
//       <p>${marketTrends}</p>
//     </div>
    
//     <div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
//       <h3 style="color: #1e293b; margin-bottom: 10px;">💡 This Week's Tip</h3>
//       <p>${tips}</p>
//     </div>
    
//     <center>
//       <a href="${process.env.FRONTEND_URL}/cars" class="button">🚗 Browse All Cars</a>
//     </center>
    
//     <p style="margin-top: 30px;">
//       Stay informed,<br>
//       <strong>The Vehiql Team</strong>
//     </p>
//   `;
  
//   return await sendEmail(to, "📰 Your Weekly Vehiql Update - Featured Cars & Market Trends", content, "Vehiql Newsletter");
// };

export default transport;
