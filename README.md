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

In your file `App.js` need config your Apollo setup, set context headers authentication with token

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


Now config new Wrapper to check if user is have token, if it does not have, redirect to login page

```
export default function withAuth(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <Query query={TOKEN}>
          {({loading, error}) => {
            if (loading)
              return (
                <Row style={{marginTop: '70px'}}>
                  <Col span={7} offset={11}>
                    <Spin size="large" />
                  </Col>
                </Row>
              )
            if (error) return <Redirect to="/signin" />
            return (
              <React.Fragment>
                <WrappedComponent {...this.props} />
              </React.Fragment>
            )
          }}
        </Query>
      )
    }
  }
}
```


In the backend we config a resolver to check token

Apollo Query

```javascript
export const TOKEN = gql`
  query TOKEN {
    checkToken {
      status
      message
    }
  }
`
```


Resolver GraphQL

```
 checkToken: async (_, params, {request: {userAccess}}) => {
	 if (!userAccess) return new Error(`Don't have permissions`)
     return {status: 200, message: 'Success token'}
}
```

### Server configuration

We use `import {GraphQLServer} from 'graphql-yoga'`, so in your server middleware, set your decode response token

```javascript
server.express.use(async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (token) {
      const bearer = token.split(' ')
      const bearerToken = bearer[1]
      const {email} = await jwt.verify(bearerToken, process.env.SECRET_PASSWORD)
      req.userAccess = email
    }
    next()
  } catch (err) {
    console.log('Err:', err)
    //validate error in the resolver
    next()
  }
})
```

In every resolver you call your variable middleware and check if exist

```
	    user: async (_, {token}, {models: {User}, request: {userAccess}}) => ```