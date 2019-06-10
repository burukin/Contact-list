/**
 * Created by agros on 07.06.2019.
 */
import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchCallHistoryAction} from '../../actions/contact';


const CallsList = ({contact:{contact, loading}, match, fetchCallHistoryAction}) => {

    useEffect( ()=> {
        fetchCallHistoryAction(match.params.id);
    }, [fetchCallHistoryAction]);

    return (
        <Fragment>
            <Link className="text-primary" to='/'><i className="fas fa-angle-double-left"></i> Go Back</Link>
            {loading || contact===null ?  <div>Loading...</div> : contact.history !== null ? (
                contact.history.calls.map(call => {
                    return (
                        <div className="post post-history bg-white p-1 my-1" key={call.id}>
                            <div className="user-icon">
                                <i className="fas fa-user-circle"></i>
                            </div>
                            <div className="user-profile my-1">
                                <h3 className="user-name">{call.contact.name}</h3>
                            </div>
                            <div className="user-actions">
                                <p className="my-1"><i className="fas fa-history"></i> {call.time}</p>
                            </div>
                        </div>
                    )
                })
            ) : "No phone calls history for this contact"}
        </Fragment>

    );
};

CallsList.propTypes = {
    contact: PropTypes.object.isRequired,
    fetchCallHistoryAction: PropTypes.func.isRequired
};

const mapDispatchToProps = state => (
    {contact: state.contact}
);

export default connect(mapDispatchToProps, {fetchCallHistoryAction})(CallsList);

