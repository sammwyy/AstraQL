require('dotenv').config();

import { GraphQLClient } from '../src';
import characterQuery from './graphql/characterQuery';

const client = new GraphQLClient({
  endpoint: 'https://graphql.anilist.co',
});

test('Test query', async () => {
  const data = await client.fetch(characterQuery, { id: 128986 });

  expect(data.name.first).toBe('Bocchi');
  expect(data.name.last).toBe('Hitori');
  expect(data.gender).toBe('Female');
  expect(data.age).toBe('12-13');
});
