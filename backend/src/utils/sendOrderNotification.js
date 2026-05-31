import { createMailer } from '../config/mailer.js';

export async function sendOrderNotification(order) {
  const mailer = createMailer();

  if (!mailer || !process.env.ADMIN_EMAIL) {
    return { skipped: true };
  }

  await mailer.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `New Shara Shopping order ${order.orderNumber}`,
    text: `New order from ${order.customer.fullName}. Total: ${order.totalAmount}.`,
  });

  return { skipped: false };
}
