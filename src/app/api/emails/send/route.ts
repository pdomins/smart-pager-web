import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
})

export async function POST(request: Request) {
  const { html, subject, recipient } = await request.json()
  const mailOptions = {
    from: 'No Reply @SmartPager <smartpager.pf@gmail.com>',
    to: recipient,
    subject,
    html,
  }

  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email: ', error)
      } else {
        console.log('Email sent: ', info.response)
      }
    })
  } catch (error) {
    console.log('ERROR: ' + error)
  }
  return Response.json({})
}
