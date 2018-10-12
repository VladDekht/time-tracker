import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import form from './App';
import * as serviceWorker from './serviceWorker';
import { Provider, connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Containers/Login';
import CreateAccount from './Containers/CreateAccount';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers/index';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/Login' component={Login} />
                <Route path='/CreateAccount' component={CreateAccount} />
                <Route path='/' component={form} />
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
