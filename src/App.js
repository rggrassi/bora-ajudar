import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Sobre from './Sobre';
import Contato from './Contato';
import Campanhas from './Campanhas';
import Admin from './Admin';
import base, { auth } from './base';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      campanhas: {},
      isAuthing: true,
      isLoggedIn: false,
      user: null
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

  render() {
    const { campanhas, user, isLoggedIn, isAuthing } = this.state;
    return (
      <Router>
        <div>
          <Header />          
          <Route exact path='/' component={Home} />
          <Route path='/sobre' component={Sobre} />
          <Route path='/contato' component={Contato} />
          <Route path='/campanhas' 
          render={props => {
            return <Campanhas {...props} campanhas={campanhas} />            
          }}
          >
          </Route>
          <Route path='/admin' 
            render={props => {
              return <Admin {...props} user={user} isLoggedIn={isLoggedIn} isAuthing={isAuthing} />
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