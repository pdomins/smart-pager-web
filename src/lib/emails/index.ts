export const ContactUsHTML = ({
    email,
    message,
  }: {
    email: string
    message: string
  }) => {
    return `
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Message Notification</title>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap" rel="stylesheet">
      <style>
          body {
              font-family: 'Nunito', sans-serif;
              background-color: #f3f4f6;
              margin: 0;
              padding: 20px;
          }
          .container {
              background-color: #ffffff;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border-radius: 8px; 
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          .header {
              background: linear-gradient(90deg, rgba(192,132,252,0.4) 0%, rgba(35,211,237,0.4) 50%, rgba(124,211,252,0.4) 100%);
              color: #3A4D63;
              padding: 10px 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
          }
          h1 {
              color: #333;
          }
          p {
              color: #666;
              line-height: 1.5;
          }
          .footer {
              text-align: center;
              margin-top: 20px;
          }
          .text-footer {
              font-size: 12px;
              color: #777777;
          }
      </style>
      </head>
      <body>
      <div class="container">
          <div class="header">
            <h1>¡Has recibido un nuevo mensaje de un cliente!</h1>
          </div>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
          <div class="footer">
              <div><strong>Smart Pager</strong></div>
          </div>
      </div>
      </body>
      </html>`
  }