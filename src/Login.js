import React from 'react';
import { Redirect } from 'react-router-dom';

let email = null;
let passwd = null;

const Login = props => {

    if (props.isLoggedIn) {
        return <Redirect to='/admin' />
    }

    return (
        <div>
            <input type='email' ref={ref => email = ref} />
            <input type='password' ref={ref => passwd = ref} />
            { props.errorLogin && <p>E-mail ou senha inválidos</p> }
            <button 
                disabled={props.isLogging} 
                onClick={() => props.handleLogin(email.value, passwd.value)}>
                Entrar
            </button>
        </div>
    )
}

export default Login