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

// mutations 
export const CREATE_ORDER = gql`
    mutation createOrder($input: CreateOrderDTO!) {
      createOrder(input: $input) {
       
        appartmentId
        phone
        observation
        
      }
    }
`; 