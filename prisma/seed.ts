import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('123456789', 10)

  const users = [
    {
      email: 'admin@ministry.com',
      firstName: 'Admin',
      lastName: 'Ministry',
      role: UserRole.ADMIN,
      password,
      emailVerified: new Date(),
    },
    {
      email: 'officer@police.com',
      firstName: 'Officer',
      lastName: 'Police',
      role: UserRole.POLICE,
      password,
      emailVerified: new Date(),
    },
    {
      email: 'clerk@court.com',
      firstName: 'Clerk',
      lastName: 'Court',
      role: UserRole.COURT,
      password,
      emailVerified: new Date(),
    },
    {
      email: 'user@customer.com',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.USER,
      password,
      emailVerified: new Date(),
    },
  ]

  for (const user of users) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    })

    if (!existingUser) {
      await prisma.user.create({
        data: user,
      })
      console.log(`Created user: ${user.email}`)
    } else {
      await prisma.user.update({
        where: { email: user.email },
        data: { password: user.password },
      })
      console.log(`Updated password for existing user: ${user.email}`)
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
