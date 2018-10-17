import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Sobre from './Sobre';
import Contato from './Contato';
import Campanhas from './Campanhas';
import Admin from './Admin';
import Login from './Login';
import base, { auth } from './base';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      campanhas: {},
      isAuthing: true,
      user: null,

      isLoggedIn: true,

      errorLogin: false,
      isLogging: false,

      tipoCampanha: ''
    }
  }

  componentDidMount() {
    base.syncState('campanhas', {
      context: this,
      state: 'campanhas',
      asArray: false
    })

    auth.onAuthStateChanged(user => {
      this.setState({
        isAuthing: false,
        isLoggedIn: !!user,
        user
      })
    })
  } 

  handleLogin = async (email, passwd) => {
    this.setState({ isLogging: true, errorLogin: false });
    try {
      await auth.signInWithEmailAndPassword(email, passwd);
      this.setState({ 
        isLoggedIn: true,
        errorLogin: false,
        isLogging: false
      })
    } catch(err) {
      this.setState({ 
        errorLogin: true,
        isLogging: false,        
      })
    }
  }

  removeCampanha = (key) => {
    base.remove(`campanhas/${key}`);
  }

  handleSave = campanha => {
    return base.push('campanhas', {
      data: campanha
    })
  }

  handleTipoDoacao = tipo => {

    this.setState({ tipoCampanha: tipo })
  }

  render() {
    const { campanhas, user, isLoggedIn, isAuthing, errorLogin, isLogging, tipoCampanha } = this.state;
    return (
      <Router>        
        <div>
          <Header />          
          <Route exact path='/' component={Home} />
          <Route path='/sobre' component={Sobre} />
          <Route path='/contato' component={Contato} />
          <Route path='/campanhas' 
            render={props => {
              return <Campanhas {...props} campanhas={campanhas}/>            
            }}
          >
          </Route>
          <Route path='/admin' 
            render={props => {
              return (
                <Admin 
                  {...props} 
                  user={user} 
                  isLoggedIn={isLoggedIn} 
                  isAuthing={isAuthing}
                  campanhas={campanhas}
                  removeCampanha={this.removeCampanha}
                  handleSave={this.handleSave}
                  handleTipoDoacao={this.handleTipoDoacao}
                  tipoCampanha={tipoCampanha}
                />
              )  
            }} 
          >
          </Route>
          <Route path='/login' 
            render={props => {
              return ( 
                <Login 
                  {...props} 
                  handleLogin={this.handleLogin} 
                  isLoggedIn={isLoggedIn} 
                  errorLogin={errorLogin}
                  isLogging={isLogging}
                />  
              )
            }}
          >          
          </Route>  
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;