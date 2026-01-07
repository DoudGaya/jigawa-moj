
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function verifyLogin(email, password) {
  console.log(`Testing login for ${email}...`);
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log('User not found.');
      return;
    }

    console.log('User found:', user.email);
    console.log('Stored hash:', user.password);

    if (!user.password) {
        console.log('No password set for user.');
        return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    console.log(`Password '${password}' is valid: ${isValid}`);
    
    // Test creating a new hash to see if it matches logic
    const newHash = await bcrypt.hash(password, 10);
    console.log(`New hash for '${password}': ${newHash}`);
    const checkNew = await bcrypt.compare(password, newHash);
    console.log(`Check new hash: ${checkNew}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyLogin('admin@ministry.com', '123456789');
