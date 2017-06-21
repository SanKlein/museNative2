import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text, Linking, TouchableOpacity, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { loadLogin } from '../actions/loginActions'
import { startApp } from '../actions/userActions'
import Footer from '../containers/Footer'
import FooterButton from '../components/FooterButton'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showAgree: true
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleAbout = this.handleAbout.bind(this)
  }

  componentWillMount() {
    if (this.props.state !== 'home') {
      this.setState({ showAgree: false })
    }
  }

  handleLogin() {
    const { loadLogin, navigator } = this.props

    loadLogin()
    navigator.push({ name: 'Login' })
  }

  handleStart() {
    const { startApp, navigator } = this.props

    startApp()
    navigator.replace({ name: 'Categories' })
  }

  handlePrivacy() {
    Linking.openURL('http://www.reflectwithmuse.com/privacy')
  }

  handleAbout() {
    this.props.navigator.push({ name: 'About' })
  }

  render() {
    const { user, state } = this.props

    return (
      <View style={styles.page}>
        <Image style={styles.logo} source={require('../../muse.png')} />
        <View style={styles.content}>
          <Text style={styles.subheader}>Mission</Text>
          <Text style={styles.mission}>{"Help people become self-aware\nand live a meaningful life"}</Text>
        </View>
        <Footer margin top>
          <FooterButton handleClick={this.handleStart} big purple text='Start müsing' />
        </Footer>
        <Footer margin>
          { !user.name && <FooterButton handleClick={this.handleLogin} big text='Log in' /> }
        </Footer>
        { this.state.showAgree && <TouchableOpacity onPress={this.handlePrivacy} style={styles.agree} activeOpacity={.7}><Text style={styles.link}>{"By pressing 'Start', you agree with our Privacy Policy and Terms of Service"}</Text></TouchableOpacity> }
        <TouchableOpacity onPress={this.handleAbout} style={styles.contactButton} activeOpacity={.7}>
          <Text style={styles.contactText}>{"What's Müse and why should we use it?"}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  logo: {
    height: 83,
    minHeight: 83,
    width: 224,
    minWidth: 224,
    alignSelf: 'center',
  },
  content: {
    marginTop: 30,
    marginBottom: 25,
  },
  subheader: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 8,
    paddingLeft: 50,
    paddingRight: 50,
    color: '#777',
    fontWeight: '700',
  },
  mission: {
    textAlign: 'center',
    paddingLeft: 23,
    paddingRight: 23,
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  contactButton: {
    marginTop: 40,
  },
  contactText: {
    color: '#777',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    paddingBottom: 20,
  },
  agree: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 0,
  },
  link: {
    fontSize: 12,
    color: '#AAA',
    textAlign: 'center',
    fontWeight: '600',
  },
})

HomePage.propTypes = {
  user: PropTypes.object.isRequired,
  loadLogin: PropTypes.func.isRequired,
  startApp: PropTypes.func.isRequired,
}

const mapStateToProps = ({ user, state }) => ({ user, state })

HomePage = connect(
  mapStateToProps,
  { loadLogin, startApp }
)(HomePage)

export default HomePage
