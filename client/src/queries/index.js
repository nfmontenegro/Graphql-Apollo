import gql from 'graphql-tag'

export const TOKEN = gql`
  query TOKEN {
    checkToken {
      status
      message
    }
  }
`

export const USER = gql`
  query USER($token: String!) {
    user(token: $token) {
      name
      lastname
      email
      password
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

export const REGISTER_USER = gql`
  mutation REGISTER_USER(
    $name: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    registerUser(
      name: $name
      lastname: $lastname
      email: $email
      password: $password
    ) {
      name
      lastname
      email
      password
    }
  }
`
