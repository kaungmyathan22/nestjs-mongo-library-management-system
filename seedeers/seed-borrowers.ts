import { faker } from '@faker-js/faker';
import axios from 'axios';
import 'dotenv/config';
import { SeedConfig } from './seed-config';

async function seedBookData() {
  try {
    console.log('Connected');
    // Seed authors
    const borrowersPromises = [];
    for (let ii = 0; ii < 100; ii++) {
      const payload = {
        name: faker.person.fullName(),
      };
      const promise = axios.post(`${SeedConfig.API_URL}/borrowers/`, payload);
      borrowersPromises.push(promise);
    }
    await Promise.all(borrowersPromises);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Disconnect from MongoDB
  }
}

seedBookData();
