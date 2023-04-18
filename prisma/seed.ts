import {
  PrismaClient,
  Prisma,
  PetGender,
  IdentificationType,
} from '@prisma/client';
import { faker } from '@faker-js/faker/locale/fr';

const prisma = new PrismaClient();

async function main() {
  const mainUser = generateMainUser();

  await prisma.user.upsert({
    where: {
      email: mainUser.email,
    },
    update: {},
    create: mainUser,
  });

  for (const user of generateUsers(
    faker.datatype.number({ min: 40, max: 50 }),
  )) {
    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: user,
    });
  }
}

function generateMainUser(): Prisma.UserCreateInput {
  return {
    email: 'user@pet.care',
    password: 'user@pet.care',
    petOwner: {
      create: generatePetOwner(
        faker.name.sexType(),
        faker.name.firstName(),
        faker.name.lastName(),
      ),
    },
  };
}

function generateUsers(number: number): Prisma.UserCreateInput[] {
  const users: Prisma.UserCreateInput[] = [];

  for (let i = 0; i < number; i++) {
    const gender = faker.name.sexType();
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    const email = faker.internet.email(firstName, lastName);

    users.push({
      email: email,
      password: email,
      petOwner: {
        create: generatePetOwner(gender, firstName, lastName),
      },
    });
  }

  return users;
}

function generatePetOwner(
  gender: string,
  firstName: string,
  lastName: string,
): Prisma.PetOwnerCreateWithoutUserInput {
  return {
    gender: gender,
    firstName: firstName,
    lastName: lastName,
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

function generatePets(number: number): Prisma.PetCreateManyPetOwnerInput[] {
  const pets: Prisma.PetCreateWithoutPetOwnerInput[] = [];

  for (let i = 0; i < number; i++) {
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
      birthDate: birthDate,
      deceased: isDeceased,
      deceaseDate: isDeceased ? faker.date.recent(150) : null,
      picture: faker.image.cats(),
      identificationType: faker.helpers.objectValue(IdentificationType),
      identificationDate: identificationDate,
      identificationPlace: faker.address.city(),
      identificationNumber: faker.internet.ipv4(),
      description: faker.lorem.paragraphs(3),
    });
  }

  return pets;
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
