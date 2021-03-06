import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Keyboard,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  PushNotificationIOS,
  View
} from 'react-native';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createNewAnswer, loadAnswer } from '../actions/answerActions';
import { loadCategory, loadTodayPrompt } from '../actions/promptActions';
// import { addLife } from '../actions/userActions'
import Page from '../containers/Page';
import Container from '../containers/Container';
import ScrollContainer from '../containers/ScrollContainer';
import FlexButton from '../components/FlexButton';
import NavigationButton from '../components/NavigationButton';
import Answer from '../objects/Answer';
import { isToday } from '../functions/dateFunctions';

const messages = [
  "Have you reflected on today's prompt? :)",
  'Want to reflect today? :)',
  'Beautiful day to reflect :)',
  "Have you seen today's prompt? :)",
  "How's your day going? :)",
  "Hope you're having a great day :)",
  'What a time to be alive :)'
];

class CategoriesPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <NavigationButton navigate="World">
          <FontAwesome size={22} name="globe" color="#333" />
        </NavigationButton>
      ),
      headerRight: (
        <NavigationButton navigate="UserProfile">
          <MaterialIcons name="person" size={24} color="#333" />
        </NavigationButton>
      )
    };
  };

  constructor(props) {
    super(props);

    this.handleProfile = this.handleProfile.bind(this);
    this.handleRandomCategory = this.handleRandomCategory.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
    this.handleToday = this.handleToday.bind(this);
    this.checkNotification = this.checkNotification.bind(this);
  }

  componentWillMount() {
    const { navigation, loadTodayPrompt } = this.props;

    loadTodayPrompt();

    this.checkNotification();
  }

  componentWillReceiveProps() {
    this.checkNotification();
  }

  checkNotification() {
    const { loadTodayPrompt } = this.props;

    // PushNotificationIOS.checkPermissions(function(permissions) {
    //   if (permissions.alert || permissions.badge || permissions.sound) {
    //     PushNotificationIOS.setApplicationIconBadgeNumber(0);
    //     PushNotificationIOS.cancelAllLocalNotifications(0);
    //
    //     var tomorrow = new Date();
    //     tomorrow.setDate(tomorrow.getDate() + 1);
    //     tomorrow.setHours(16, 3, 0, 0);
    //
    //     PushNotificationIOS.scheduleLocalNotification({
    //       fireDate: tomorrow.getTime(),
    //       alertBody: messages[Math.floor(Math.random() * messages.length)],
    //       applicationIconBadgeNumber: 1
    //     });
    //   } else {
    //     setTimeout(PushNotificationIOS.requestPermissions, 1500);
    //   }
    // });
  }

  handleProfile() {
    Keyboard.dismiss(0);

    const { navigation } = this.props;

    navigation.navigate('UserProfile');
  }

  handleRandomCategory(category) {
    let { user, prompts, answers, loadCategory, createNewAnswer, navigation, seen } = this.props;

    let categoryPrompts = prompts.filter(p => p.categories.some(c => c === category));

    let unansweredPrompts = categoryPrompts.filter(
      p => !answers.some(a => a.prompt_id === p._id) && !seen.prompts.some(s => s === p._id)
    );
    let roundPrompts = [];
    if (unansweredPrompts.length < 10) {
      roundPrompts = categoryPrompts;
    } else if (user.answered.length > 10) {
      roundPrompts = unansweredPrompts;
    } else {
      roundPrompts = unansweredPrompts.filter(p => p.round === '1');
      if (roundPrompts.length < 5) {
        roundPrompts = unansweredPrompts;
      }
    }

    const prompt = roundPrompts[Math.floor(Math.random() * roundPrompts.length)];
    createNewAnswer(
      new Answer(user._id, user.name, prompt._id, prompt.title, prompt.type, prompt.categories)
    );
    loadCategory(category);
    navigation.navigate('Answer');
  }

  handleRandom() {
    let { user, prompts, answers, loadCategory, createNewAnswer, navigation, seen } = this.props;

    let unansweredPrompts = prompts.filter(
      p => !answers.some(a => a.prompt_id === p._id) && !seen.prompts.some(s => s === p._id)
    );
    let roundPrompts = [];
    if (unansweredPrompts.length < 10) {
      roundPrompts = prompts;
    } else if (user.answered.length > 10) {
      roundPrompts = unansweredPrompts;
    } else {
      roundPrompts = unansweredPrompts.filter(p => p.round === '1');
      if (roundPrompts.length < 5) {
        roundPrompts = unansweredPrompts;
      }
    }

    const prompt = roundPrompts[Math.floor(Math.random() * roundPrompts.length)];
    createNewAnswer(
      new Answer(user._id, user.name, prompt._id, prompt.title, prompt.type, prompt.categories)
    );
    loadCategory('Everything');
    navigation.navigate('Answer');
  }

  handleToday() {
    const {
      user,
      answer,
      todayPrompt,
      answers,
      prompts,
      loadAnswer,
      loadCategory,
      createNewAnswer,
      navigation
    } = this.props;

    loadCategory("Today's Prompt");

    if (answer.prompt_id === todayPrompt) {
      navigation.navigate('Answer');
      return;
    }
    if (answers.length) {
      const answerFound = answers.find(a => a.prompt_id === todayPrompt && isToday(a.answered));
      if (answerFound) {
        loadAnswer(answerFound);
        navigation.navigate('Answer');
        return;
      }
    }
    if (prompts.length) {
      const prompt = prompts.find(p => p._id === todayPrompt);
      if (prompt) {
        createNewAnswer(
          new Answer(user._id, user.name, prompt._id, prompt.title, prompt.type, prompt.categories)
        );
        navigation.navigate('Answer');
        return;
      }
    }
  }

  render() {
    const { user, categories } = this.props;

    return (
      <Page>
        <Container>
          <Text style={styles.title}>What do you want to reflect on?</Text>
          <View style={styles.buttons}>
            <FlexButton
              key="Today's Prompt"
              handleClick={this.handleToday}
              category={"Today's Prompt"}
              top
              text="Today's Prompt"
              purple
            />
            <FlexButton
              key="Everything"
              handleClick={this.handleRandom}
              category="Everything"
              top
              text="Everything"
            />
            {categories.map(
              (category, i) =>
                category ? (
                  <FlexButton
                    key={`${category}${i}`}
                    handleClick={this.handleRandomCategory}
                    category={category}
                    text={category}
                  />
                ) : null
            )}
          </View>
        </Container>
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#333',
    zIndex: 2,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 6,
    paddingBottom: 8
  },
  buttons: {
    flex: 1,
    paddingTop: 0,
    marginBottom: 20
  },
  rightHeaderButton: {
    padding: 8,
    marginRight: 8
  }
});

CategoriesPage.propTypes = {
  user: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  prompts: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired,
  createNewAnswer: PropTypes.func.isRequired,
  loadCategory: PropTypes.func.isRequired
};

const mapStateToProps = ({
  user,
  answer,
  categories,
  prompts,
  myPrompts,
  answers,
  todayPrompt,
  seen,
  error
}) => {
  prompts = prompts.slice();
  myPrompts.forEach(prompt => {
    if (!prompts.some(p => p._id === prompt._id)) {
      prompts.push(prompt);
    }
  });

  return { user, answer, categories, prompts, answers, todayPrompt, seen, error };
};

CategoriesPage = connect(mapStateToProps, {
  createNewAnswer,
  loadCategory,
  loadAnswer,
  loadTodayPrompt
})(CategoriesPage);

export default CategoriesPage;
