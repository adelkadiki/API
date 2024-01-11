const nodemailer = require('nodemailer');


// Transporter function
// const transporter = nodemailer.createTransport({

//    host: process.env.EMAIL_HOST,
//  // service: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT ,
//   // secure: false, // `true` for port 465, `false` for all other ports
  
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD,
    
//    }
        
// });


// // Email details object
// const mailOptions = {

//   from:'node@email.com',
//   to:'adelkdk@gmail.com',
//   subject:'Node Email',
//   text: 'Testing line form nodemailer'
    
// };


// // Sending email
// const sendEmail =  async (transporter, mailOptions)=>{

//   try {
    
//     await transporter.sendMail(mailOptions);
//     console.log('Email is sent');  
//   } catch (error) {
     
//     console.log(error);

//   }
    
// }


// module.exports = sendEmail;



///////////////////////////


// Function to send an email
async function sendEmail(to, subject, text) {
  try {
    // Create a nodemailer transporter with your email service credentials
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT ,
      secure: false,

      auth: {
        user: process.env.EMAIL_USERNAME, // replace with your email
        pass: process.env.EMAIL_PASSWORD // replace with your email password
      }
    });

    // Define the email options
    const mailOptions = {
      from: 'Node Email', // replace with your email
      to: to,
      subject: subject,
      text: text
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error;
  }
}

module.exports = { sendEmail };
