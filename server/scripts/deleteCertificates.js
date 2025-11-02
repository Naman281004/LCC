import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Starting certificate deletion process...');

  try {
    // 1. Find the 5 most recently created certificates
    const recentCertificates = await prisma.certificate.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
      },
    });

    const recentCertificateIds = recentCertificates.map(c => c.id);
    
    if (recentCertificateIds.length < 5) {
      console.log(`Found only ${recentCertificateIds.length} certificates. No certificates will be deleted.`);
      return;
    }
    
    console.log(`Keeping the 5 most recent certificates with IDs: ${recentCertificateIds.join(', ')}`);

    // 2. Delete all other certificates
    const deleteResult = await prisma.certificate.deleteMany({
      where: {
        id: {
          notIn: recentCertificateIds,
        },
      },
    });

    console.log(`✅ Successfully deleted ${deleteResult.count} certificates.`);
    
  } catch (error) {
    console.error('An error occurred during certificate deletion:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

