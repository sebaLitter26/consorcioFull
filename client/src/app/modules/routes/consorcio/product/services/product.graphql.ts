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
    updatedAt
  }
}
`;

export const PRODUCT = gql`
query product($id: String!){
  product(id: $id) {
    id
    name
    images
    price
    stock
    brand
    description
    updatedAt
    }
}
`;



// mutations Variable \"$input\" of required type \
export const CREATE_PRODUCT = gql`
    mutation createProduct($input: CreateProductDTO!) {
      createProduct(input: $input) {
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

// mutations
export const UPDATE_PRODUCT = gql`
    mutation updateProduct($input: UpdateProductDTO!) {
      updateProduct(input: $input) {
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


// mutations
export const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: String!) {
      deleteProduct(id: $id) {
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