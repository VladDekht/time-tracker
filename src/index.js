import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import form from './Containers/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Containers/Login';
import CreateAccount from './Containers/CreateAccount';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers/index';
import PageNotFound from './Containers/PageNotFound';
import { Online, Offline } from 'react-detect-offline';
import { Button } from '@material-ui/core';


const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <div>
        <Online>
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route path='/login' exact component={Login} />
                        <Route path='/register' exact component={CreateAccount} />
                        <Route path='/' exact component={form} />
                        <Route component={PageNotFound} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        </Online>
        <Offline>
            <div>
                <div style={{ marginLeft: '42%' }}>
                    <h1>No internet connection</h1>
                    <Button onClick={() => window.location.reload()}>
                        <h3>
                            Try again
                        </h3>
                    </Button>
                </div>
            </div>
        </Offline>
    </div>

    , document.getElementById('root'));
serviceWorker.unregister();
