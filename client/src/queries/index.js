import gql from 'graphql-tag'

export const TOKEN = gql`
  query TOKEN {
    checkToken {
      status
      message
    }
  }
`

export const SIGN_IN = gql`
  mutation SIGN_IN($email: String!, $password: String!) {
    payloadLoginUser(email: $email, password: $password) {
      token
      user {
        name
        lastname
        email
        password
      }
    }
  }
`

export const LIST_USERS = gql`
  query LIST_USERS {
    listUsers {
      name
      lastname
      email
      password
    }
  }
`
