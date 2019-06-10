/**
 * Created by agros on 08.06.2019.
 */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createContactAction} from '../../actions/contact';


const ContactForm = ({createContactAction}) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const onChangeHandler = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onFormSubmit = e => {
        e.preventDefault();
        createContactAction(formData);
        setFormData({
            name: '',
            phone: '',
            email: ''
        });
    };

    return (
        <div className="post-form">
            <form className="form my-1" onSubmit={ (e)=> onFormSubmit(e)}>
                <div className="form-group">
                    <input type="text" name="name" value={formData.name} onChange={(e) => onChangeHandler(e)} required/>
                    <label htmlFor="input" className="control-label">Your name</label>
                    <i className="bar"></i>
                </div>
                <div className="form-group">
                    <input type="text" name="phone" value={formData.phone} onChange={(e) => onChangeHandler(e)} required/>
                    <label htmlFor="input" className="control-label">Your phone
                        <span className="phone-format"> (format: country code - operator code - 123 - 4567)</span>
                    </label>
                    <i className="bar"></i>
                </div>
                <div className="form-group">
                    <input type="email" name="email" value={formData.email} onChange={(e) => onChangeHandler(e)} required/>
                    <label htmlFor="input" className="control-label">Your email</label>
                    <i className="bar"></i>
                </div>
                <button type="submit" className="button" value="Create"><span>Submit</span></button>
            </form>
        </div>
    );
};

ContactForm.propTypes = {
    createContactAction: PropTypes.func.isRequired
};

export default connect(null, {createContactAction})(ContactForm);