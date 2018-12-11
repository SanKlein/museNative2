import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ObjectID from 'bson-objectid';
import {
  loadApprovedPrompts,
  loadUserPrompts,
  loadTodayPrompt,
  loadCategory
} from '../actions/promptActions';
import {
  loadUser,
  loadUserAnswers,
  loadCategories,
  createUser,
  editUser,
  resetSeen
} from '../actions/userActions';
import { changeSearch } from '../actions/searchActions';
import { clearError } from '../actions/errorActions';
import { capitalizeFirstLetter } from '../functions/stringFunctions';
import { isToday } from '../functions/dateFunctions';
import LoginPage from './LoginPage';
import CategoriesPage from './CategoriesPage';
import AnswerPage from './AnswerPage';
import AnswerSettingsPage from './AnswerSettingsPage';
import PastPage from './PastPage';
import UserProfilePage from './UserProfilePage';
import UserSettingsPage from './UserSettingsPage';
import ListPage from './ListPage';
import NewPromptPage from './NewPromptPage';
import StreakPage from './StreakPage';
import AboutPage from './AboutPage';
import StopPage from './StopPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleBack = this.handleBack.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.changeSearchText = this.changeSearchText.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
    this.handleCategories = this.handleCategories.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
  }

  componentWillMount() {
    let {
      user,
      loadApprovedPrompts,
      loadUserPrompts,
      loadUser,
      loadUserAnswers,
      loadCategories,
      createUser,
      loadTodayPrompt,
      resetSeen,
      seen,
      loadCategory
    } = this.props;

    loadApprovedPrompts();
    loadCategories();
    loadTodayPrompt();
    loadCategory('');

    if (!isToday(seen.today)) {
      resetSeen();
    }

    if (user._id) {
      loadUserPrompts(user._id);
      loadUser(user._id);
      loadUserAnswers(user._id);
    } else {
      var newUser = {
        _id: ObjectID(),
        last: user.last
      };
      createUser(newUser);
    }
  }

  componentWillReceiveProps(nextProps) {
    let { user, createUser } = this.props;

    if (!nextProps.user._id) {
      var newUser = {
        _id: ObjectID(),
        last: user.last
      };
      createUser(newUser);
    }
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  changeSearchText(text) {
    this.props.changeSearch(text);
  }

  handleProfile(navigator) {
    Keyboard.dismiss(0);

    const { category, loadCategory, list } = this.props;

    if (category === 'Answers' || list) {
      loadCategory('');
      const route = navigator.getCurrentRoutes().find(route => route.name === 'UserProfile');
      route ? navigator.popToRoute(route) : navigator.push({ name: 'UserProfile' });
      return;
    }

    navigator.push({ name: 'UserProfile' });
  }

  handleSettings(navigator) {
    Keyboard.dismiss(0);
    const { user, editUser } = this.props;
    editUser({ name: user.name, email: user.email });
    navigator.push({ name: 'UserSettings' });
  }

  handleBack(navigator) {
    Keyboard.dismiss(0);

    navigator.pop(0);
  }

  handleCategories(navigator) {
    const { category, loadCategory, list } = this.props;

    Keyboard.dismiss(0);

    if (category === 'Answers') {
      loadCategory('');
      const route = navigator.getCurrentRoutes().find(route => route.name === 'Past');
      route ? navigator.popToRoute(route) : navigator.popToTop();
      return;
    }

    if (list) {
      loadCategory('');
      const listRoute = navigator.getCurrentRoutes().find(route => route.name === 'List');
      listRoute ? navigator.popToRoute(listRoute) : navigator.popToTop();
      return;
    }

    navigator.popToTop();
  }

  handleChangeLogin() {
    const { login, changeLoginState } = this.props;

    Keyboard.dismiss(0);

    changeLoginState(!login.login);
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'Answer':
        return <AnswerPage navigator={navigator} />;
      case 'Streak':
        return <StreakPage navigator={navigator} />;
      case 'Login':
        return <LoginPage navigator={navigator} />;
      case 'UserProfile':
        return <UserProfilePage navigator={navigator} />;
      case 'UserSettings':
        return <UserSettingsPage navigator={navigator} />;
      case 'AnswerSettings':
        return <AnswerSettingsPage navigator={navigator} />;
      case 'Past':
        return <PastPage navigator={navigator} />;
      case 'List':
        return <ListPage navigator={navigator} />;
      case 'NewPrompt':
        return <NewPromptPage navigator={navigator} />;
      case 'About':
        return <AboutPage navigator={navigator} />;
      case 'Stop':
        return <StopPage navigator={navigator} />;
      default:
        return <CategoriesPage navigator={navigator} />;
    }
  }

  configureScene(route, routeStack) {
    switch (route.name) {
      case 'UserProfile':
      case 'Past':
      case 'NewPrompt':
      case 'UserSettings':
      case 'Login':
      case 'AnswerSettings':
      case 'About':
        return Navigator.SceneConfigs.FloatFromBottom;
      default:
        return Navigator.SceneConfigs.PushFromRight;
    }
  }

  render() {
    const { user, category, list, answer, answerState, listTitle, login } = this.props;

    const switchButton = login.login ? 'Sign up' : 'Log in';

    return (
      <SafeAreaView style={styles.app}>
        <Navigator
          configureScene={this.configureScene}
          style={{ flex: 1 }}
          initialRoute={{ name: 'Categories' }}
          renderScene={this.renderScene}
          navigationBar={
            <Navigator.NavigationBar
              style={styles.nav}
              routeMapper={{
                LeftButton: (route, navigator, index, navState) => {
                  switch (route.name) {
                    case 'Categories':
                    case 'Streak':
                    case 'Stop':
                      return null;
                    case 'AnswerSettings':
                    case 'UserProfile':
                    case 'Past':
                    case 'NewPrompt':
                    case 'About':
                    case 'UserSettings':
                    case 'Login':
                      return (
                        <TouchableOpacity
                          style={styles.leftButton}
                          activeOpacity={0.7}
                          onPress={() => this.handleBack(navigator)}
                        >
                          <Octicons size={24} name="x" color="#333" />
                        </TouchableOpacity>
                      );
                    case 'Answer':
                      return (
                        <TouchableOpacity
                          style={styles.leftButton}
                          activeOpacity={0.7}
                          onPress={() => this.handleCategories(navigator)}
                        >
                          <Ionicons size={22} name="md-arrow-round-back" color="#333" />
                        </TouchableOpacity>
                      );
                    default:
                      return (
                        <TouchableOpacity
                          style={styles.leftButton}
                          activeOpacity={0.7}
                          onPress={() => this.handleBack(navigator)}
                        >
                          <Ionicons size={22} name="md-arrow-round-back" color="#333" />
                        </TouchableOpacity>
                      );
                  }
                },
                Title: (route, navigator, index, navState) => {
                  switch (route.name) {
                    case 'Answer':
                      return (
                        <Text style={styles.title}>
                          {list ? capitalizeFirstLetter(list) : category ? category : 'Everything'}
                        </Text>
                      );
                    case 'AnswerSettings':
                      return <Text style={styles.title}>{answer.categories.join(', ')}</Text>;
                    case 'Past':
                      return (
                        <TextInput
                          placeholderTextColor="#AAA"
                          selectionColor="#967ADC"
                          style={styles.searchBar}
                          onChangeText={this.changeSearchText}
                          placeholder="Search..."
                        />
                      );
                    case 'NewPrompt':
                      return <Text style={styles.title}>New Prompt</Text>;
                    case 'UserSettings':
                      return <Text style={styles.title}>Edit Profile</Text>;
                    case 'List':
                      return <Text style={styles.title}>{capitalizeFirstLetter(listTitle)}</Text>;
                    default:
                      return null;
                  }
                },
                RightButton: (route, navigator, index, navState) => {
                  switch (route.name) {
                    case 'NewPrompt':
                    case 'UserSettings':
                    case 'List':
                    case 'Past':
                    case 'About':
                    case 'AnswerSettings':
                      return null;
                    case 'Login':
                      return (
                        <TouchableOpacity
                          style={styles.rightTitleButton}
                          activeOpacity={0.7}
                          onPress={this.handleChangeLogin}
                        >
                          <Text style={styles.rightTitle}>{switchButton}</Text>
                        </TouchableOpacity>
                      );
                    case 'UserProfile':
                      return user.name ? (
                        <TouchableOpacity
                          style={styles.rightButton}
                          activeOpacity={0.7}
                          onPress={() => this.handleSettings(navigator)}
                        >
                          <Octicons size={22} name="gear" color="#333" />
                        </TouchableOpacity>
                      ) : null;
                    default:
                      return (
                        <TouchableOpacity
                          style={styles.rightButton}
                          activeOpacity={0.7}
                          onPress={() => this.handleProfile(navigator)}
                        >
                          <MaterialIcons name="person" size={22} color="#333" />
                        </TouchableOpacity>
                      );
                  }
                }
              }}
            />
          }
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: '#FFF'
  },
  nav: {
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  title: {
    fontSize: 17,
    alignSelf: 'center',
    color: '#333',
    fontWeight: '700'
  },
  leftButton: {
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 8,
    marginLeft: 8
  },
  rightButton: {
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 8,
    marginRight: 8
  },
  rightTitleButton: {
    backgroundColor: 'transparent'
  },
  rightTitle: {
    fontSize: 16,
    alignSelf: 'flex-end',
    color: '#474747',
    fontWeight: '700'
  },
  headerButtonText: {
    fontSize: 17,
    textAlign: 'center',
    color: '#333'
  },
  searchBar: {
    height: 44,
    lineHeight: 42,
    fontSize: 17,
    color: '#333',
    fontWeight: '700'
  }
});

App.propTypes = {
  user: PropTypes.object.isRequired,
  answers: PropTypes.array.isRequired,
  loadApprovedPrompts: PropTypes.func.isRequired,
  loadUserPrompts: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  loadUserAnswers: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  changeSearch: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ user, answers, answer, list, category, seen, listTitle, login }) => ({
  user,
  answers,
  answer,
  list,
  category,
  seen,
  listTitle,
  login
});

App = connect(mapStateToProps, {
  loadApprovedPrompts,
  loadUserPrompts,
  loadUser,
  loadUserAnswers,
  loadCategories,
  createUser,
  changeSearch,
  editUser,
  loadTodayPrompt,
  resetSeen,
  loadCategory,
  clearError
})(App);

export default App;
