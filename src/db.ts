import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // await prisma.user_group.create({
    //     data: {
    //         name: 'New Group',
    //     }
    // })

	const allGroups = await prisma.user_group.findMany()
	console.log(allGroups);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
