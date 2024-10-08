import { Resend } from 'resend'


const resend = new Resend(process.env.RESEND_API_KEY)
const env = process.env.NODE_ENV
let baseUrl;


if (env === 'production') {
    baseUrl = 'https://stablebricks.com'
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

export const sendMailToUser = async (
    email: string, 
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