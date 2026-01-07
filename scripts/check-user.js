
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUser(email) {
    try {
        console.log(`Checking user: ${email}`);
        const user = await prisma.user.findUnique({ where: { email } });
        console.log('User found:', user);
        
        if (user) {
            console.log('ID:', user.id);
            console.log('Email:', user.email);
            console.log('EmailVerified:', user.emailVerified);
            console.log('Is 2FA Enabled:', user.isTwoFactorEnabled);
            
            // Check 2FA Confirmation
            const confirmation = await prisma.twoFactorConfirmation.findUnique({
                where: { userId: user.id }
            });
            console.log('2FA Confirmation:', confirmation);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkUser('admin@ministry.com');
