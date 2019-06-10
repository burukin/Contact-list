/**
 * Created by agros on 08.06.2019.
 */
import {
    GET_CONTACT, 
    GET_CONTACTS, 
    CREATE_CONTACT, 
    DELETE_CONTACT, 
    EDIT_CONTACT, 
    CLEAR_CONTACT} from './actionTypes';
import {client} from '../utils/apolloClient';
import {
    createContact,
    deleteContact,
    editContact,
    fetchCallHistory,
    fetchContact,
    fetchContacts} from '../queries/queries';


export const fetchContactAction = id => async dispatch => {
    try {
        const request = await client.query({
            query: fetchContact,
            variables: {
                id: id
            }
        });
        const response = await request;
        dispatch({
            type: GET_CONTACT,
            payload: response.data
        })
    } catch (err) {
        console.error(err.message);
    }
};

export const fetchCallHistoryAction = id => async dispatch => {
    try {
        const request = await client.query({
            query: fetchCallHistory,
            variables: {
                id: id
            }
        });
        const response = await request;
        dispatch({
            type: GET_CONTACT,
            payload: response.data
        })
    } catch (err) {
        console.error(err.message);
    }
};

export const fetchContactsAction = () => async dispatch => {
    try {
        const request = await client.query({
            query: fetchContacts,
            variables: {
                offset: 2,
                limit: 5
            }
        });
        const response = await request;
        dispatch({
            type: GET_CONTACTS,
            payload: response.data
        })
    } catch (err) {
        console.error(err.message);
    }
};

export const createContactAction = formData => async dispatch => {
    try {
        const request = await client.mutate({
            mutation: createContact,
            variables: {
                name: formData.name,
                phone: formData.phone,
                email: formData.email
            }
        });

        const response = await request;
        dispatch({
            type: CREATE_CONTACT,
            payload: response.data.addContact
        })
    } catch (err) {
        console.error(err.message);
    }
};

export const editContactAction = formData => async dispatch => {
    try {
        const request = await client.mutate({
            mutation: editContact,
            variables: {
                id: formData.id,
                name: formData.name,
                phone: formData.phone,
                email: formData.email
            }
        });

        const response = await request;
        dispatch({
            type: EDIT_CONTACT,
            payload: response.data.editContact
        })

    } catch (err) {
        console.error(err.message);
    }
};

export const deleteContactAction = id => async dispatch => {
    if(window.confirm('Delete this contact?')){
        try {
            const request = await client.mutate({
                mutation: deleteContact,
                variables: {
                    id: id
                }
            });
            await request;
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            })
        } catch (err) {
            console.error(err.message);
        }
    }
};

export const clearContact = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_CONTACT
        })
    } catch (err) {
        console.error(err.message);
    }
};