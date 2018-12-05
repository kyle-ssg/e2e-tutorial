import React from 'react';
import { Route, Link, Router, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import createBrowserHistory from 'history/createBrowserHistory';
import LoginPage from '../pages/LoginPage';
import ConfirmEmailPage from '../pages/ConfirmEmailPage';
import NotFoundPage from '../pages/NotFoundPage';
import CheckEmailPage from '../pages/CheckEmailPage';
import LoggedInPage from '../pages/LoggedInPage';

// Examples


window.Link = Link;

const history = createBrowserHistory();

const TheComponent = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route exact path="/" component={LoginPage}/>
                <Route exact path="/check-email" component={CheckEmailPage}/>
                <Route exact path="/confirm-email/:token" component={ConfirmEmailPage}/>
                <Route exact path="/account" component={LoggedInPage}/>
                <Route exact path="*" component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
);

TheComponent.displayName = 'Router';
TheComponent.propTypes = {};

export default hot(module)(TheComponent);
