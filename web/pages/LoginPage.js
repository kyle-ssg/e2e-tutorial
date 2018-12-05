/**
 *
 */
import React, { Component } from 'react';
// eslint-disable-next-line
import propTypes from 'prop-types';

// eslint-disable-next-line
import { safeParseEventValue } from '../../common/utils';
import AuthHOC from '../../common/AuthHOC';

const LoginPage = class extends Component {
    static displayName = 'LoginPage';

    static propTypes = {
        history: propTypes.object,
        error: propTypes.object,
        login: propTypes.func,
        register: propTypes.func,
    };

    state = {};

    toggleLogin = () => {
        this.setState({ isRegistering: !this.state.isRegistering });
    }

    onLogin = () => {
        this.props.history.replace('/account');
    };

    onRegister = () => {
        this.props.history.replace(`/check-email?email=${this.state.email}`);
    };

    render() {
        const {
            toggleLogin,
            props: { error },
            state: { email, password, isRegistering },
        } = this;
        const loginSubmit = email && password ? (e) => { e.preventDefault(); this.props.login({ email, password }); } : null;
        const registerSubmit = email && password ? (e) => { e.preventDefault(); this.props.register({ email, password }); } : null;

        return (
            <div data-test="login-page" className="login-page">
                <div className="card card-2">
                    { isRegistering ? (
                        <form onSubmit={loginSubmit}>
                            <input
                              data-test="registration-email" type="email" placeholder="Email Address"
                              onChange={e => this.setState({ email: safeParseEventValue(e) })}
                            />
                            <input
                              data-test="registration-password" type="password" placeholder="Password"
                              onChange={e => this.setState({ password: safeParseEventValue(e) })}
                            />
                            <button
                              data-test="registration-submit"
                              className="btn btn-primary" type="submit" disabled={!registerSubmit}
                              onClick={registerSubmit}
                            >
                                Register
                            </button>
                            <div className="text-center">
                                <button
                                  data-test="toggle-login"
                                  onClick={toggleLogin} type="button" className="btn btn-link"
                                >
                                    Already a member? Login
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={loginSubmit}>
                            <input
                              data-test="login-email"
                              type="email" placeholder="Email Address" onChange={e => this.setState({ email: safeParseEventValue(e) })}
                            />
                            <input
                              data-test="login-password" type="password" placeholder="Password"
                              onChange={e => this.setState({ password: safeParseEventValue(e) })}
                            />

                            <button
                              data-test="login-submit"
                              type="submit" className="btn btn-primary" disabled={!loginSubmit}
                              onClick={loginSubmit}
                            >
                                Login
                            </button>
                            <div className="text-center">
                                <button
                                  data-test="toggle-login" onClick={toggleLogin} type="button"
                                  className="btn btn-link"
                                >
                                Not a member? Register
                                </button>
                            </div>
                        </form>
                    )}

                    {error && (
                        <div className="alert alert-danger">
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        );
    }
};


LoginPage.propTypes = {};

export default AuthHOC(LoginPage);