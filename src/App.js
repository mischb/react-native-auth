import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import firebase from 'firebase';

class App extends Component {
  state = { loggedIn: null };
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDJY-Bdnw57mnRqnx2TsT_gdpt8s24hqaw',
      authDomain: 'authentication-f04b4.firebaseapp.com',
      databaseURL: 'https://authentication-f04b4.firebaseio.com',
      projectId: 'authentication-f04b4',
      storageBucket: 'authentication-f04b4.appspot.com',
      messagingSenderId: '485574338256',
    });
    firebase.auth().onAuthStateChanged(user => {
      user
        ? this.setState({ loggedIn: true })
        : this.setState({ loggedIn: false });
    });
  }
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()} btnText={'Log Out'}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.spinnerStyle}>
            <Spinner />
          </View>
        );
    }
  }
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}
const styles = {
  spinnerStyle: {
    marginTop: '50%',
  },
};
export default App;
