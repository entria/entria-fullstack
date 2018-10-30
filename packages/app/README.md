# React Native + React-Navigation + Relay Modern

This is a sample repository that shows how to integrate React Native with [ReactNavigation](https://github.com/react-community/react-navigation) and [Relay Modern](https://facebook.github.io/relay/).

For the Relay-Classic Version see this [branch](https://github.com/sibelius/ReactNavigationRelayModern/tree/relay-classic) 

It is connecting to this boilerplate code [graphql-dataloader-boilerplate](https://github.com/entria/graphql-dataloader-boilerplate)

![alt tag](./demo/demo.gif)

## Description
- `data/` contains schema(.json/.graphql) of your GraphQL server. It will be used by Relay to compile your *graphql* queries to code
- `yarn relay` or `yarn relay:watch` are used to convert *graphql* literals into generated files. The second command watch changes when `data/` files are updated

[`.babelrc`](.babelrc) for Relay Modern
```json
{
  "plugins": [
    ["relay", {"schema": "data/schema.json"}]
  ],
}
```

### Relay Environment
The file [src/createRelayEnvironment.js](src/createRelayEnvironment.js) creates a Relay Environment and a Network instance that configures Relay with a function to fetch queries from the remote server

### ReactNavigation + Relay Modern
1. You should use a Relay Container such as *[FragmentContainer](https://facebook.github.io/relay/docs/fragment-container.html)*, *[PaginationContainer](https://facebook.github.io/relay/docs/pagination-container.html)* or others in any component that will be `pushed` into a `StackNavigation`
   - For instance, check [UserList#createPaginationContainer](./src/UserList.js#L111)

- Pushing a route that uses Relay and depends on a parameter [UserList#navigate](./src/UserList.js#L88)

- Define that your route will need a parameter from react-navigation like these [UserDetail#query](./src/UserDetail.js#L57)
- You also need to define it inside `variables` [UserDetail#variables](./src/UserDetail.js#L63)
