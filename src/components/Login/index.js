import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { Button } from 'antd';

const createToken = gql`
    mutation createToken($username: String!, $password: String!) {
    	createToken(username: $username, password: $password) {
	        token
	        success
        }
    }
`;

@graphql(createToken)
class Login extends Component {
    static get propTypes() {
        return {
            mutate: PropTypes.func.isRequired,
        };
    }

    handleClick() {
        this.props
            .mutate({
                variables: { username: 'Horizon', password: 'lisawang123' },
            })
            .then(({ data }) => {
                console.log('got data', data);
            })
            .catch(error => {
                console.log('there was an error sending the query', error);
            });
    }

    render() {
        return (
            <Button ghost type="primary" onClick={() => this.handleClick()}>
                blah
            </Button>
        );
    }
}

export default Login;
