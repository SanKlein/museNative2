// src/App.js

import ObjectID from 'bson-objectid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';

import {
  loadApprovedPrompts,
  loadUserPrompts,
  loadTodayPrompt,
  loadCategory
} from './actions/promptActions';
import {
  loadUser,
  loadUserAnswers,
  loadCategories,
  createUser,
  editUser,
  resetSeen
} from './actions/userActions';
import { isToday } from './functions/dateFunctions';

import LoginPage from './pages/LoginPage';
import CategoriesPage from './pages/CategoriesPage';
import AnswerPage from './pages/AnswerPage';
import AnswerSettingsPage from './pages/AnswerSettingsPage';
import PastPage from './pages/PastPage';
import UserProfilePage from './pages/UserProfilePage';
import UserSettingsPage from './pages/UserSettingsPage';
import ListPage from './pages/ListPage';
import NewPromptPage from './pages/NewPromptPage';
import StreakPage from './pages/StreakPage';
import AboutPage from './pages/AboutPage';
import StopPage from './pages/StopPage';

const ViewNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesPage
    },
    Answer: {
      screen: AnswerPage
    },
    List: {
      screen: ListPage
    },
    Streak: {
      screen: StreakPage
    },
    Stop: {
      screen: StopPage
    }
  },
  {
    initialRouteName: 'Categories'
  }
);

const ModalNavigator = createStackNavigator({
  Login: {
    screen: LoginPage
  },
  AnswerSettings: {
    screen: AnswerSettingsPage
  },
  Past: {
    screen: PastPage
  },
  UserProfile: {
    screen: UserProfilePage
  },
  UserSettings: {
    screen: UserSettingsPage
  },
  NewPrompt: {
    screen: NewPromptPage
  },
  About: {
    screen: AboutPage
  }
});

const AppNavigator = createStackNavigator(
  {
    View: {
      screen: ViewNavigator
    },
    Modal: {
      screen: ModalNavigator
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  componentWillMount() {
    const {
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
      const newUser = {
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

  render() {
    return <AppContainer />;
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  loadApprovedPrompts: PropTypes.func.isRequired,
  loadUserPrompts: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  loadUserAnswers: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  loadTodayPrompt: PropTypes.func.isRequired,
  resetSeen: PropTypes.func.isRequired,
  seen: PropTypes.array.isRequired,
  loadCategory: PropTypes.func.isRequired
};

const mapStateToProps = ({ user, seen }) => ({
  user,
  seen
});

export default connect(mapStateToProps, {
  loadApprovedPrompts,
  loadUserPrompts,
  loadUser,
  loadUserAnswers,
  loadCategories,
  createUser,
  loadTodayPrompt,
  resetSeen,
  loadCategory
})(App);
