import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Button, Col, Row, Icon, notification } from 'antd';
import { AutoForm, AutoField, ErrorsField } from 'uniforms-antd';
import SimpleSchema from 'simpl-schema';

class Register extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = data => {
        Meteor.call('user.register', data, err => {
            if (!err) {
                Meteor.loginWithPassword(data.email, data.password, err => {
                    if (err) {
                        return notification.error({
                            message: 'Error Registering',
                            description: err.reason
                        });
                    }
                    this.props.history.push('/posts');
                });
            } else {
                notification.error({
                    message: 'Error Registering',
                    description: err.reason
                });
            }
        });
    };

    render() {
        return (
            <Row className="authentication">
                <Col span={12} offset={6}>
                    <AutoForm
                        schema={RegisterSchema}
                        onSubmit={this.onSubmit}
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
                            name="email"
                            placeholder="Email"
                            label={false}
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
                            placeholder="Password *"
                        />
                        <AutoField
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            name="confirm_password"
                            type="password"
                            placeholder="Confirm password"
                            label={false}
                        />
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: '100%' }}
                        >
                            Create account
                        </Button>
                    </AutoForm>
                </Col>
            </Row>
        );
    }
}

const RegisterSchema = new SimpleSchema({
    email: { type: String, regEx: SimpleSchema.RegEx.Email },
    password: { type: String },
    confirm_password: {
        type: String,
        custom() {
            if (this.value !== this.field('password').value) {
                return 'passwordMismatch';
            }
        }
    }
});

Register.propTypes = {
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

export default Register;
