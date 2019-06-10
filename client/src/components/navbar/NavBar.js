/**
 * Created by agros on 09.06.2019.
 */
import React from 'react';

const NavBar = ({toggleCreateForm}) => {
    return (
        <div className="navbar-collapse">
            <h1>My contacts <i className="fas fa-address-book"></i></h1>
            <button className="btn btn-primary" onClick={toggleCreateForm}>
                <i className="fa fa-plus"></i>Create contact
            </button>
        </div>
    )
};

export default NavBar;
