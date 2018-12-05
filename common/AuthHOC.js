import React from 'react';
import propTypes from 'prop-types';

import Project from './project';
import data from './data/base/_data';

const STORAGE_KEY = 'user';
let user;
export default (WrappedComponent) => {
    class HOC extends React.Component {
        static defaultProps = {
            onConfirmEmail: null,
            onLogin: null,
            onLogout: null,
            onRegister: null,
        };

        static propTypes = {
            onConfirmEmail: propTypes.func,
            onLogin: propTypes.func,
            onLogout: propTypes.func,
            onRegister: propTypes.func,
        };

        constructor(props) {
            super(props);
            this.state = {
                isLoading: false,
                user,
            };
        }

        onError = error => this.setState({ error });

        register = ({ email, password }) => {
            data.post(`${Project.api}user/register`, { email, password })
                .then(this.wrappedComponent.onRegister)
                .catch(this.onError);
        };

        confirmEmail = (token) => {
            data.get(`${Project.api}user/confirm-email/${encodeURIComponent(token)}`)
                .then(this.onUser)
                .then(this.wrappedComponent.onConfirmEmail)
                .catch(this.onError);
        };

        onUser = userResponse => new Promise((resolve) => {
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userResponse));
            this.setState({ user: userResponse }, resolve);
        });

        login = ({ email, password }) => {
            data.post(`${Project.api}user/login`, { email, password })
                .then(this.onUser)
                .then(this.wrappedComponent.onLogin)
                .catch(this.onError);
        };

        logout = () => {
            AsyncStorage.removeItem(STORAGE_KEY);
            this.setState({ user: null }, this.wrappedComponent.onLogout);
        }

        render() {
            return (
                <WrappedComponent
                  ref={c => this.wrappedComponent = c}
                  confirmEmail={this.confirmEmail}
                  login={this.login}
                  logout={this.logout}
                  register={this.register}
                  {...this.state}
                  {...this.props}
                />
            );
        }
    }

    return HOC;
};
