import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

const PROJECT_TYPES = {
  apartment: 'Квартира',
  house: 'Дом',
  commercial: 'Коммерческий интерьер',
  consultation: 'Консультация',
};

const EMAIL_TO = ['setkinsv@gmail.com', 'studio@zhar-ptizza.ru'];

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const name = body.name || '—';
    const phone = body.phone || '—';
    const projectType = PROJECT_TYPES[body.project_type] || body.project_type || '—';
    const message = body.message || '';

    const lines = [
      '🔔 Новая заявка с сайта «Жар-птица»',
      '',
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Тип проекта: ${projectType}`,
    ];
    if (message) lines.push('', `Сообщение: ${message}`);
    const text = lines.join('\n');

    // Telegram
    const token = secrets.get('TELEGRAM_BOT_TOKEN');
    const chatId = secrets.get('TELEGRAM_CHAT_ID');
    let telegram = { ok: false };
    if (token && chatId) {
      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text }),
        });
        if (tgRes.ok) {
          telegram = { ok: true };
        } else {
          telegram = { ok: false, error: await tgRes.text() };
        }
      } catch (e) {
        telegram = { ok: false, error: e.message };
      }
    } else {
      telegram = { ok: false, error: 'TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set' };
    }

    // Email — только зарегистрированным пользователям приложения
    const emailResults = [];
    for (const to of EMAIL_TO) {
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to,
          subject: 'Новая заявка с сайта «Жар-птица»',
          body: text,
        });
        emailResults.push({ to, ok: true });
      } catch (e) {
        emailResults.push({ to, ok: false, error: e.message });
      }
    }

    return Response.json({ telegram, email: emailResults });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}