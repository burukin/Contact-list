/**
 * Created by agros on 07.06.2019.
 */
import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactPaginate from 'react-paginate';

import {fetchContactsAction} from '../../actions/contact';
import ContactItem from './ContactItem';
import ContactForm from './ContactForm';
import NavBar from '../navbar/NavBar';

const _CONTACTS_PER_PAGE = 5;

const Contacts = ({contact:{contacts, loading}, fetchContactsAction}) => {

    useEffect( () => {
        fetchContactsAction(0, _CONTACTS_PER_PAGE);
    }, [fetchContactsAction]);

    const [toggleCreateForm, setToggleCreateForm] = useState(false);

    const onToggleCreateForm = () => {
        setToggleCreateForm(!toggleCreateForm)
    };

    const handlePageClick = data => {
        let selected = data.selected;
        let first = Math.ceil((selected) * _CONTACTS_PER_PAGE);
        fetchContactsAction(first, first + _CONTACTS_PER_PAGE);
    };

    return (
        <Fragment>
            <NavBar toggleCreateForm={onToggleCreateForm}/>
            {toggleCreateForm && <ContactForm />}
            {loading ? <p>Loading</p>: (
                contacts.edges.map(contact => {
                    return <ContactItem key={contact.id} contact={contact}/>
                })
            )}
            <div className="pagination">
                <ReactPaginate
                    previousLabel={'prev'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(contacts.totalCount / _CONTACTS_PER_PAGE)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination-list'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    pageClassName={'post'}
                />
            </div>
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