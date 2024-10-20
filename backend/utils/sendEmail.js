const nodeMailer = require('nodemailer');
const ErrorHandler = require('./errorhandler.js');

const sendEmail = async options => {
  const transporter = await nodeMailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL, // sender gmail address
      pass: process.env.SMTP_PASSWORD // app pwd from gmail account
    }
  });

  const mailOptions = {
    from: {
      name: 'Deepak Kumar',
      address: process.env.SMTP_MAIL
    },
    to: options.email,
    subject: options.subject,
    html: options.message
  };

  /*let info = await transporter.sendMail({
    from: "'vinod' <thapa@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: '<b>hello world</b>'
  });

  console.log('message sent: %s', info.messageId);

  console.log(info);*/

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new ErrorHandler('Email could not be sent', 500);
  }
};

module.exports = sendEmail;
