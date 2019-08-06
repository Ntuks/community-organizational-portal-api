const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const mustache = require('mustache');

exports.sendMail = async (receipient, subject, emailData) => {
    try {
        let content = await fs.readFileSync("src/utils/views/email.template.html").toString();
        let render = mustache.render(content, emailData);

        const sender = "info@zaio.io";
    
        const msg = {
            to: receipient,
            from: sender,
            subject: subject,
            text: 'Alert From Me',
            html: render,
        };
        
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        sgMail.send(msg).then();
    } catch (error) {
        throw new Error(error.message);
    }

};