import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [body.email],
      subject: `Registro de usuario para ${body.name}`,
      html: '<strong>It works!</strong>',
    });

    return Response.json(data);
  } catch (error) {

    return Response.json(error);
  }
});