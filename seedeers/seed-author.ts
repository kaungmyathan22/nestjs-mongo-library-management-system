import { faker } from '@faker-js/faker';
import axios from 'axios';
import 'dotenv/config';
import * as mongoose from 'mongoose';

async function seedData() {
  try {
    console.log('Connected');
    // Seed authors
    const authorsData = [];
    for (let i = 0; i < 50; i++) {
      const promise = axios.post('http://localhost:8000/api/v1/authors/', {
        name: faker.person.fullName(),
        birthDay: '2023-12-22T16:07:42.682Z',
      });
      authorsData.push(promise);
    }
    await Promise.all(authorsData);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
}

seedData();
