import { HTTP_RESPONSE_STATUS } from '@/types/https'
// import { request } from 'http'
import { NextResponse } from 'next/server'

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  host: process.env.NODEMAILER_HOST,
  port: Number(process.env.NODEMAILER_PORT) || 0,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
})

export async function POST(req: Request) {
  const { html, subject, recipient } = await req.json()
  const mailOptions = {
    from: 'No Reply @SmartPager <smartpager.pf@gmail.com>',
    to: recipient,
    subject,
    html,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ status: HTTP_RESPONSE_STATUS.SUCCESS })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    )
  }
}
