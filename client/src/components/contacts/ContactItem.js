/**
 * Created by agros on 08.06.2019.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {deleteContactAction} from '../../actions/contact';

const ContactItem  = ({contact:{id, name, phone, email, }, deleteContactAction}) => {
    
    const onDeleteClick = () => {
        deleteContactAction(id);
    };

    return (
        <div className="post bg-white p-1 my-1">
            <div className="user-icon">
                <i className="fas fa-user-circle"></i>
            </div>
            <div className="user-profile">
                <h3 className="user-name mName">{name}</h3>
                <p className="my-1">
                    <i className="fas fa-phone"></i> {phone}
                </p>
                <p className="my-1">
                    <i className="fas fa-envelope"></i> {email}
                </p>
            </div>
            <div className="user-actions">
                <Link to={`/contacts/${id}`} className="btn btn-primary">
                    <i className="fas fa-list-ul"></i> List of calls
                </Link>
                <Link to={`/contacts/edit/${id}`} className="btn btn-success">
                    <i className="fas fa-user-edit"></i> Edit Contact
                </Link>
                <button className="btn btn-danger" onClick={onDeleteClick}>
                    <i className="fas fa-trash-alt"></i> Delete Contact
                </button>
            </div>
        </div>
    );
};

ContactItem.propTypes = {
    deleteContactAction: PropTypes.func.isRequired,
    contact: PropTypes.object.isRequired
};

export default connect(null, {deleteContactAction})(ContactItem);