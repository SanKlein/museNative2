import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard, Linking } from 'react-native'
import { connect } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { changeLoginName, changeLoginEmail, changeLoginPassword, changeLoginState, signupUser, loginUser, clearLogin, cancelLogin } from '../actions/loginActions'
import { setError } from '../actions/errorActions'
import { capitalizeFirstLetter, checkEmail } from '../functions/stringFunctions'
import Page from '../containers/Page'
import Container from '../containers/Container'
import Error from '../components/Error'

class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeLogin = this.handleChangeLogin.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.name) {
      this.props.navigator.resetTo({name: 'Categories'})
    }
  }

  componentWillUnmount() {
    this.props.clearLogin()
  }

  handleChangeName(text) {
    this.props.changeLoginName(capitalizeFirstLetter(text))
  }

  handleChangeEmail(text) {
    this.props.changeLoginEmail(capitalizeFirstLetter(text))
  }

  handleChangePassword(text) {
    this.props.changeLoginPassword(text)
  }

  handleChangeLogin() {
    Keyboard.dismiss(0)
    const { login, changeLoginState } = this.props
    changeLoginState(!login.login)
  }

  handleSubmit(e) {
    Keyboard.dismiss(0)
    e.preventDefault()
    let { user, login, loginUser, signupUser, loading, setError, state } = this.props

    if (loading) { return }
    if (login.login) {
      if (!login.name && !login.password) {
        setError('Please enter your name/email and password')
        return
      } else if (!login.name) {
        setError('Please enter your name or email')
        return
      } else if (!login.password) {
        setError('Please enter your password')
        return
      }
    } else {
      if (!login.name && !login.email && !login.password) {
        setError('Please enter your name, email, and password')
        return
      } else if (!login.name) {
        setError('Please enter your name')
        return
      } else if (!login.email) {
        setError('Please enter your email')
        return
      } else if (!login.password) {
        setError('Please enter your password')
        return
      } else if (!checkEmail(login.email)) {
        setError('Please enter your valid email')
        return
      }
    }

    login._id = user._id
    login.created = user.created
    login.answered = user.answered
    login.favorites = user.favorites
    login.saved = user.saved
    login.daily = user.daily
    login.categories = user.categories

    if (login.login) {
      loginUser(login)
    } else {
      signupUser(login)
    }
  }

  handlePrivacy() {
    Linking.openURL('http://www.reflectwithmuse.com/privacy')
  }

  render() {
    const { login, loading, error, navigator } = this.props
    const loginButton = loading && login.name ? 'Loading...' : login.login ? 'Log in' : 'Sign up'
    const policyButton = login.login ? 'Log in' : 'Sign up'
    const switchButton = login.login ? 'Sign up' : 'Log in'

    let loginState
    if (error) {
      loginState = false
    } else {
      if (login.login) {
        if (login.name && login.password) {
          loginState = true
        } else {
          loginState = false
        }
      } else {
        if (login.name && login.email && checkEmail(login.email) && login.password) {
          loginState = true
        } else {
          loginState = false
        }
      }
    }

    let loginClasses = ''
    let loginTextClasses = ''
    if (loginState) {
      loginClasses = [styles.loginButton, styles.purpleButton]
      loginTextClasses = [styles.loginButtonText, styles.purpleButtonText]
    } else {
      loginClasses = styles.loginButton
      loginTextClasses = styles.loginButtonText
    }

    return (
      <Page>
        <Container>
        { error ? <Error>{error}</Error> : null }
          <View style={styles.content}>
            { !login.login ? <View>
              <Text style={styles.label}>Name</Text>
              <TextInput placeholderTextColor='#AAA' selectionColor='#967ADC' style={styles.name} value={login.name} onChangeText={this.handleChangeName} onSubmitEditing={() => this.refs.Email.focus()} placeholder="Name" autoCapitalize='words' autoFocus={true} autoCorrect={false} autoFocus returnKeyType='next' />
              <Text style={styles.label}>Email</Text>
              <TextInput placeholderTextColor='#AAA' selectionColor='#967ADC' style={styles.email} ref="Email" keyboardType="email-address" value={login.email} onChangeText={this.handleChangeEmail} onSubmitEditing={() => this.refs.Password.focus()} placeholder="Email" autoCorrect={false} returnKeyType='next' />
            </View> : <View>
              <Text style={styles.label}>Email</Text>
              <TextInput placeholderTextColor='#AAA' selectionColor='#967ADC' style={styles.name} value={login.name} onChangeText={this.handleChangeName} onSubmitEditing={() => this.refs.Password.focus()} placeholder="Or name" autoCapitalize='words' autoFocus={true} autoCorrect={false} returnKeyType='next' />
            </View> }
            <Text style={styles.label}>Password</Text>
            <TextInput placeholderTextColor='#AAA' selectionColor='#967ADC' ref="Password" style={styles.password} secureTextEntry={true} value={login.password} onChangeText={this.handleChangePassword} placeholder="Password" autoCorrect={false} onSubmitEditing={this.handleSubmit} returnKeyType='go' />
            <TouchableOpacity style={loginClasses} onPress={this.handleSubmit} activeOpacity={.7}>
              <Text style={loginTextClasses}>{loginButton}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handlePrivacy} style={styles.agree} activeOpacity={.7}><Text style={styles.link}>{"By pressing '"}{policyButton}{"', you agree with our Privacy Policy and Terms of Service"}</Text></TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.switchButton} onPress={this.handleChangeLogin} activeOpacity={.7}>
              <Text style={styles.headerButtonText}>{switchButton}</Text>
            </TouchableOpacity>
          </View>
        </Container>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 3,
    fontSize: 15,
    color: '#777',
    fontWeight: '700',
  },
  name: {
    fontSize: 15,
    color: '#474747',
    lineHeight: 24,
    height: 32,
    marginBottom: 5,
    fontWeight: '700',
  },
  email: {
    fontSize: 15,
    color: '#474747',
    lineHeight: 24,
    height: 32,
    marginBottom: 5,
    fontWeight: '700',
  },
  password: {
    fontSize: 15,
    color: '#474747',
    lineHeight: 32,
    height: 32,
    marginBottom: 25,
    fontWeight: '700',
  },
  loginButton: {
    backgroundColor: '#F0F0F0',
    height: 54,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#474747',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '700',
  },
  purpleLoginButton: {
    backgroundColor: '#967ADC',
    height: 54,
    borderRadius: 30,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  purpleLoginButtonText: {
    color: '#FFF',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '700',
  },
  buttonContainer: {
    paddingTop: 5,
    paddingBottom: 20,
  },
  switchButton: {
    marginTop: 5,
    marginBottom: 100,
  },
  headerButtonText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    fontWeight: '600',
  },
  purpleButton: {
    backgroundColor: '#967ADC',
  },
  purpleButtonText: {
    color: '#FFF',
  },
  agree: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 25,
  },
  link: {
    fontSize: 12,
    color: '#AAA',
    textAlign: 'center',
    fontWeight: '600',
  },
})

LoginPage.propTypes = {
  login: PropTypes.object.isRequired,
  changeLoginName: PropTypes.func.isRequired,
  changeLoginEmail: PropTypes.func.isRequired,
  changeLoginPassword: PropTypes.func.isRequired,
  changeLoginState: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  signupUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  clearLogin: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  cancelLogin: PropTypes.func.isRequired,
}

const mapStateToProps = ({ user, login, loading, error, state }) => ({ user, login, loading, error, state })

LoginPage = connect(
  mapStateToProps,
  { changeLoginName, changeLoginEmail, changeLoginPassword, changeLoginState, signupUser, loginUser, clearLogin, setError, cancelLogin }
)(LoginPage)

export default LoginPage
