// @flow

import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components';

import Button from './components/Button';
import Input from './components/Input';
import UserRegisterWithEmailMutation from './UserRegisterWithEmailMutation.js';

const Wrapper = styled.View`
  flex: 1;
`;

const ButtonText = styled.Text`
  color: #000;
  font-weight: 700;
  font-size: 24px;
`;

type State = {
  name: string,
  email: string,
  password: string,
};

class UserCreate extends Component<any, Props, State> {
  static navigationOptions = {
    title: 'UserCreate',
  };

  state = {
    name: '',
    email: '',
    password: '',
  };

  handleRegister = () => {
    const { name, email, password } = this.state;

    const input = {
      name,
      email,
      password,
    }

    const onCompleted = () => {
      console.log('onCompleted');

      this.props.navigation.navigate('UserList');
    }

    const onError = () => {
      console.log('onError');
    }

    UserRegisterWithEmailMutation.commit(input, onCompleted, onError);
  }

  goToList = () => {
    this.props.navigation.navigate('UserList');
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <Wrapper>
        <Input
          name="name"
          placeholder="Name"
          value={name}
          onChangeText={value => this.setState({ name: value })}
        />
        <Input
          name="email"
          placeholder="Email"
          value={email}
          onChangeText={value => this.setState({ email: value })}
        />
        <Input
          name="password"
          placeholder="Password"
          value={password}
          onChangeText={value => this.setState({ password: value })}
          secureTextEntry
        />
        <Button onPress={() => this.handleRegister()}>
          <ButtonText>Register</ButtonText>
        </Button>

        <Button onPress={() => this.goToList()}>
          <ButtonText>Lista de usuários</ButtonText>
        </Button>
      </Wrapper>
    );
  }
}

export default UserCreate;
