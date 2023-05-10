import { faker } from '@faker-js/faker/locale/fr';
import {
  IdentificationType,
  PetGender,
  Prisma,
  PrismaClient,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function generatePets(number: number): Prisma.PetCreateManyPetOwnerInput[] {
  const pets: Prisma.PetCreateWithoutPetOwnerInput[] = [];

  for (let i = 0; i < number; i += 1) {
    const isDeceased = faker.datatype.boolean();

    const birthDate = faker.date.past(faker.datatype.number(15));
    const identificationDate = new Date(
      birthDate.setDate(
        birthDate.getDate() +
          faker.datatype.number({
            min: 7,
            max: 35,
          }),
      ),
    );

    pets.push({
      gender: faker.helpers.objectValue(PetGender),
      specie: 'cat',
      name: faker.name.firstName(),
      breed: faker.animal.cat(),
      coat: faker.helpers.arrayElement([
        'black',
        'white',
        'calico',
        'bicolor',
        'maltese',
        'tortoiseshell',
      ]),
      birthCountry: faker.address.countryCode('alpha-3'),
      birthDate,
      deceased: isDeceased,
      deceaseDate: isDeceased ? faker.date.recent(150) : null,
      picture: faker.image.cats(),
      identificationType: faker.helpers.objectValue(IdentificationType),
      identificationDate,
      identificationPlace: faker.address.city(),
      identificationNumber: faker.internet.ipv4(),
      description: faker.lorem.paragraphs(3),
    });
  }

  return pets;
}

function generatePetOwner(
  gender: string,
  firstName: string,
  lastName: string,
): Prisma.PetOwnerCreateWithoutUserInput {
  return {
    gender,
    firstName,
    lastName,
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    zipCode: faker.address.zipCode(),
    phone: faker.phone.number(),
    country: faker.address.countryCode('alpha-3'),
    pets: {
      createMany: {
        data: generatePets(faker.datatype.number({ min: 1, max: 4 })),
      },
    },
  };
}

async function generateUsers(
  number: number,
): Promise<Prisma.UserCreateInput[]> {
  const users: Prisma.UserCreateInput[] = [];

  for (let i = 0; i < number; i += 1) {
    const gender = faker.name.sexType();
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    const email = faker.internet.email(firstName, lastName);

    users.push({
      email,
      // eslint-disable-next-line no-await-in-loop
      password: await bcrypt.hash(email, 10),
      petOwner: {
        create: generatePetOwner(gender, firstName, lastName),
      },
    });
  }

  return users;
}

async function generateMainUser(): Promise<Prisma.UserCreateInput> {
  return {
    email: 'user@pet.care',
    password: await bcrypt.hash('user@pet.care', 10),
    petOwner: {
      create: generatePetOwner(
        faker.name.sexType(),
        faker.name.firstName(),
        faker.name.lastName(),
      ),
    },
  };
}

async function main() {
  const mainUser = await generateMainUser();

  await prisma.user.upsert({
    where: {
      email: mainUser.email,
    },
    update: {},
    create: mainUser,
  });

  const users = await generateUsers(
    faker.datatype.number({ min: 40, max: 50 }),
  );

  const usersPromises: Array<Promise<any>> = [];

  users.forEach((user) => {
    usersPromises.push(
      prisma.user.upsert({
        where: {
          email: user.email,
        },
        update: {},
        create: user,
      }),
    );
  });

  await Promise.all(usersPromises);
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
