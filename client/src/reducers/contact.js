/**
 * Created by agros on 08.06.2019.
 */
import {
    GET_CONTACT,
    GET_CONTACTS,
    CREATE_CONTACT,
    DELETE_CONTACT,
    EDIT_CONTACT,
    CLEAR_CONTACT
} from '../actions/actionTypes';

const initialState = {
    contacts: [],
    contact: null,
    loading: true
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case GET_CONTACT:
            return {
                ...state,
                contact: payload.contact,
                loading: false
            };
        case GET_CONTACTS:
            return {
                ...state,
                contacts: payload.contacts,
                loading: false
            };
        case CREATE_CONTACT:
        case EDIT_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, payload],
                loading: false
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => {
                    return payload !== contact.id
                }),
                loading: false
            };
        case CLEAR_CONTACT:
            return {
                ...state,
                contact: null,
                loading: false
            };
        default:
            return state;
    }
};