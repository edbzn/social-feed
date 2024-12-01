import express from 'express';
import { faker } from '@faker-js/faker';
import { SocialPostModel } from '@social-feed/social-feed-model';

const app = express();

app.get('/api/feed', (req, res) => {
  setTimeout(() => {
    res.json(
      Array.from(
        { length: 15 },
        () =>
          ({
            id: faker.string.uuid(),
            title: faker.lorem.sentence(3),
            subtitle: faker.lorem.sentence(5),
            content: faker.lorem.paragraph(),
            image: faker.image.urlLoremFlickr({ width: 400, height: 300 }),
            likes: faker.number.int({ min: 0, max: 100 }),
          } satisfies SocialPostModel)
      )
    );
  }, 300)
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
