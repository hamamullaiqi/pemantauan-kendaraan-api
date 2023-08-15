import hbs from "nodemailer-express-handlebars";
import nodemailer from "nodemailer";
import path from "path";

export const sendEmail = async ({
    email_address = "",
    template_name = "",
    data = {},
    attachments = [],
}) => {
    console.log(process.env.EMAILER_USER, process.env.EMAILER_PASS);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAILER_USER,
            pass: process.env.EMAILER_PASS,
        },
    });

    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve("./src/library/email/template_html/"),
            defaultLayout: false,
        },
        viewPath: path.resolve("./src/library/email/template_html/"),
    };

    transporter.use("compile", hbs(handlebarOptions));

    const mailOpt = {
        from: `"@admin" <${process.env.EMAILER_USER}>`, // sender address
        to: email_address, // list of receivers
        subject: "RESET PASSWORD", // Subject line
        template: template_name,
        context: data,
        attachments: attachments,
    };
    return transporter.sendMail(mailOpt, (error, info) => {
        if (error) {
            console.log(error);
        }
        console.log(`Message Send: ${info?.response}`);
    });
};
