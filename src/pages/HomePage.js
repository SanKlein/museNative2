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
    this.goBack = this.goBack.bind(this)
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
    navigator.push({ name: 'Categories' })
  }

  goBack() {
    this.props.navigator.pop(0)
  }

  handlePrivacy() {
    Linking.openURL('http://www.reflectwithmuse.com/privacy')
  }

  handleEmail() {
    Linking.openURL('mailto:parker@reflectwithmuse.com?subject=Hi Parker')
  }

  handleTwitter() {
    Linking.openURL('https://twitter.com/reflectwithmuse')
  }

  handleInstagram() {
    Linking.openURL('https://www.instagram.com/reflectwithmuse/')
  }

  handleFacebook() {
    Linking.openURL('https://www.facebook.com/reflectwithmuse/')
  }

  render() {
    const { user, state } = this.props

    return (
      <View style={styles.page}>
        <Image style={styles.logo} source={require('../../muse.png')} />
        <View style={styles.content}>
          <Text style={styles.subheader}>Mission</Text>
          <Text style={styles.mission}>{"Help you clarify your values through daily reflection, so you can create a happier, more meaningful life, doing what you love"}</Text>
        </View>
        <Footer margin top>
          { !this.state.showAgree ? <FooterButton handleClick={this.goBack} big purple text='Back to müse' /> : <FooterButton handleClick={this.handleStart} big purple text='Start' /> }
        </Footer>
        <Footer margin>
          { !user.name && <FooterButton handleClick={this.handleLogin} big text='Log in' /> }
        </Footer>
        { this.state.showAgree && <TouchableOpacity onPress={this.handlePrivacy} style={styles.agree} activeOpacity={.7}><Text style={styles.link}>{"By pressing 'Start', you agree with our Privacy Policy and Terms of Service"}</Text></TouchableOpacity> }
        <TouchableOpacity onPress={this.handleEmail} style={styles.contactButton} activeOpacity={.7}>
          <Text style={styles.contactText} onClick={this.handleEmail}>Contact</Text>
        </TouchableOpacity>
        <View style={styles.socialButtons}>
          <TouchableOpacity onPress={this.handleTwitter} style={styles.socialButton} activeOpacity={.7}>
            <FontAwesome size={20} name="twitter" color="#777" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleInstagram} style={styles.socialButton} activeOpacity={.7}>
            <FontAwesome size={20} name="instagram" color="#777" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleFacebook} style={styles.socialButton} activeOpacity={.7}>
            <FontAwesome size={20} name="facebook" color="#777" />
          </TouchableOpacity>
        </View>
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
    marginTop: 20,
    height: 83,
    minHeight: 83,
    width: 224,
    minWidth: 224,
    alignSelf: 'center',
    marginTop: 40,
  },
  content: {
    marginTop: 30,
    marginBottom: 25,
  },
  subheader: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
    paddingLeft: 50,
    paddingRight: 50,
    color: '#777',
    fontWeight: '700',
  },
  mission: {
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  contactButton: {
    marginTop: 40,
  },
  contactText: {
    color: '#777',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
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
  socialButtons: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    marginLeft: 15,
    marginRight: 15,
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
