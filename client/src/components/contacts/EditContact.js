/**
 * Created by agros on 08.06.2019.
 */
import React, {useEffect, Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchContactAction, editContactAction, clearContact} from '../../actions/contact';

const EditContact = ({contact:{contact, loading}, fetchContactAction, editContactAction, clearContact, match, history}) => {
    const [formData, setFormData] = useState({});

    useEffect( ()=> {
        fetchContactAction(match.params.id);
        return ()=> clearContact();
    }, []);

    useEffect( () => {
        setFormData({
            id: contact ? contact.id : '',
            name: contact ? contact.name : '',
            phone: contact ? contact.phone : '',
            email: contact ? contact.email : ''
        })
    }, [contact]);

    const onChangeHandler = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };


    const onFormSubmit = e => {
        e.preventDefault();
        editContactAction(formData);
        history.push('/');
    };
    
    return (
            <Fragment>
                <Link className="text-primary" to='/'><i className="fas fa-angle-double-left"></i> Go Back</Link>
                {loading || contact === null ? <div>Loading...</div> : (
                    <div className="post-form">
                        <form className="form my-1" onSubmit={ (e)=> onFormSubmit(e)}>
                            <div className="form-group">
                                <input type="text" name="name" value={formData.name} onChange={(e) => onChangeHandler(e)} required/>
                                <i className="bar"></i>
                            </div>
                            <div className="form-group">
                                <input type="text" name="phone" value={formData.phone} onChange={(e) => onChangeHandler(e)} required/>
                                <i className="bar"></i>
                            </div>
                            <div className="form-group">
                                <input type="email" name="email" value={formData.email} onChange={(e) => onChangeHandler(e)} required/>
                                <i className="bar"></i>
                            </div>
                            <button type="submit" className="button" value="Update"><span>Update</span></button>
                        </form>
                    </div>
                )}
            </Fragment>

    )
};


EditContact.propTypes = {
    fetchContactAction: PropTypes.func.isRequired,
    editContactAction: PropTypes.func.isRequired,
    clearContact: PropTypes.func.isRequired,
    contact: PropTypes.object.isRequired
};

const mapStateToProps = state => (
    {contact: state.contact}
);

export default connect(mapStateToProps, {fetchContactAction, editContactAction, clearContact})(EditContact);
