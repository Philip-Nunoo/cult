import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { AutoForm, AutoField, ErrorsField } from 'uniforms-unstyled';
import SimpleSchema from 'simpl-schema';

class Login extends React.Component {
    constructor() {
        super();
    }

    handleLogin = data => {
        const { email, password } = data;
        Meteor.loginWithPassword(email, password, err => {
            if (!err) {
                return this.props.history.push('/posts');
            }
            alert(err.reason);
        });
    };

    render() {
        return (
            <div className="authentication">
                <AutoForm onSubmit={this.handleLogin} schema={LoginSchema}>
                    <ErrorsField />

                    <AutoField name="email" placeholder="Email" />

                    <AutoField
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                </AutoForm>
            </div>
        );
    }
}

const LoginSchema = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    password: { type: String }
});

Login.propTypes = {
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

export default Login;
