import { define } from 'cooky-cutter';
import { SendEmailSESparams } from '../../lib/ses/types';

export const SendEmailSESParamsFactory = define<SendEmailSESparams>({
  from: 'email@example.com',
  to: ['email@example.com'],
  subject: 'Bienvenido a la administración de Cloudcar',
  text: 'has sido invidatado a la plataforma de administración',
});
