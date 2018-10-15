import React from 'react';
import { Redirect } from 'react-router-dom';

const Admin = props => { 
    return (
        <div>
            { props.isAuthing && <p>Aguarde...</p> }      
            { !props.isLoggedIn && <Redirect to='/login' /> }  
        </div>
    )   
}

export default Admin;