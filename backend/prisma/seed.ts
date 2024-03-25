import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {

    const alice = await prisma.user.upsert({
        where: { email: 'alice@projectathon.io' },
        update: {},
        create: {
            email: 'alice@projectathon.io',
            name: 'Alice',
            password: "aslksld;kjf"
        },
    })
    const bob = await prisma.user.upsert({
        where: { email: 'bob@projectathon.io' },
        update: {},
        create: {
            email: 'bob@projectathon.io',
            name: 'Bob',
            password: "aslksld;kjf"
        },
    })
    console.log('Seeded users: ')
    console.log({ alice, bob })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })