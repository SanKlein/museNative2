import React, { Component } from 'react'
import { View, AsyncStorage, ActivityIndicator, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import initialState from './reducers/initialState'
import configStore from './store/configStore'
import App from './pages/App'

const store = configStore(initialState)

class Root extends Component {
  constructor(props) {
    super(props)

    console.log('root')
    console.log(store)

    this.state = {
      isStoreLoading: true,
      store: store
    }
  }

  componentWillMount() {
    const self = this

    AsyncStorage.getItem('museStore').then(value => {
      (value && value.length) ? self.setState({ store: configStore(JSON.parse(value)) }) : self.setState({ store: store })
      self.setState({ isStoreLoading: false })
    }).catch(error => {
      self.setState({ isStoreLoading: false })
    })
  }

  render() {
    return (
      <View style={styles.app}>
        { this.state.isStoreLoading ?
          <View style={styles.container}>
            <ActivityIndicator animating={true} size="large" color="#474747" />
          </View>
          :
          <Provider store={this.state.store}>
            <App />
          </Provider>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  app: {
    flex: 1,
    backgroundColor: '#FFF',
  },
})

export default Root
