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

const Contacts = ({contact:{contacts, loading}, fetchContactsAction}) => {

    useEffect( () => {
        fetchContactsAction(0, 5);
    }, [fetchContactsAction]);

    const [toggleCreateForm, setToggleCreateForm] = useState(false);

    const onToggleCreateForm = () => {
        setToggleCreateForm(!toggleCreateForm)
    };

    const handlePageClick = data => {
        let selected = data.selected;
        let limit = Math.ceil(selected * 5);
        console.log(limit);
        fetchContactsAction(limit, 5*(selected+1));
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
            <div className="pagination">
                <ReactPaginate
                    previousLabel={'prev'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={3}
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