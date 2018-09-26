# GraphQL Apollo

### Important configurations GraphQL

Set devDependencies with Babel

```json
 "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.3",
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.7.0",
 }
```


Set `.babelrc` file for environment Babel

```javascript
{
  "presets": [
    "env"
  ],
  "plugins": [
    "transform-object-rest-spread"
  ]
}
```

Folder structure

    ├── ...
    ├── src                 
    │   ├── db        
    │   ├── graphql          
    │   └── services
		    index.js            

- - - 
### Importan configurations Apollo

In your file `App.js` need config your Apollo setup

```javascript
import ApolloClient from 'apollo-boost'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloProvider} from 'react-apollo'

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'http://localhost:3001',
  request: operation => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  onError: ({networkError}) => {
    if (networkError) console.log('Network Error:', networkError)
  },
  cache
})

const WrapperWithRouter = withRouter(NavigatorContainer)

export const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <WrapperWithRouter />
    </Router>
  </ApolloProvider>
)

```