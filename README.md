# AstraQL

Fast and easy to use GraphQL Client.

## 💻 Getting started

```shell
# With npm:
npm install astraql

# With yarn:
yarn add astraql
```

## 📚 Usage

### As a ES Module

```javascript
import { CacheLoader, GraphQLClient, query } from 'astraql';

// Initialize client.
const client = new GraphQLClient({
  endpoint: 'https://graphql.anilist.co',
  // Optional authentication:
  headers: {
    'Authorization': 'bearer xxxxxxxxxxxx'
  },
  // Optional cache (in seconds)
  cache: new CacheLoader({ expiresIn: 60 }),
});

// Create a query.
const characterQuery = query`
    Character($id: Int) {
        Character(id: $id) {
            id
            name {
                first
                last
            }
            gender
            age
        }
    }
`;

// Send request.
client.fetch(characterQuery, { id: 128986 })
    .then(console.log);
```

### As CJS Module

```javascript
// If uses require function you will need to use .default
// For import in typescript, this is not required
const { GraphQLClient, query } = require('astraql').default;
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/sammwyy/astraql/issues).

## ❤️ Show your support

Give a ⭐️ if this project helped you!

Or buy me a coffeelatte 🙌🏾

[Ko-fi](https://ko-fi.com/sammwy) | [Patreon](https://patreon.com/sammwy)

## 📝 License

Copyright © 2022 [Sammwy](https://github.com/sammwyy).  
This project is [MIT](LICENSE) licensed.  
