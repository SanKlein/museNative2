import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActionSheetIOS,
  Keyboard
} from 'react-native';
// import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
// import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import ObjectID from 'bson-objectid';
import {
  createNewAnswer,
  saveAnswer,
  loadAnswer,
  changeAnswerText,
  removeDailyPrompt,
  addDailyPrompt,
  removeFavoritePrompt,
  addFavoritePrompt,
  removeSavePrompt,
  addSavePrompt
} from '../actions/answerActions';
import { updateStreak, resetStreak } from '../actions/userActions';
import { loadCategory } from '../actions/promptActions';
import { isToday, isYesterday } from '../functions/dateFunctions';
import { capitalizeFirstLetter } from '../functions/stringFunctions';
import Answer from '../objects/Answer';
import Page from '../containers/Page';
import Container from '../containers/Container';
import Message from '../components/Message';
import PromptTitle from '../components/PromptTitle';
import Footer from '../containers/Footer';
import FooterButton from '../components/FooterButton';
import NavigationButton from '../components/NavigationButton';

class AnswerPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const category = navigation.getParam('category');
    const list = navigation.getParam('list');
    return {
      headerRight: (
        <NavigationButton navigate="UserSettings">
          <Octicons size={22} name="gear" color="#333" />
        </NavigationButton>
      ),
      title: list ? capitalizeFirstLetter(list) : category
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      answered: false,
      height: 0
    };

    this.loadRandom = this.loadRandom.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
    this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.handleNewAnswer = this.handleNewAnswer.bind(this);
    this.checkPrompt = this.checkPrompt.bind(this);
    this.handleSavePrompt = this.handleSavePrompt.bind(this);
    this.handleFavoritePrompt = this.handleFavoritePrompt.bind(this);
    this.handleDailyPrompt = this.handleDailyPrompt.bind(this);
    this.focusAnswer = this.focusAnswer.bind(this);
    this.showActionSheet = this.showActionSheet.bind(this);
    this.getHeight = this.getHeight.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({
      list: this.props.list,
      category: this.props.category || 'Everything'
    });
  }

  componentWillUnmount() {
    this.checkSave();
  }

  componentWillUpdate(nextProps, nextState) {
    if (!nextProps.answer.prompt_title) {
      this.loadRandom();
    }
  }

  checkSave() {
    let { answer, answerState } = this.props;
    if (answerState === 'changed' && answer.text) {
      this.saveAnswer();
    }
  }

  loadRandom() {
    let {
      user,
      answers,
      prompts,
      createNewAnswer,
      answer,
      category,
      list,
      loadCategory,
      navigation,
      seen
    } = this.props;

    Keyboard.dismiss(0);

    if (category === 'Everything' || category === "Today's Prompt") {
      category = '';
      loadCategory('');
    }

    let prompt = {};
    if (list) {
      let listIds = user[list];
      let listPrompts = prompts.filter(
        p => listIds.find(id => id === p._id) && answer.prompt_id !== p._id
      );

      if (list === 'daily') answers = answers.filter(a => isToday(a.answered));

      let unansweredListPrompts = listPrompts.filter(
        p => !answers.some(a => a.prompt_id === p._id) && !seen.prompts.some(s => s === p._id)
      );
      let roundPrompts = [];
      if (unansweredListPrompts.length === 0) {
        if (listPrompts.length === 0) {
          navigation.goBack();
          return;
        } else {
          roundPrompts = listPrompts;
        }
      } else {
        roundPrompts = unansweredListPrompts;
      }

      prompt = roundPrompts[Math.floor(Math.random() * roundPrompts.length)];
    } else if (category) {
      let categoryPrompts = prompts.filter(
        p => p.categories.some(c => c === category) && answer.prompt_id !== p._id
      ); //&& !user.hide.includes(prompt._id))

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

      prompt = roundPrompts[Math.floor(Math.random() * roundPrompts.length)];
    } else {
      let unansweredPrompts = prompts.filter(
        p =>
          !answers.some(a => a.prompt_id === p._id) &&
          answer.prompt_id !== p._id &&
          !seen.prompts.some(s => s === p._id)
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

      prompt = roundPrompts[Math.floor(Math.random() * roundPrompts.length)];
    }

    if (prompt) {
      createNewAnswer(
        new Answer(user._id, user.name, prompt._id, prompt.title, prompt.type, prompt.categories)
      );
    } else {
      navigation.goBack();
    }
  }

  saveAnswer() {
    let { answer, answers, saveAnswer, answerState, category } = this.props;

    Keyboard.dismiss(0);

    if (answerState === 'changed' || (category === 'Answers' && answerState === 'none')) {
      const newAnswerScore = Math.round(answer.text.split(' ').length / 3);
      let score = 0;

      const oldAnswerIndex = answers.findIndex(a => a._id === answer._id);
      if (oldAnswerIndex === -1) {
        score = newAnswerScore;
      } else {
        score = newAnswerScore - Math.round(answers[oldAnswerIndex].text.split(' ').length / 3);
      }
      answer.score = score;

      saveAnswer(answer);
    }
  }

  handleSettings() {
    this.checkSave();
    this.props.navigation.navigate('AnswerSettings');
  }

  handleClick(e) {
    e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
  }

  focusAnswer() {
    if (!this.refs.Answer.isFocused()) {
      this.refs.Answer.focus();
    } else {
      Keyboard.dismiss(0);
    }
  }

  handleChangeAnswer(text) {
    this.props.changeAnswerText(capitalizeFirstLetter(text));
    this.setState({ answered: true });
  }

  handleNext() {
    let {
      user,
      updateStreak,
      resetStreak,
      category,
      navigation,
      answers,
      answer,
      loadAnswer
    } = this.props;

    Keyboard.dismiss(0);

    if (category === 'Answers') {
      let answerIndex = answers.findIndex(a => a._id === answer._id);
      if (answerIndex <= 0) {
        navigation.goBack();
      } else {
        var a = answers[answerIndex - 1];
        loadAnswer(a);
      }
      return;
    }

    if (!this.state.answered) {
      this.loadRandom();
      return;
    }

    if (!user.last) {
      let newDate = new Date();
      newDate.setDate(newDate.getDate() - 1);
      user.last = newDate;
      user.streak = 0;
    }

    const todayAnswers = answers.filter(a => isToday(a.answered));
    if (todayAnswers.length === 5) {
      navigation.navigate('Stop');
      return;
    }

    if (isToday(user.last)) {
      this.loadRandom();
      return;
    } else if (isYesterday(user.last)) {
      updateStreak(user);
    } else {
      resetStreak(user._id);
    }
    navigation.navigate('Streak');
  }

  handleDone() {
    let { user, updateStreak, resetStreak, category, navigation } = this.props;

    Keyboard.dismiss(0);

    if (!this.state.answered) {
      navigation.goBack();
      return;
    }

    if (!user.last) {
      let newDate = new Date();
      newDate.setDate(newDate.getDate() - 1);
      user.last = newDate;
      user.streak = 0;
    }

    if (isToday(user.last)) {
      navigation.goBack();
      return;
    } else if (isYesterday(user.last)) {
      updateStreak(user);
    } else {
      resetStreak(user._id);
    }
    navigation.navigate('Streak');
  }

  handleNewAnswer() {
    const { user, answer, createNewAnswer, category, loadCategory } = this.props;

    if (category === 'Answers') {
      loadCategory(answer.categories[0]);
    }

    createNewAnswer(
      new Answer(
        user._id,
        user.name,
        answer.prompt_id,
        answer.prompt_title,
        answer.type,
        answer.categories
      )
    );
  }

  showActionSheet(e) {
    e ? (e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true)) : null;

    Keyboard.dismiss(0);

    const { answers, answer } = this.props;

    let buttons = [];

    const filteredAnswers = answers.filter(a => a.prompt_id === answer.prompt_id);

    answer.text && buttons.push('New Answer');
    filteredAnswers.length > 0 && buttons.push('Show Prompt Answers');

    const saveLabel = this.checkPrompt('saved')
      ? 'Remove Prompt from Saved List'
      : 'Add Prompt to Saved List';
    const favoriteLabel = this.checkPrompt('favorites')
      ? 'Remove Prompt from Favorites List'
      : 'Add Prompt to Favorites List';
    const dailyLabel = this.checkPrompt('daily')
      ? 'Remove Prompt from Daily List'
      : 'Add Prompt to Daily List';

    const lists = [saveLabel, favoriteLabel, dailyLabel];
    buttons.push(...lists);

    buttons.push('Cancel');

    const CANCEL_INDEX = buttons.length - 1;

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: buttons,
        cancelButtonIndex: CANCEL_INDEX,
        tintColor: '#333'
      },
      buttonIndex => {
        switch (buttons[buttonIndex]) {
          case saveLabel:
            return this.handleSavePrompt();
          case favoriteLabel:
            return this.handleFavoritePrompt();
          case dailyLabel:
            return this.handleDailyPrompt();
          case 'Show Prompt Answers':
            return this.handleSettings();
          case 'New Answer':
            return this.handleNewAnswer();
          default:
            null;
        }
      }
    );
  }

  checkPrompt(list) {
    const { user, answer } = this.props;
    return user[list].includes(answer.prompt_id);
  }

  handleSavePrompt() {
    const { answer, removeSavePrompt, addSavePrompt, user, prompt } = this.props;
    if (this.checkPrompt('saved')) {
      removeSavePrompt(user._id, answer.prompt_id);
    } else {
      addSavePrompt(user._id, answer.prompt_id);
    }
  }

  handleFavoritePrompt() {
    const { answer, removeFavoritePrompt, addFavoritePrompt, user } = this.props;
    if (this.checkPrompt('favorites')) {
      removeFavoritePrompt(user._id, answer.prompt_id);
    } else {
      addFavoritePrompt(user._id, answer.prompt_id);
    }
  }

  handleDailyPrompt() {
    const { answer, removeDailyPrompt, addDailyPrompt, user } = this.props;
    if (this.checkPrompt('daily')) {
      removeDailyPrompt(user._id, answer.prompt_id);
    } else {
      addDailyPrompt(user._id, answer.prompt_id);
    }
  }

  getHeight(layout) {
    this.setState({ height: layout.height });
  }

  hideKeyboard() {
    Keyboard.dismiss(0);
  }

  render() {
    const { user, answer, answerState, category, list } = this.props;

    return (
      <Page>
        <Container>
          <TouchableOpacity
            style={styles.promptAnswer}
            onPress={this.focusAnswer}
            activeOpacity={1}
          >
            <TouchableOpacity
              style={styles.promptTitle}
              onPress={e => this.showActionSheet(e)}
              activeOpacity={0.7}
            >
              <PromptTitle title={answer.prompt_title} />
              <View style={styles.answerButton}>
                <Ionicons size={22} name="md-more" color="#333" />
              </View>
            </TouchableOpacity>
            <View
              style={styles.answerContainer}
              onLayout={event => {
                this.getHeight(event.nativeEvent.layout);
              }}
            >
              <TextInput
                placeholderTextColor="#AAA"
                selectionColor="#967ADC"
                style={{ ...styles.answer, height: this.state.height }}
                ref="Answer"
                value={answer.text}
                onChangeText={this.handleChangeAnswer}
                placeholder="Type here..."
                autoCapitalize="sentences"
                multiline={true}
                onContentSizeChange={e => this.getHeight(e.nativeEvent.contentSize)}
              />
            </View>
          </TouchableOpacity>
        </Container>
        <Footer>
          {!answer.text &&
          category === 'Answers' &&
          answerState === 'none' &&
          this.state.answered ? (
            <FooterButton handleClick={this.saveAnswer} big text="Save" id="save" green />
          ) : !answer.text ? (
            <FooterButton handleClick={this.hideKeyboard} big text="Save" id="save" />
          ) : answerState === 'changed' ? (
            <FooterButton handleClick={this.saveAnswer} big green text="Save" id="save" />
          ) : (
            <FooterButton green text="Saved" id="save" handleClick={this.hideKeyboard} />
          )}
          {!answer.text &&
          category === 'Answers' &&
          answerState === 'none' &&
          this.state.answered ? (
            <FooterButton hide text="" />
          ) : category === "Today's Prompt" && !answer.text ? (
            <FooterButton handleClick={this.handleBack} text="Done" />
          ) : !answer.text && list ? (
            <FooterButton handleClick={this.loadRandom} text="Next" />
          ) : !answer.text && category === 'Answers' ? (
            <FooterButton handleClick={this.handleNext} text="Next" />
          ) : !answer.text ? (
            <FooterButton handleClick={this.loadRandom} text="Skip" />
          ) : !this.state.changed && category === "Today's Prompt" && answerState !== 'changed' ? (
            <FooterButton handleClick={this.handleDone} big green text="Done" />
          ) : answerState !== 'changed' ? (
            <FooterButton handleClick={this.handleNext} big green text="Next" />
          ) : (
            <FooterButton hide text="" />
          )}
        </Footer>
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  promptAnswer: {
    flex: 1
  },
  promptTitle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    marginTop: 2,
    marginBottom: 5,
    flexDirection: 'row'
  },
  answerButton: {
    flexShrink: 0,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  answerContainer: {
    flex: 1
  },
  answer: {
    fontSize: 16,
    color: '#333',
    marginTop: 0,
    paddingLeft: 12,
    paddingRight: 12,
    fontWeight: '600',
    flex: 1
  }
});

AnswerPage.propTypes = {
  user: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
  answers: PropTypes.array.isRequired,
  prompts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  category: PropTypes.string,
  list: PropTypes.string,
  createNewAnswer: PropTypes.func.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  loadAnswer: PropTypes.func.isRequired,
  changeAnswerText: PropTypes.func.isRequired,
  updateStreak: PropTypes.func.isRequired,
  resetStreak: PropTypes.func.isRequired,
  loadCategory: PropTypes.func.isRequired,
  removeDailyPrompt: PropTypes.func.isRequired,
  addDailyPrompt: PropTypes.func.isRequired,
  removeFavoritePrompt: PropTypes.func.isRequired,
  addFavoritePrompt: PropTypes.func.isRequired,
  removeSavePrompt: PropTypes.func.isRequired,
  addSavePrompt: PropTypes.func.isRequired
};

const mapStateToProps = ({
  user,
  answer,
  answers,
  prompts,
  myPrompts,
  loading,
  category,
  list,
  answerState,
  seen
}) => {
  prompts = prompts.slice();
  myPrompts.forEach(prompt => {
    if (!prompts.some(p => p._id === prompt._id)) {
      prompts.push(prompt);
    }
  });

  return { user, answer, answers, prompts, loading, category, list, answerState, seen };
};

AnswerPage = connect(mapStateToProps, {
  createNewAnswer,
  saveAnswer,
  loadAnswer,
  changeAnswerText,
  updateStreak,
  resetStreak,
  loadCategory,
  removeDailyPrompt,
  addDailyPrompt,
  removeFavoritePrompt,
  addFavoritePrompt,
  removeSavePrompt,
  addSavePrompt
})(AnswerPage);

export default AnswerPage;
