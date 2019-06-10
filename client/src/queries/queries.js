/**
 * Created by agros on 09.06.2019.
 */
import gqt from 'graphql-tag';

export const createContact = gqt`
    mutation AddContact (
        $name: String!,
        $phone: String!,
        $email: String!
    ){
        addContact(name: $name, phone: $phone, email: $email){
            id
            name
            phone
            email
        }
    }
`;

export const deleteContact = gqt`
    mutation DeleteContact (
        $id: String!
    ){
        deleteContact(id: $id){
            id
        }
    }
`;

export const editContact = gqt`
    mutation EditContact (
        $id: String!,
        $name: String!,
        $phone: String!,
        $email: String
    ){
        editContact(id: $id, name: $name, phone: $phone, email: $email){
            id
            name
            phone
            email
        }
    }
`;

export const fetchCallHistory = gqt`
query ($id: String!) {
  contact(id: $id) {
    id
    name
    phone
    email
    history{
      calls{
        id
        contact {
          name
        }
        time
      }
    }
  }
}
`;

export const fetchContact = gqt`
query ($id: String!) {
  contact(id: $id) {
    id
    name
    phone
    email
    history {
        id
    }
  }
}
`;

export const fetchContacts = gqt`
    {
        contacts {
            id
            name
            phone
            email
        }
    }
`;