import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 既存データをクリア（順序に注意）
  await prisma.user.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.position.deleteMany();
  await prisma.department.deleteMany();
  await prisma.tenant.deleteMany();

  const systemTenantId = '00000000-0000-0000-0000-000000000001';
  const BCRYPT_ROUNDS = 12;

  // 1. システムテナントの作成
  const tenant = await prisma.tenant.upsert({
    where: { id: systemTenantId },
    update: {},
    create: {
      id: systemTenantId,
      name: '株式会社テスト',
      subdomain: 'testcompany',
      isActive: true,
    },
  });
  console.log('  Tenant created:', tenant.name);

  // 2. 部署の作成
  const deptAdmin = await prisma.department.create({
    data: { tenantId: tenant.id, code: 'ADMIN', name: '管理部', sortOrder: 1 },
  });
  const deptSes = await prisma.department.create({
    data: { tenantId: tenant.id, code: 'SES', name: 'SES事業部', sortOrder: 2 },
  });
  const deptSales = await prisma.department.create({
    data: { tenantId: tenant.id, code: 'SALES', name: '営業部', sortOrder: 3 },
  });
  console.log('  Departments created: 管理部, SES事業部, 営業部');

  // 3. 役職の作成
  const posAdmin = await prisma.position.create({
    data: { tenantId: tenant.id, name: '管理者', rank: 1, hasApproval: true },
  });
  const posManager = await prisma.position.create({
    data: { tenantId: tenant.id, name: 'マネージャー', rank: 2, hasApproval: true },
  });
  const posSenior = await prisma.position.create({
    data: { tenantId: tenant.id, name: 'シニアエンジニア', rank: 3, hasApproval: false },
  });
  const posMember = await prisma.position.create({
    data: { tenantId: tenant.id, name: 'メンバー', rank: 4, hasApproval: false },
  });
  console.log('  Positions created: 管理者, マネージャー, シニアエンジニア, メンバー');

  // 4. システム管理者の作成
  const passwordHash = await bcrypt.hash('Admin1234!', BCRYPT_ROUNDS);

  const adminEmployee = await prisma.employee.create({
    data: {
      tenantId: tenant.id,
      employeeCode: 'ADMIN001',
      lastName: 'システム',
      firstName: '管理者',
      lastNameKana: 'システム',
      firstNameKana: 'カンリシャ',
      email: 'admin@example.com',
      birthDate: new Date('1990-01-01'),
      gender: 'other',
      hireDate: new Date('2024-01-01'),
      employmentType: 'regular',
      contractType: 'indefinite',
      departmentId: deptAdmin.id,
      positionId: posAdmin.id,
    },
  });

  await prisma.user.create({
    data: {
      tenantId: tenant.id,
      employeeId: adminEmployee.id,
      passwordHash,
      role: 'admin',
    },
  });
  console.log('  Admin user created: admin@example.com / Admin1234!');

  // 5. テスト用社員（SES事業部）
  const emp1Hash = await bcrypt.hash('Pass1234!', BCRYPT_ROUNDS);
  const emp1 = await prisma.employee.create({
    data: {
      tenantId: tenant.id,
      employeeCode: 'EMP001',
      lastName: '山田',
      firstName: '太郎',
      lastNameKana: 'ヤマダ',
      firstNameKana: 'タロウ',
      email: 'yamada@example.com',
      birthDate: new Date('1995-05-15'),
      gender: 'male',
      hireDate: new Date('2024-04-01'),
      employmentType: 'regular',
      contractType: 'indefinite',
      departmentId: deptSes.id,
      positionId: posSenior.id,
    },
  });
  await prisma.user.create({
    data: {
      tenantId: tenant.id,
      employeeId: emp1.id,
      passwordHash: emp1Hash,
      role: 'employee',
    },
  });

  const emp2Hash = await bcrypt.hash('Pass1234!', BCRYPT_ROUNDS);
  const emp2 = await prisma.employee.create({
    data: {
      tenantId: tenant.id,
      employeeCode: 'EMP002',
      lastName: '鈴木',
      firstName: '花子',
      lastNameKana: 'スズキ',
      firstNameKana: 'ハナコ',
      email: 'suzuki@example.com',
      birthDate: new Date('1998-08-20'),
      gender: 'female',
      hireDate: new Date('2025-04-01'),
      employmentType: 'contract',
      contractType: 'fixed_term',
      departmentId: deptSes.id,
      positionId: posMember.id,
    },
  });
  await prisma.user.create({
    data: {
      tenantId: tenant.id,
      employeeId: emp2.id,
      passwordHash: emp2Hash,
      role: 'employee',
    },
  });
  console.log('  Test employees created: 山田太郎 (EMP001), 鈴木花子 (EMP002)');

  console.log('Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
