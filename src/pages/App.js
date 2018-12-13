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

    this.renderScene = this.renderScene.bind(this);
    this.changeSearchText = this.changeSearchText.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
    this.handleCategories = this.handleCategories.bind(this);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
  }

  changeSearchText(text) {
    this.props.changeSearch(text);
  }

  handleSettings(navigation) {
    Keyboard.dismiss(0);
    const { user, editUser } = this.props;
    editUser(user.name, (email: user.email));
    navigation.navigate('UserSettings');
  }

  handleCategories(navigation) {
    const { category, loadCategory, list } = this.props;

    Keyboard.dismiss(0);

    if (category === 'Answers') {
      loadCategory('');
      navigation.popToTop();
      return;
    }

    navigation.popToTop();
  }

  handleChangeLogin() {
    const { login, changeLoginState } = this.props;

    Keyboard.dismiss(0);

    changeLoginState(!login.login);
  }

  renderScene(route, navigation) {
    switch (route.name) {
      case 'Answer':
        return <AnswerPage navigation={navigation} />;
      case 'Streak':
        return <StreakPage navigation={navigation} />;
      case 'Login':
        return <LoginPage navigation={navigation} />;
      case 'UserProfile':
        return <UserProfilePage navigation={navigation} />;
      case 'UserSettings':
        return <UserSettingsPage navigation={navigation} />;
      case 'AnswerSettings':
        return <AnswerSettingsPage navigation={navigation} />;
      case 'Past':
        return <PastPage navigation={navigation} />;
      case 'List':
        return <ListPage navigation={navigation} />;
      case 'NewPrompt':
        return <NewPromptPage navigation={navigation} />;
      case 'About':
        return <AboutPage navigation={navigation} />;
      case 'Stop':
        return <StopPage navigation={navigation} />;
      default:
        return <CategoriesPage navigation={navigation} />;
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
          initialRoute={'Categories'}
          renderScene={this.renderScene}
          navigationBar={
            <Navigator.NavigationBar
              style={styles.nav}
              routeMapper={{
                LeftButton: (route, navigation, index, navState) => {
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
                          onPress={() => this.handleBack(navigation)}
                        >
                          <Octicons size={24} name="x" color="#333" />
                        </TouchableOpacity>
                      );
                    case 'Answer':
                      return (
                        <TouchableOpacity
                          style={styles.leftButton}
                          activeOpacity={0.7}
                          onPress={() => this.handleCategories(navigation)}
                        >
                          <Ionicons size={22} name="md-arrow-round-back" color="#333" />
                        </TouchableOpacity>
                      );
                    default:
                      return (
                        <TouchableOpacity
                          style={styles.leftButton}
                          activeOpacity={0.7}
                          onPress={() => this.handleBack(navigation)}
                        >
                          <Ionicons size={22} name="md-arrow-round-back" color="#333" />
                        </TouchableOpacity>
                      );
                  }
                },
                Title: (route, navigation, index, navState) => {
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
                RightButton: (route, navigation, index, navState) => {
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
                          onPress={() => this.handleSettings(navigation)}
                        >
                          <Octicons size={22} name="gear" color="#333" />
                        </TouchableOpacity>
                      ) : null;
                    default:
                      return (
                        <TouchableOpacity
                          style={styles.rightButton}
                          activeOpacity={0.7}
                          onPress={() => this.handleProfile(navigation)}
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
