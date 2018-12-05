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
        confirmEmail: propTypes.func,
        error: propTypes.object,
        history: propTypes.object,
        match: propTypes.object,
    };

    componentDidMount() {
        setTimeout(() => {
            this.props.confirmEmail(this.props.match.params.token);
        });
    }

    onConfirmEmail = () => {
        this.props.history.replace('/account');
    }

    render() {
        const {
            props: { error },
        } = this;

        return (
            <div className="confirm-email-page">
                <div className="card card-2">
                    {error ? (
                        <div className="alert alert-danger">
                            {error.message}
                        </div>
                    ) : (
                        <div>
                            Confirming your email...
                        </div>
                    )}
                </div>
            </div>
        );
    }
};


LoginPage.propTypes = {};

export default AuthHOC(LoginPage);