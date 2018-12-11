import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import initialState from './reducers/initialState';
import configStore from './store/configStore';
import App from './App';

const store = configStore(initialState);

class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isStoreLoading: true,
      store: store
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('museStore')
      .then(value => {
        value && value.length
          ? this.setState({ store: configStore(JSON.parse(value)) })
          : this.setState({ store });
        this.setState({ isStoreLoading: false });
      })
      .catch(error => {
        this.setState({ isStoreLoading: false });
      });
  }

  render() {
    return (
      <View style={styles.app}>
        {this.state.isStoreLoading ? (
          <View style={styles.container}>
            <ActivityIndicator animating={true} size="large" color="#333" />
          </View>
        ) : (
          <Provider store={this.state.store}>
            <App />
          </Provider>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  app: {
    flex: 1,
    backgroundColor: '#FFF'
  }
});

export default Root;
