interface EmailTemplateProps {
    message: string;
}


export const SendEmailToUserComponent: React.FC<EmailTemplateProps> = ({ message }) => (
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
                                        {message}
                                    </p>
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
);