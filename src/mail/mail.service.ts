import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'boburovshukurullo@gmail.com',
      pass: 'sbhzpnzxdfvvympv',
    },
  });

  async sendVerificationLink(email: string, link: string): Promise<void> {
    const html = `
  <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9fafb; color: #111827;">
    <h2 style="color: #2563eb;">Edulingo</h2>
    <p>Salom 👋,</p>
    <p>Hisobingizni tasdiqlash uchun quyidagi tugmani bosing:</p>

    <div style="border: 2px solid #2563eb; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0; background: white;">
      
      <a href="${link}" 
         style="display:inline-block; padding:12px 24px; background:#2563eb; color:white; text-decoration:none; border-radius:8px; font-weight:bold;">
        ✅ Hisobni tasdiqlash
      </a>

      <p style="margin-top: 15px; color: #374151; font-size: 14px;">Yoki qo‘lda kiriting:</p>
      <code style="display:block; padding:10px; background:#f3f4f6; border-radius:8px; font-size:14px; color:#111827;">
        ${link}
      </code>
    </div>

    <p style="font-size: 12px; color: #6b7280;">⚠️ Link 15 daqiqa davomida amal qiladi.</p>
  </div>
`;

    await this.transporter.sendMail({
      from: `"EDULINGO" <boburovshukurullo@gmail.com>`,
      to: email,
      subject: 'Hisobni tasdiqlash',
      html,
    });
  }
}
