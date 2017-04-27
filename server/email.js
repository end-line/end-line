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

exports.verifyAccount = function (email, id, secret, cb) {

  let url = 'http://www.endlineproject.org/verification/' + id + '/' + secret;
  let bodyText = 'Hello, new user!\n\nPlease click the link below to verify your account.\n\n' + url + '\n\nSincerely,\nThe end/line Team';
  let bodyHTML = 'Hello, new user!<br/><br/>Please click the link below to verify your account.<br/><br/><a href="' + url + '" target="_blank">' + url + '</a><br/><br/>Sincerely,<br/>The end/line Team';

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
    subject: "Please verify your email address",
    html: bodyHTML,
    text: bodyText
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return cb(error, false);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    return cb(null, true);
  });

};

exports.resetPassword = function (email, password, cb) {

  let bodyText = 'Hello, user!\n\nYour new password is below:\n\n' + password + '\n\nPlease sign in with this and change it on the settings page.\n\nSincerely,\nThe end/line Team';
  let bodyHTML = 'Hello, user!<br/><br/>Your new password is below:<br/><br/><strong>' + password + '</strong><br/><br/>Please sign in with this and change it on the settings page.<br/><br/>Sincerely,<br/>The end/line Team';

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
    subject: "Your new password",
    html: bodyHTML,
    text: bodyText
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return cb(error, false);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    return cb(null, true);
  });

};
