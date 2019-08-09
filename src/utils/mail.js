import { setApiKey, send } from '@sendgrid/mail';
import { readFileSync } from 'fs';
import { render as _render } from 'mustache';

export async function sendMail(receipient, subject, emailData) {
  try {
    const content = await readFileSync('src/utils/views/email.template.html').toString();
    const render = _render(content, emailData);

    const sender = 'info@zaio.io';

    const msg = {
      to: receipient,
      from: sender,
      subject,
      text: 'Alert From Me',
      html: render,
    };

    setApiKey(process.env.SENDGRID_API_KEY);
    send(msg).then();
  } catch (error) {
    throw new Error(error.message);
  }
}
