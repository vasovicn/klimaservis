import nodemailer from "nodemailer";
import { SERVICES } from "./services";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // SSL na portu 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface BookingMailData {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  services: string[];
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  source?: "online" | "admin";
}

export async function sendBookingNotification(data: BookingMailData) {
  const serviceNames = data.services
    .map((id) => SERVICES.find((s) => s.id === id)?.name ?? id)
    .join(", ");

  const dateFormatted = new Date(data.date).toLocaleDateString("sr-Latn-RS", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const source = data.source === "admin" ? "Admin panel" : "Online zakazivanje";

  const html = `
<!DOCTYPE html>
<html lang="sr">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .card { background: #fff; border-radius: 12px; max-width: 520px; margin: 0 auto; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { text-align: center; margin-bottom: 28px; }
    .header h1 { color: #1a3a9a; font-size: 22px; margin: 0 0 4px; }
    .header p { color: #888; font-size: 14px; margin: 0; }
    .badge { display: inline-block; background: #e8f0fe; color: #1a3a9a; border-radius: 20px; padding: 4px 14px; font-size: 12px; font-weight: bold; margin-bottom: 20px; }
    .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
    .row:last-child { border-bottom: none; }
    .label { color: #888; font-size: 14px; }
    .value { color: #1a1a1a; font-weight: 600; font-size: 14px; text-align: right; max-width: 60%; }
    .footer { text-align: center; margin-top: 24px; color: #aaa; font-size: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>🔔 Nova rezervacija</h1>
      <p>Beogradski Klima Servis</p>
    </div>
    <div class="badge">${source}</div>
    <div class="row">
      <span class="label">Ime i prezime</span>
      <span class="value">${data.customerName}</span>
    </div>
    <div class="row">
      <span class="label">Telefon</span>
      <span class="value">${data.customerPhone}</span>
    </div>
    <div class="row">
      <span class="label">Adresa</span>
      <span class="value">${data.customerAddress}</span>
    </div>
    <div class="row">
      <span class="label">Usluga</span>
      <span class="value">${serviceNames}</span>
    </div>
    <div class="row">
      <span class="label">Datum</span>
      <span class="value">${dateFormatted}</span>
    </div>
    <div class="row">
      <span class="label">Vreme</span>
      <span class="value">${data.startTime} – ${data.endTime} (~${data.duration} min)</span>
    </div>
    <div class="footer">Beogradski Klima Servis · kontakt@beogradskiklimaservis.rs</div>
  </div>
</body>
</html>
  `.trim();

  await transporter.sendMail({
    from: `"Beogradski Klima Servis" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_TO,
    subject: `Nova rezervacija – ${data.customerName} – ${data.date} ${data.startTime}`,
    html,
  });
}
