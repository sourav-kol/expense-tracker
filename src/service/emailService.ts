import FormData from "form-data";
import Mailgun from "mailgun.js";

export const sendEmail = async (subject: string, body: string) => {
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
        username: "api",
        key: process.env.API_KEY || ""
    });
    try {
        const data = await mg.messages.create(process.env.SANDBOX_URL || "", {
            from: `Mailgun Sandbox <${process.env.SEND_EMAIL_FROM}>`,
            to: [`SOURAV HARISHCHANDRA KOLAMBKAR <${process.env.EMAIL_TO}>`],
            subject: subject,
            html: body
        });

        console.log("email sent  ",data);
    } catch (error) {
        console.log(error);
    }
}
