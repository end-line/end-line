"use strict";

let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
    expires: 3600
  }
});

exports.validateAccount = function (email, id, secret) {

  let url = 'http://www.endlineproject.org/verification/' + id + '/' + secret;
  let body = 'Please go to ' + url + ' to activate your account';

  // setup email data
  let mailOptions = {
    from: {
      name: "end/line",
      address: "contactendlineproject@gmail.com"
    },
    sender: {
      name: "end/line",
      address: "contactendlineproject@gmail.com"
    },
    replyTo: {
      name: "end/line",
      address: "contactendlineproject@gmail.com"
    },
    to: email, // list of receivers
    subject: "Please validate your email address",
    text: body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.json({sent: false});
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    return res.json({sent: true});
  });

};
