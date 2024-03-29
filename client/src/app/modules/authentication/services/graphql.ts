import { gql } from "apollo-angular";


// query

export const meData = gql`
query {
  me {
    status
    message
    user {
      id
      name
      lastname
      email
      registerDate
    }
  }
}
`;



export const oAuthLogin = gql`
query oAuthLogin($token: String!){
  oAuthLogin(token: $token){
    id,
    name,
    modifierId,
  	rol,
    phone,
    picture,
    isActive,
    email,
    appartment { floor , letter,  id, buildingId },
    notes,
    phone
  }
}
`;

export const login = gql`
query login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    status
    message
    token
  }
}
`;

export const getUsers = gql`
query {
  users {
    id,
    name,
    modifierId,
  	rol,
    phone,
    isActive,
    email,
    appartmentId,
    notes,
    phone
  }
}
`;



// mutations
export const registerData = gql`
    mutation addUser($user: UserInput!) {
        register(user: $user) {
            status
            message
            user {
                id
                name
                lastname
                email
                registerDate
            }
        }
    }
`;