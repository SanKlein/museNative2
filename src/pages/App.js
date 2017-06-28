import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Navigator, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ObjectID from 'bson-objectid'
import { loadApprovedPrompts, loadUserPrompts, loadTodayPrompt, loadCategory } from '../actions/promptActions'
import { loadUser, loadUserAnswers, loadCategories, createUser, startApp, editUser, resetSeen } from '../actions/userActions'
import { cancelLogin, changeLoginState } from '../actions/loginActions'
import { changeSearch } from '../actions/searchActions'
import { clearError } from '../actions/errorActions'
import { capitalizeFirstLetter } from '../functions/stringFunctions'
import { isToday } from '../functions/dateFunctions'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import CategoriesPage from './CategoriesPage'
import AnswerPage from './AnswerPage'
import AnswerSettingsPage from './AnswerSettingsPage'
import PastPage from './PastPage'
import UserProfilePage from './UserProfilePage'
import UserSettingsPage from './UserSettingsPage'
import ListPage from './ListPage'
import NewPromptPage from './NewPromptPage'
import StreakPage from './StreakPage'
import AboutPage from './AboutPage'
import StopPage from './StopPage'

class App extends Component {
  constructor(props) {
    super(props)

    this.handleBack = this.handleBack.bind(this)
    this.renderScene = this.renderScene.bind(this)
    this.changeSearchText = this.changeSearchText.bind(this)
    this.handleSettings = this.handleSettings.bind(this)
    this.handleCategories = this.handleCategories.bind(this)
    this.handleProfile = this.handleProfile.bind(this)
    this.handleChangeLogin = this.handleChangeLogin.bind(this)
  }

  componentWillMount() {
    let { user, loadApprovedPrompts, loadUserPrompts, loadUser, loadUserAnswers, loadCategories, createUser, loadTodayPrompt, resetSeen, seen, loadCategory } = this.props

    loadApprovedPrompts()
    loadCategories()
    loadTodayPrompt()
    loadCategory('')

    if (!isToday(seen.today)) {
      resetSeen()
    }

    if (user._id) {
      loadUserPrompts(user._id)
      loadUser(user._id)
      loadUserAnswers(user._id)
    } else {
      var newUser = {
        _id: ObjectID(),
        last: user.last
      }
      createUser(newUser)
    }
  }

  componentWillReceiveProps(nextProps) {
    let { user, createUser } = this.props

    if (!nextProps.user._id) {
      var newUser = {
        _id: ObjectID(),
        last: user.last
      }
      createUser(newUser)
    }
  }

  componentWillUnmount() {
    this.clearTimeout()
  }

  changeSearchText(text) {
    this.props.changeSearch(text)
  }

  handleProfile(navigator) {
    Keyboard.dismiss(0)

    const { category, loadCategory, list } = this.props

    if (category === 'Answers' || list) {
      loadCategory('')
      const route = navigator.getCurrentRoutes().find(route => route.name === 'UserProfile')
      route ? navigator.popToRoute(route) : navigator.push({ name: 'UserProfile' })
      return
    }

    navigator.push({ name: 'UserProfile' })
  }

  handleHome(navigator) {
    Keyboard.dismiss(0)
    navigator.push({ name: 'Home' })
  }

  handleSettings(navigator) {
    Keyboard.dismiss(0)
    const { user, editUser } = this.props
    editUser({ name: user.name, email: user.email })
    navigator.push({ name: 'UserSettings' })
  }

  handleBack(navigator) {
    Keyboard.dismiss(0)
    if (this.props.state !== 'started') {
      this.props.cancelLogin()
    }

    navigator.pop(0)
  }

  handleCategories(navigator) {
    const { category, loadCategory, list } = this.props

    Keyboard.dismiss(0)

    if (category === 'Answers') {
      loadCategory('')
      const route = navigator.getCurrentRoutes().find(route => route.name === 'Past')
      route ? navigator.popToRoute(route) : navigator.popToTop()
      return
    }

    if (list) {
      loadCategory('')
      const listRoute = navigator.getCurrentRoutes().find(route => route.name === 'List')
      listRoute ? navigator.popToRoute(listRoute) : navigator.popToTop()
      return
    }

    navigator.popToTop()
  }

  handleChangeLogin() {
    const { login, changeLoginState } = this.props
    changeLoginState(!login.login)
  }

  renderScene(route, navigator) {
    switch(route.name) {
      case 'Answer':
        return <AnswerPage navigator={navigator} />
      case 'Streak':
        return <StreakPage navigator={navigator} />
      case 'Home':
        return <HomePage navigator={navigator} />
      case 'Login':
        return <LoginPage navigator={navigator} />
      case 'UserProfile':
        return <UserProfilePage navigator={navigator} />
      case 'UserSettings':
        return <UserSettingsPage navigator={navigator} />
      case 'AnswerSettings':
        return <AnswerSettingsPage navigator={navigator} />
      case 'Past':
        return <PastPage navigator={navigator} />
      case 'List':
        return <ListPage navigator={navigator} />
      case 'NewPrompt':
        return <NewPromptPage navigator={navigator} />
      case 'About':
        return <AboutPage navigator={navigator} />
      case 'Stop':
        return <StopPage navigator={navigator} />
      default:
        return <CategoriesPage navigator={navigator} />
    }
  }

  configureScene(route, routeStack) {
    switch(route.name) {
      case 'UserProfile':
      case 'Past':
      case 'NewPrompt':
      case 'UserSettings':
      case 'Login':
      case 'AnswerSettings':
        return Navigator.SceneConfigs.FloatFromBottom
      case 'Home':
      case 'About':
        return Navigator.SceneConfigs.PushFromLeft
      default:
        return Navigator.SceneConfigs.PushFromRight
    }
  }

  render() {
    const { user, state, category, list, answer, answerState, listTitle, login } = this.props

    const switchButton = login.login ? 'Sign up' : 'Log in'

    // return (
    //   <TouchableOpacity style={styles.leftButton} activeOpacity={.7} onPress={() => this.handleHome(navigator)}>
    //     <FontAwesome size={22} name="home" color="#333" />
    //   </TouchableOpacity>
    // )

    return (
      <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss(0)}>
        <View style={styles.app}>
          <Navigator
            configureScene={ this.configureScene }
            style={{flex: 1}}
            initialRoute={{ name: 'Categories' }}
            renderScene={ this.renderScene }
            navigationBar={
              <Navigator.NavigationBar
                style={ styles.nav }
                routeMapper={{
                  LeftButton: (route, navigator, index, navState) => {
                    switch(route.name) {
                      case 'Categories':
                      case 'Home':
                      case 'Streak':
                      case 'About':
                      case 'Stop':
                        return (<TouchableOpacity style={styles.leftButton} activeOpacity={.7}></TouchableOpacity>)
                      case 'AnswerSettings':
                      case 'UserProfile':
                      case 'Past':
                      case 'NewPrompt':
                      case 'UserSettings':
                      case 'Login':
                        return (
                          <TouchableOpacity style={styles.leftButton} activeOpacity={.7} onPress={() => this.handleBack(navigator)}>
                            <Octicons size={24} name="x" color="#333" />
                          </TouchableOpacity>
                        )
                      case 'Answer':
                        return (
                          <TouchableOpacity style={styles.leftButton} activeOpacity={.7} onPress={() => this.handleCategories(navigator)}>
                            <Ionicons size={22} name="md-arrow-round-back" color="#333" />
                          </TouchableOpacity>
                        )
                      default:
                        return (
                          <TouchableOpacity style={styles.leftButton} activeOpacity={.7} onPress={() => this.handleBack(navigator)}>
                            <Ionicons size={22} name="md-arrow-round-back" color="#333" />
                          </TouchableOpacity>
                        )
                    }
                  },
                  Title: (route, navigator, index, navState) => {
                    switch(route.name) {
                      case 'Answer':
                        return (<Text style={styles.title}>{ list ? capitalizeFirstLetter(list) : category ? category : 'Everything' }</Text>)
                      case 'AnswerSettings':
                        return (<Text style={styles.title}>{ answer.categories.join(', ') }</Text>)
                      case 'Past':
                        return (<TextInput placeholderTextColor='#AAA' selectionColor='#967ADC' style={styles.searchBar} onChangeText={this.changeSearchText} placeholder='Search...' underlineColorAndroid='#FFF' />)
                      case 'NewPrompt':
                        return (<Text style={styles.title}>New Prompt</Text>)
                      case 'UserSettings':
                        return (<Text style={styles.title}>Edit Profile</Text>)
                      case 'List':
                        return (<Text style={styles.title}>{capitalizeFirstLetter(listTitle)}</Text>)
                      default:
                        return null
                    }
                  },
                  RightButton: (route, navigator, index, navState) => {
                    switch(route.name) {
                      case 'Home':
                      case 'NewPrompt':
                      case 'UserSettings':
                      case 'List':
                      case 'Past':
                      case 'AnswerSettings':
                        return (<TouchableOpacity style={styles.rightButton} activeOpacity={.7}></TouchableOpacity>)
                      case 'Login':
                        return (
                          <TouchableOpacity style={styles.rightTitleButton} activeOpacity={.7} onPress={this.handleChangeLogin}>
                            <Text style={styles.rightTitle}>{switchButton}</Text>
                          </TouchableOpacity>
                        )
                      case 'About':
                        return (
                          <TouchableOpacity style={styles.rightButton} activeOpacity={.7} onPress={() => this.handleBack(navigator)}>
                            <Ionicons name="md-arrow-round-forward" size={22} color="#333" />
                          </TouchableOpacity>
                        )
                      case 'UserProfile':
                        return user.name ? (
                          <TouchableOpacity style={styles.rightButton} activeOpacity={.7} onPress={() => this.handleSettings(navigator)}>
                            <Octicons size={22} name="gear" color="#333" />
                          </TouchableOpacity>
                        ) : (<TouchableOpacity style={styles.rightButton} activeOpacity={.7}></TouchableOpacity>)
                      default:
                        return (
                          <TouchableOpacity style={styles.rightButton} activeOpacity={.7} onPress={() => this.handleProfile(navigator)}>
                            <MaterialIcons name="person" size={22} color="#333" />
                          </TouchableOpacity>
                        )
                    }
                  }
                }}
              />
            }
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: '#FFF',
  },
  nav: {
    backgroundColor: '#FFF',
    height: 44,
    minHeight: 44,
    maxHeight: 44,
    padding: 0,
    margin: 0,
  },
  title: {
    height: 32,
    fontSize: 18,
    color: '#333',
    fontWeight: '700',
    zIndex: 50,
    marginTop: 12,
    marginBottom: 6,
    padding: 0,
  },
  rightTitleButton: {
    height: 32,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 6,
    marginLeft: 4,
    marginRight: 12,
  },
  rightTitle: {
    height: 32,
    fontSize: 16,
    alignSelf: 'flex-end',
    color: '#474747',
    fontWeight: '700',
  },
  leftButton: {
    height: 32,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 8,
  },
  rightButton: {
    height: 32,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 8,
  },
  headerButtonText: {
    fontSize: 17,
    textAlign: 'center',
    color: '#333',
  },
  searchBar: {
    height: 44,
    lineHeight: 44,
    fontSize: 18,
    color: '#333',
    fontWeight: '700',
    alignSelf: 'stretch',
    marginTop: 14,
  }
})

App.propTypes = {
  user: PropTypes.object.isRequired,
  state: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  loadApprovedPrompts: PropTypes.func.isRequired,
  loadUserPrompts: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  loadUserAnswers: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  startApp: PropTypes.func.isRequired,
  cancelLogin: PropTypes.func.isRequired,
  changeSearch: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
}

const mapStateToProps = ({ user, state, answers, answer, list, category, seen, listTitle, login, changeLoginState }) => ({ user, state, answers, answer, list, category, seen, listTitle, login, changeLoginState })

App = connect(
  mapStateToProps,
  { loadApprovedPrompts, loadUserPrompts, loadUser, loadUserAnswers, loadCategories, createUser, startApp, cancelLogin, changeSearch, editUser, loadTodayPrompt, resetSeen, loadCategory, clearError, changeLoginState }
)(App)

export default App
