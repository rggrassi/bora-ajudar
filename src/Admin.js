import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AdminCampanhas from './AdminCampanhas';

const AdminHome = () => <p>Seja bem vindo!</p>

const Admin = ({ 
    match, 
    campanhas, 
    isAuthing, 
    isLoggedIn, 
    removeCampanha, 
    handleSave, 
    handleTipoDoacao,
    tipoCampanha
}) =>  { 

    if (isAuthing) { 
        return <p>Carregando...</p>
    }    
    if (!isLoggedIn) {
        return <Redirect to='/login' />
    }

    return (
        <div className='card'>
            <h1>Painel administrativo</h1>
            <Route path='/' component={AdminHome} />
            <Route path={`${match.url}/campanhas`} 
                render={ props => {
                    return (
                        <AdminCampanhas {...props} 
                            campanhas={campanhas} 
                            removeCampanha={removeCampanha} 
                            handleSave={handleSave} 
                            handleTipoDoacao={handleTipoDoacao}
                            tipoCampanha={tipoCampanha}
                        />
                    ) 
                }}
            />
        </div>
    )
}

export default Admin;