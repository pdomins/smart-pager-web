export const TableReadyHTML = ({
  name,
  restaurantName,
}: {
  name: string
  restaurantName: string
}) => {
  return `
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificación de Mesa Lista</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap" rel="stylesheet">
    <style>
        body {
          font-family: Arial, sans-serif;
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
          background: linear-gradient(90deg, rgba(192,132,252,0.40242034313725494) 40%, rgba(35,211,237,0.4) 75%, rgba(124,211,252,0.4) 100%);
          color: #3A4D63; /* text-gray-700 */
          padding: 10px 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
          font-family: 'Nunito', sans-serif;
        }
        .content {
          text-align: center;
          padding: 20px;
          color: #4a5568
        }
         .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: rgba(192,132,252,0.15);
          color: #c084fc !important;
          border-radius: 20px;
          text-decoration: none;
          font-weight: bold;
          font-family: 'Nunito', sans-serif;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-family: 'Nunito', sans-serif;
        }
        .text-footer {
            font-size: 12px;
            color: #777777;
        }
        .smart-pager {
            font-size: 14px;
            font-weight: bold;
        }
    </style>
    </head>
    <body>
    <div class="container">
      <div class="header">
        <h1>¡Tu mesa está lista!</h1>
      </div>
      <div class="content">
        <p>¡Hola ${name}!</p>
        <p>Estamos encantados de informarte que tu mesa en <strong>${restaurantName}</strong> está lista. Por favor, acércate a la recepción para ser atendido.</p>
        <p>¡Gracias por tu paciencia y que disfrutes de tu comida!</p>
        <a href="URL_DE_TU_RESTAURANTE" class="button">Ver menú</a>
      </div>
      <div class="footer">
        <div><strong>Smart Pager</strong></div>
        <p class="text-footer">Si tienes alguna pregunta, no dudes en contactarnos al (11) 1234-5678.</p>
      </div>
    </div>
    </body>
    </html>`
}

export const AddedToQueueHTML = ({
  name,
  email,
  restaurantName,
  restaurantSlug,
  authToken,
}: {
  name: string
  email: string
  restaurantName: string
  restaurantSlug: string
  authToken: string
}) => {
  // src/app/restaurants/[restaurant]/queued/commensal/[email]/remove/page.tsx
  const removeFromListUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/restaurants/${restaurantSlug}/queued/commensal/${email}/remove?authToken=${authToken}`

  return `
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Lista de Espera</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <style>
        body {
          font-family: Arial, sans-serif;
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
          background: linear-gradient(90deg, rgba(192,132,252,0.40242034313725494) 40%, rgba(35,211,237,0.4) 75%, rgba(124,211,252,0.4) 100%);
          color: #3A4D63;
          padding: 10px 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
          font-family: 'Nunito', sans-serif;
        }
        .content {
          text-align: center;
          padding: 20px;
          color: #4a5568;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: rgba(192,132,252,0.15);
          color: #c084fc !important;
          border-radius: 20px;
          text-decoration: none;
          font-weight: bold;
          font-family: 'Nunito', sans-serif;
        }
        .button-unsubscribe {
          display: inline-block;
          padding: 1px;
          background-color: #fffffff;
          color:rgba(255,0,0,0.6) !important;
          border-radius: 20px;
          text-decoration: none;
          font-weight: bold;
          font-family: 'Nunito', sans-serif;
        }
        .anchor{
          color:rgba(255,0,0,0.6) !important;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-family: 'Nunito', sans-serif;
        }
        .text-footer {
            font-size: 12px;
            color: #777777;
        }
        .smart-pager {
            font-size: 14px;
            font-weight: bold;
        }
    </style>
    </head>
    <body>
    <div class="container">
      <div class="header">
        <h1>¡Estás en la lista!</h1>
      </div>
      <div class="content">
        <p>¡Hola ${name}!</p>
        <p>Te confirmamos que te has añadido exitosamente a la lista de espera en <strong>${restaurantName}</strong>. Te notificaremos cuando tu mesa esté lista.</p>
      
        <p>¡Gracias por elegirnos y esperamos atenderte pronto!</p>
        <div class="button-unsubscribe"><i class="fa fa-times"></i>Si queres desanotarte, <a href="${removeFromListUrl}" class="anchor"> <u>hace click acá</u></a></div>
      </div>
      <div class="footer">
        <div><strong>Smart Pager</strong></div>
        <p class="text-footer">Si tienes alguna pregunta, no dudes en contactarnos al (11) 1234-5678.</p>
      </div>
    </div>
    </body>
    </html>`
}

export const PickUpReadyHTML = ({
  name,
  restaurantName,
  orderNumber,
}: {
  name: string
  restaurantName: string
  orderNumber: string
}) => {
  return `
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificación de Pedido Listo</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap" rel="stylesheet">
    <style>
        body {
          font-family: Arial, sans-serif;
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
          background: linear-gradient(90deg, rgba(192,132,252,0.40242034313725494) 40%, rgba(35,211,237,0.4) 75%, rgba(124,211,252,0.4) 100%);
          color: #3A4D63; /* text-gray-700 */
          padding: 10px 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
          font-family: 'Nunito', sans-serif;
        }
        .content {
          text-align: center;
          padding: 20px;
          color: #4a5568;
        }
        .order-number {
          font-size: 24px;
          font-weight: bold;
          color: #c084fc;
          margin-top: 20px;
          font-family: 'Nunito', sans-serif;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-family: 'Nunito', sans-serif;
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
        <h1>¡Tu pedido está listo para ser retirado!</h1>
      </div>
      <div class="content">
        <p>¡Hola ${name}!</p>
        <p>Estamos encantados de informarte que tu pedido en <strong>${restaurantName}</strong> está listo para ser retirado. Por favor, acércate a la recepción para recogerlo.</p>
        <p>¡Gracias por tu paciencia y esperamos que disfrutes de tu comida!</p>
        <div class="order-number">${orderNumber}</div>
      </div>
      <div class="footer">
        <div><strong>Smart Pager</strong></div>
        <p class="text-footer">Si tienes alguna pregunta, no dudes en contactarnos al (11) 1234-5678.</p>
      </div>
    </div>
    </body>
    </html>
    
    `
}

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
