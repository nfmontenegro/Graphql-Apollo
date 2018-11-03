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
      _id
      name
      lastname
      email
      password
      nickname
      website
      phoneNumber
      file
      imageUrl
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
        nickname
        website
        phoneNumber
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
      phoneNumber
      website
      nickname
      file
      imageUrl
    }
  }
`

export const REGISTER_USER = gql`
  mutation REGISTER_USER(
    $name: String!
    $lastname: String!
    $email: String!
    $password: String!
    $nickname: String
    $phoneNumber: Int
    $website: String
  ) {
    registerUser(
      name: $name
      lastname: $lastname
      email: $email
      password: $password
      nickname: $nickname
      phoneNumber: $phoneNumber
      website: $website
    ) {
      name
      lastname
      email
      password
      nickname
      phoneNumber
      website
    }
  }
`

export const UPDATE_USER = gql`
  mutation UPDATE_USER(
    $_id: String!
    $name: String
    $lastname: String
    $email: String
    $nickname: String
    $phoneNumber: Int
    $website: String
    $file: String
    $imageUrl: String
  ) {
    updateUser(
      _id: $_id
      name: $name
      lastname: $lastname
      email: $email
      nickname: $nickname
      phoneNumber: $phoneNumber
      website: $website
      file: $file
      imageUrl: $imageUrl
    ) {
      name
      lastname
      email
      nickname
      phoneNumber
      website
      file
      imageUrl
    }
  }
`
export const CREATE_PUBLICATION = gql`
  mutation CREATE_PUBLICATION(
    $title: String!
    $description: String!
    $content: String!
    $user: String!
    $imageUrl: String
  ) {
    createPublication(
      title: $title
      description: $description
      content: $content
      user: $user
      imageUrl: $imageUrl
    ) {
      _id
      title
      description
      content
      imageUrl
      user {
        name
        lastname
        _id
        phoneNumber
      }
    }
  }
`
export const LIST_PUBLICATIONS = gql`
  query LIST_PUBLICATIONS {
    listPublications {
      _id
      title
      description
      content
      formatDate
      imageUrl
      user {
        _id
        phoneNumber
        name
        lastname
        imageUrl
        nickname
      }
    }
  }
`

export const UPDATE_PUBLICATION = gql`
  mutation UPDATE_PUBLICATION(
    $_id: String!
    $userId: String!
    $title: String!
    $description: String!
  ) {
    updatePublication(
      _id: $_id
      userId: $userId
      title: $title
      description: $description
    ) {
      title
      description
      user {
        name
        lastname
      }
    }
  }
`

export const REMOVE_PUBLICATION = gql`
  mutation REMOVE_PUBLICATION($_id: String!) {
    deletePublication(_id: $_id)
  }
`
