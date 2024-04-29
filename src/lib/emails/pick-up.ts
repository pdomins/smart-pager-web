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

export const PickUpReadyRetryHTML = ({
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
    <title>Notificación de Pedido Esperando</title>
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
        <h1>¡Tu pedido te está esperando!</h1>
    </div>
    <div class="content">
        <p>¡Hola ${name}!</p>
        <p>Tu pedido en <strong>${restaurantName}</strong> sigue esperando por ti. Por favor, recógelo en la recepción lo antes posible.</p>
        <p>¡Gracias por tu atención y esperamos que disfrutes de tu comida!</p>
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

export const PickUpCanceledHTML = ({
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
  <title>Notificación de Pedido Cancelado</title>
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
              background: linear-gradient(90deg, rgba(255,183,178,0.8) 0%, rgba(255,223,178,0.8) 100%);
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
      .order-number {
        font-size: 24px;
        font-weight: bold;
        color: rgba(255,170,170) !important;
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
      <h1>Lo sentimos, tu pedido ha sido cancelado</h1>
    </div>
    <div class="content">
      <p>Hola ${name},</p>
      <p>Lamentamos informarte que tu pedido en <strong>${restaurantName}</strong> ha sido cancelado debido a circunstancias imprevistas.</p>
      <p>Por favor, acercate al mostrador o ponte en contacto con el restaurante para realizar un nuevo pedido.</p>
      <div class="order-number">${orderNumber}</div>
    </div>
    <div class="footer">
      <div><strong>Smart Pager</strong></div>
      <p class="text-footer">Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos al (11) 1234-5678.</p>
    </div>
  </div>
  </body>
  </html>`
}
