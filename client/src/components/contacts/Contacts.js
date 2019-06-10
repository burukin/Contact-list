/**
 * Created by agros on 07.06.2019.
 */
import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchContactsAction} from '../../actions/contact';
import ContactItem from './ContactItem';
import ContactForm from './ContactForm';
import NavBar from '../navbar/NavBar';

const Contacts = ({contact:{contacts, loading}, fetchContactsAction}) => {

    useEffect( () => {
        fetchContactsAction();
    }, [fetchContactsAction]);

    const [toggleCreateForm, setToggleCreateForm] = useState(false);

    const onToggleCreateForm = () => {
        setToggleCreateForm(!toggleCreateForm)
    };

    return (
        <Fragment>
            <NavBar toggleCreateForm={onToggleCreateForm}/>
            {toggleCreateForm && <ContactForm />}
            {loading ? <p>Loading</p>: (
                contacts.map(contact => {
                    return <ContactItem key={contact.id} contact={contact}/>
                })
            )}
        </Fragment>
    );
};

Contacts.propTypes = {
    fetchContactsAction: PropTypes.func.isRequired,
    contact: PropTypes.object.isRequired
};

const mapStateToProps = state => (
    {contact: state.contact}
);

export default connect(mapStateToProps, {fetchContactsAction})(Contacts);