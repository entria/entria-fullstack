# GraphQL DataLoader Boilerplate

[![CircleCI](https://circleci.com/gh/entria/graphql-dataloader-boilerplate.svg?style=svg)](https://circleci.com/gh/entria/graphql-dataloader-boilerplate)
[![codecov](https://codecov.io/gh/entria/graphql-dataloader-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/entria/graphql-dataloader-boilerplate)

Boilerplate using GraphQL and DataLoader

## Blog Posts
* [How to implement viewerCanSee in  GraphQL](https://medium.com/@sibelius/how-to-implement-viewercansee-in-graphql-78cc48de7464#.d9vpk6fvx)
* [Testing a GraphQL Server using Jest](https://medium.com/@sibelius/testing-a-graphql-server-using-jest-4e00d0e4980e)
* [Parallel testing a GraphQL Server with Jest](https://itnext.io/parallel-testing-a-graphql-server-with-jest-44e206f3e7d2)
* [Encapsulating data on GraphQL using Loaders](https://medium.com/@jonathancardoso/encapsulating-data-on-graphql-using-loaders-9387b805c4fc)

### Directory Structure

```
├── /data/                   # GraphQL generated schema
├── /repl/                   # Read-Eval-Print-Loop (REPL) configuration
├── /scripts/                # Generate GraphQL schema script
├── /src/                    # Source code of GraphQL Server
│   ├── /core/               # Core types and helper files, can be used like a global module
│   ├── /interface/          # NodeInterface (Relay) and other GraphQL Interfaces
│   ├── /modules/            # Modules (think on modules like isolated pieces of your code)
│   │   │── /mutation/       # Module mutations (add an index file to be used on MutationType)
│   │   │── /subscription/   # Module subscriptions (add an index file to be used on SubscriptionType)
│   │   │── /enum/           # Enums related to this module
├── /test/                   # Test helpers
```

## Create-GraphQL
If you want to move faster you should use [create-graphql](https://github.com/lucasbento/create-graphql) to simplify the creation of a GraphQL Server

## Command

#### Setup
```bash
npm install
```
Note: If you do not have mongodb installed, please install it:
```bash
brew install mongodb
```
#### Develop
```bash
npm run watch
```

### Test
```bash
npm test
```

Or
```bash
npm run test:watch
```

### Docker and docker-compose
No needs for installing dependencies or running `mongod` in another terminal window

```bash
docker-compose build && docker-compose up
```

Test
```bash
docker-compose -f docker-compose.test.yml build && docker-compose -f docker-compose.test.yml up
```

### Production
```bash
# first compile the code
npm run build

# run graphql compiled server
npm start
```

### Flow
```bash
npm run flow
```

Or
```bash
flow
```

### REPL server
```bash
npm run repl

awesome > const user = await M.User.find()
```

Yep, await syntax works on the repl, it is awesome, tks @princejwesley (https://gist.github.com/princejwesley/a66d514d86ea174270210561c44b71ba)

### Schema
Update your schema
```bash
npm run update-schema
```

Take a look on the [Schema](https://github.com/entria/graphql-dataloader-boilerplate/blob/master/data/schema.graphql)
