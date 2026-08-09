import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const PROJECT_TYPES = {
  apartment: 'Квартира',
  house: 'Дом',
  commercial: 'Коммерческий интерьер',
  consultation: 'Консультация',
};

// Письма уходят только зарегистрированным пользователям приложения.
// Чтобы уведомления приходили на адрес, он должен быть зарегистрирован.
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
      'Новая заявка с сайта «Жар-птица»',
      '',
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Тип проекта: ${projectType}`,
    ];
    if (message) lines.push('', `Сообщение: ${message}`);
    const text = lines.join('\n');

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

    return Response.json({ email: emailResults });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}