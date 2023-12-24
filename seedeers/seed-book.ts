import { faker } from '@faker-js/faker';
import axios from 'axios';
import 'dotenv/config';
import { SeedConfig } from './seed-config';
function generateBookName() {
  const numberOfWords = faker.number.int({ min: 2, max: 5 }); // Adjust the range as needed
  const bookName = faker.lorem.words(numberOfWords);
  return bookName;
}

async function seedBookData() {
  try {
    console.log('Connected');
    // Seed authors
    const authors = await axios
      .get(`${SeedConfig.API_URL}/authors/`)
      .then((rs) => rs.data.data);
    console.log(authors);
    const bookPromises = [];
    for (let i = 0; i < authors.length; i++) {
      for (let ii = 0; ii < 10; ii++) {
        const stockCount = faker.number.int({ min: 2, max: 30 });
        const payload = {
          name: generateBookName(),
          authorId: authors[ii].id,
          stockCount,
          description: faker.lorem.lines(2),
        };
        const promise = axios.post(
          'http://localhost:8000/api/v1/books/',
          payload,
        );
        bookPromises.push(promise);
      }
    }
    await Promise.all(bookPromises);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Disconnect from MongoDB
  }
}

seedBookData();
