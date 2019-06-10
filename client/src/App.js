import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

import NotFound from './components/layout/NotFound';
import Contacts from './components/contacts/Contacts';
import CallsList from './components/callsList/CallsList';
import EditContact from './components/contacts/EditContact';



//App component with routes
const App = () => {
  return (
            <section className="container">
                <Provider store={store}>
                <Router>
                  <Switch>
                    <Route exact path="/" component={Contacts}/>
                    <Route exact path="/contacts/:id" component={CallsList}/>
                    <Route exact path="/contacts/edit/:id" component={EditContact}/>
                    <Route component={NotFound}/>
                  </Switch>
                </Router>
                </Provider>
            </section>
  );
};

export default App;
