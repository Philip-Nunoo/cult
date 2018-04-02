import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Button, Col, Row, Icon, notification } from 'antd';
import { Link } from 'react-router-dom';
import { AutoForm, AutoField, ErrorsField } from 'uniforms-antd';
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
            notification.error({
                message: 'Error logging in',
                description: err.reason
            });
        });
    };

    render() {
        return (
            <Row className="authentication">
                <Col span={12} offset={6}>
                    <AutoForm
                        onSubmit={this.handleLogin}
                        schema={LoginSchema}
                        style={{
                            background: '#fff',
                            padding: 24,
                            marginBottom: 100,
                            marginTop: 100
                        }}
                    >
                        <ErrorsField />
                        <AutoField
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            label={false}
                            name="email"
                            placeholder="Email"
                        />
                        <AutoField
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            label={false}
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: '100%', marginBottom: 10 }}
                        >
                            Log in
                        </Button>
                        Or <Link to="/register">register now!</Link>
                    </AutoForm>
                </Col>
            </Row>
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
