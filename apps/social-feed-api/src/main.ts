import express from 'express';
import { faker } from '@faker-js/faker';

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to social-feed-api!' });
});

app.get('/api/feed', (req, res) => {
  res.json(Array.from({ length: 50 }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(3),
    subtitle: faker.lorem.sentence(5),
    content: faker.lorem.paragraph(),
    image: faker.image.urlLoremFlickr({ width: 400, height: 300 }),
    likes: faker.number.int({ min: 0, max: 100 }),
  })));
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
