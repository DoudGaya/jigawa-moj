import { Resend } from 'resend'
import {SendEmailToUserComponent} from './emailsComponents/SendEmailToUser'
// import { PoliceWelcomeMail } from './emailsComponents/PoliceWelcomeMail';

// Check if RESEND_API_KEY is available
const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
    console.error('RESEND_API_KEY is not set in environment variables');
}

const resend = new Resend(apiKey)
const env = process.env.NODE_ENV
let baseUrl;


if (env === 'production') {
    baseUrl = 'https://stablebricks.com.com'
} else {
    baseUrl = 'http://localhost:3000'
}

export const sendTwoFactorEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "Jigawa State Ministry of Justice <norepl@stablebricks.com>",
        to: email,
        subject: "Confirm Your Email",
        html: `<p> Your 2FA code is ${token}`
    })
}



export const sendMailToCourtAdmin = async (email: string, message: string, subject: string) => {
    await resend.emails.send({
        from: "Jigawa State Ministry of Justice <norepl@stablebricks.com>",
        to: email,
        subject: `${subject}`,
        html: `<p> ${message} </p>`
    })
}



export const sendWelcomeMailToPolice = async (email: string, password: string, verificationToken: string) => {
    const confirmationLink = `${baseUrl}/email-verification?token=${verificationToken}`
    await resend.emails.send({
        from: "Jigawa State Ministry of Justice <norepl@stablebricks.com>",
        to: email,
        subject: `Welcome to Jigawa State Ministry of Justice`,
        html: `
         <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{
        fontFamily: 'Poppins, sans-serif',
        margin: '0',
        padding: '0',
        backgroundColor: '#f3f4f6',
      }}>
        <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#f3f4f6' }}>
          <tr>
            <td align="center" style={{ padding: '20px 0' }}>
              <table width="600" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden' }}>
                <tr>
                  <td style={{ padding: '40px 30px', textAlign: 'center', backgroundColor: '#10b981' }}>
                    <img src="https://via.placeholder.com/150x50?text=MOJ+Logo" alt="Jigawa State Ministry of Justice Logo" style={{ maxWidth: '150px', height: 'auto' }} />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '40px 30px' }}>
                    <h1 style={{ color: '#10b981', marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
                      Jigawa State Ministry of Justice
                    </h1>
                    <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '1.5' }}>
                      Welcome to Jigawa State Ministry of Justice. You can now log in to your account using the following credentials:
                    </p>
                    <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '1.5' }}>
                      Email: ${email}<br />
                      Password: ${password}
                    </p>
                    <div style="margin-top: 20px;">
                      <a href="${confirmationLink}" style={{ backgroundColor: '#10b981', color: '#ffffff', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>
                        Click here to verify your account
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: '#10b981', padding: '20px 30px', textAlign: 'center' }}>
                    <p style={{ color: '#ffffff', fontSize: '14px', margin: '0' }}>
                      © 2024 Jigawa State Ministry of Justice. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
        `
        // react: PoliceWelcomeMail({email, password, confirmationLink})
    })
}


export const sendWelcomeMailToUser = async (email: string, password: string, verificationToken: string) => {
  const confirmationLink = `${baseUrl}/email-verification?token=${verificationToken}`
  await resend.emails.send({
      from: "Jigawa State Ministry of Justice <norepl@stablebricks.com>",
      to: email,
      subject: `Welcome to Jigawa State Ministry of Justice`,
      html: `
       <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
    </head>
    <body style={{
      fontFamily: 'Poppins, sans-serif',
      margin: '0',
      padding: '0',
      backgroundColor: '#f3f4f6',
    }}>
      <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#f3f4f6' }}>
        <tr>
          <td align="center" style={{ padding: '20px 0' }}>
            <table width="600" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden' }}>
              <tr>
                <td style={{ padding: '40px 30px', textAlign: 'center', backgroundColor: '#10b981' }}>
                  <img src="https://via.placeholder.com/150x50?text=MOJ+Logo" alt="Jigawa State Ministry of Justice Logo" style={{ maxWidth: '150px', height: 'auto' }} />
                </td>
              </tr>
              <tr>
                <td style={{ padding: '40px 30px' }}>
                  <h1 style={{ color: '#10b981', marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
                    Jigawa State Ministry of Justice
                  </h1>
                  <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '1.5' }}>
                    Welcome to Jigawa State Ministry of Justice. You can now log in to your account using the following credentials:
                  </p>
                  <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '1.5' }}>
                    Email: ${email}<br />
                    Password: ${password}
                  </p>
                  <div style="margin-top: 20px;">
                    <a href="${confirmationLink}" style={{ backgroundColor: '#10b981', color: '#ffffff', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>
                      Click here to verify your account
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#10b981', padding: '20px 30px', textAlign: 'center' }}>
                  <p style={{ color: '#ffffff', fontSize: '14px', margin: '0' }}>
                    © 2024 Jigawa State Ministry of Justice. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
      `
  })
}



export const sendMailToUser = async (
    email: string, 
    message: string, 
    subject: string
) => {
    await resend.emails.send({
        from: "Jigawa State Ministry of Justice <norepl@stablebricks.com>",
        to: email,
        subject: `${subject}`,
        html: `<p> ${message} </p>`,
        react: await Promise.resolve(SendEmailToUserComponent({message}))
    })
}

export const sendMailToStaff = async (
    email: string, 
    firstName: string, 
    lastName: string, 
    message: string, 
    subject: string
) => {
    await resend.emails.send({
        from: "Jigawa State Ministry of Justice <norepl@stablebricks.com>",
        to: email,
        subject: `${subject}`,
        html: `<p> ${message} </p>`
    })
}

export const sendPasswordResetEmail = async ( email: string, token: string) => {
    const resetLink =  `${baseUrl}/new-password?token=${token}`

    await resend.emails.send({
        from: 'Jigawa State Ministry of Justice <norepl@stablebricks.com>',
        to: email,
        subject: "Forgot Password Request",
        html: `<p>Click the link to <a href="${resetLink}">Reset your password</a></p>`
    })
}
    
export const sendVrificationEmail = async (
    email: string, 
    token: string
) => {

    const confirmationLink = `${baseUrl}/email-verification?token=${token}`
    await resend.emails.send({
        from: 'Jigawa State Ministry of Justice <norepl@stablebricks.com>',
        to: email,
        subject: "Verify your Account",
        html: `<p>Click the link to <a href="${confirmationLink}">Confirm your Email </a></p>`
    })

}