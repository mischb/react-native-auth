import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

export default class LoginForm extends Component {
  state = { email: '', password: '', err: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({ err: '', loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.onLoginSuccess())
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => this.onLoginSuccess())
          .catch(() => {
            this.onLoginFail();
          });
      });
  }

  onLoginFail() {
    this.setState({ err: 'Authentication Failed', loading: false });
  }
  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      err: '',
    });
  }
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            keyboardType={'email-address'}
            placeholder={'user@gmail.com'}
            label={'Email'}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            placeholder={'abc123'}
            label={'Password'}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.state.err}</Text>

        <CardSection>
          {this.state.loading ? (
            <Spinner size={'small'} />
          ) : (
            <Button onPress={this.onButtonPress.bind(this)} btnText={'sign in'}>
              Log In
            </Button>
          )}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: { fontSize: 20, alignSelf: 'center', color: 'red' },
};
