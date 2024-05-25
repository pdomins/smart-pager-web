import { assertAndReturn } from '../assertions'

const baseUrl = assertAndReturn(process.env.NEXT_PUBLIC_BASE_URL)

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
      </div>
      <div class="footer">
        <div><strong>Smart Pager</strong></div>
        <p class="text-footer">Si tienes alguna pregunta, no dudes en contactarnos al (11) 1234-5678.</p>
      </div>
    </div>
    </body>
    </html>`
}

export const TableReadyRemainderHTML = ({
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
    <title>Recordatorio de Mesa Lista</title>
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
          color: #4a5568
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
        <h1>¡Tu mesa sigue esperándote!</h1>
      </div>
      <div class="content">
        <p>¡Hola ${name}!</p>
        <p>Queremos recordarte que tu mesa en <strong>${restaurantName}</strong> está lista y te está esperando. Por favor, acércate a la recepción para ser atendido lo antes posible.</p>
        <p>¡Apreciamos tu pronta respuesta y esperamos que disfrutes de una excelente comida!</p>
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
  const removeFromListUrl = `${baseUrl}/restaurants/${restaurantSlug}/queued/commensal/${email}/remove?authToken=${authToken}`

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
        <p>Te confirmamos que te has anotado exitosamente en la lista de espera de <strong>${restaurantName}</strong>. Te notificaremos cuando tu mesa esté lista.</p>
      
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

export const AddedToQueueFromAppHTML = ({
  name,
  restaurantName,
}: {
  name: string
  email: string
  restaurantName: string
}) => {
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
        <p>Te confirmamos que te has anotado exitosamente en la lista de espera de <strong>${restaurantName}</strong>. Te notificaremos cuando tu mesa esté lista.</p>
      
        <p>¡Gracias por elegirnos y esperamos atenderte pronto!</p>
      </div>
      <div class="footer">
        <div><strong>Smart Pager</strong></div>
        <p class="text-footer">Si tienes alguna pregunta, no dudes en contactarnos al (11) 1234-5678.</p>
      </div>
    </div>
    </body>
    </html>`
}

export const TableCanceledHTML = ({
  name,
  restaurantName,
  restaurantSlug,
}: {
  name: string
  restaurantName: string
  restaurantSlug: string
}) => {
  // src/app/restaurants/[restaurant]/page.tsx
  const restaurantUrl = `${baseUrl}/restaurants/${restaurantSlug}`

  return `
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificación de Remoción de la Lista</title>
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
          background: linear-gradient(90deg, rgba(255, 0, 0, 0.4) 40%, rgba(255, 69, 0, 0.4) 75%, rgba(255, 99, 71, 0.4) 100%);
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
              padding: 1px;
              background-color: #fffffff;
              color:rgba(255,0,0,0.6) !important;
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
    </style>
    </head>
    <body>
    <div class="container">
      <div class="header">
        <h1>Tu reserva ha sido cancelada</h1>
      </div>
      <div class="content">
        <p>Hola ${name},</p>
        <p>Lamentamos informarte que has sido removido de la fila de espera en <strong>${restaurantName}</strong> debido a la falta de confirmación de tu llegada en el tiempo estipulado.</p>
        <p>Si crees que esto es un error o deseas hacer otra reserva, por favor no dudes en ponerte en contacto con nosotros o <a href=${restaurantUrl} class="button"><u>haz clic aquí para reservar nuevamente</u></a>.</p>

      </div>
      <div class="footer">
        <div><strong>Smart Pager</strong></div>
        <p class="text-footer">Para cualquier consulta o nueva reserva, contáctanos al (11) 1234-5678.</p>
      </div>
    </div>
    </body>
    </html>`
}

export const ReservationCanceledHTML = ({
  name,
  restaurantName,
  restaurantSlug,
}: {
  name: string
  restaurantName: string
  restaurantSlug: string
}) => {
  // src/app/restaurants/[restaurant]/page.tsx
  const restaurantUrl = `${baseUrl}/restaurants/${restaurantSlug}`

  return `
      <html lang="es">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Actualización de tu Reserva</title>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap" rel="stylesheet">
      <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9fafb;
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
          .button {
            display: inline-block;
            padding: 1px;
            background-color: #fffffff;
            color:rgba(255,170,170) !important;
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
      </style>
      </head>
      <body>
      <div class="container">
        <div class="header">
          <h1>Actualización sobre tu visita a ${restaurantName}</h1>
        </div>
        <div class="content">
          <p>¡Hola ${name}!</p>
          <p>Queremos informarte que tu lugar en la lista de espera en <strong>${restaurantName}</strong> ha sido cancelado.
                  <p>Si crees que esto es un error o deseas hacer otra reserva, por favor no dudes en ponerte en contacto con nosotros o <a href=${restaurantUrl} class="button"><u>haz clic aquí para reservar nuevamente</u></a>.</p>
      
        </div>
        <div class="footer">
          <div><strong>Smart Pager</strong></div>
          <p class="text-footer">Por favor, contáctanos al (11) 1234-5678 para más información o para hacer una nueva reserva.</p>
        </div>
      </div>
      </body>
      </html>
  `
}

export const ReservationCanceledFromAppHTML = ({
  name,
  restaurantName,
  restaurantSlug,
}: {
  name: string
  restaurantName: string
  restaurantSlug: string
}) => {
  // src/app/restaurants/[restaurant]/page.tsx
  const restaurantUrl = `${baseUrl}/restaurants/${restaurantSlug}`

  return `
      <html lang="es">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cancelaste tu Reserva</title>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap" rel="stylesheet">
      <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9fafb;
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
          .button {
            display: inline-block;
            padding: 1px;
            background-color: #fffffff;
            color:rgba(255,170,170) !important;
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
      </style>
      </head>
      <body>
      <div class="container">
        <div class="header">
          <h1>Cancelaste tu reserva en ${restaurantName}</h1>
        </div>
        <div class="content">
          <p>¡Hola ${name}!</p>
          <p>Queremos informarte que te desanotaste de la fila para <strong>${restaurantName}</strong>.
          <p>Si crees que esto es un error o deseas hacer otra reserva, por favor no dudes en ponerte en contacto con nosotros o <a href=${restaurantUrl} class="button"><u>haz clic aquí para reservar nuevamente</u></a>.</p>
      
        </div>
        <div class="footer">
          <div><strong>Smart Pager</strong></div>
          <p class="text-footer">Por favor, contáctanos al (11) 1234-5678 para más información o para hacer una nueva reserva.</p>
        </div>
      </div>
      </body>
      </html>
  `
}
