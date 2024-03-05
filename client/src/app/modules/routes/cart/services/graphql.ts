import { gql } from "apollo-angular";


// query

export const PRODUCTS = gql`
query products{
  products{
    id
    name
    images
    price
    stock
    brand
    description
  }
}
`;




export const ORDERS = gql`
    query ordersByAppartment($appartmentId: String!){
        ordersByAppartment(appartmentId: $appartmentId){
          id,
          name,
          email,
          rol,
          images,
          isActive,
          appartment { 
            floor, 
            letter, 
            id
          },
          
        }
      
    }
`;
/* 
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
    id
    name
    lastname
    email
    registerDate
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
`; */