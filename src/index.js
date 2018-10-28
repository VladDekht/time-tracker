import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Online, Offline } from 'react-detect-offline';
import { Button } from '@material-ui/core';
import './index.css';
import thunk from 'redux-thunk';
import form from './containers/App';
import * as serviceWorker from './serviceWorker';
import Login from './containers/Login';
import CreateAccount from './containers/CreateAccount';
import reducers from './reducers/index';
import PageNotFound from './containers/PageNotFound';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <div>
    <Online>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={CreateAccount} />
            <Route path="/" exact component={form} />
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
            <h3>Try again</h3>
          </Button>
        </div>
      </div>
    </Offline>
  </div>,

  document.getElementById('root')
);
serviceWorker.unregister();
