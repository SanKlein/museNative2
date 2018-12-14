import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Keyboard, StyleSheet, Text, AlertIOS, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { loadCategory } from '../actions/promptActions';
import { likeAnswer, loadAnswer, unlikeAnswer } from '../actions/answerActions';
import { formattedDate } from '../functions/dateFunctions';
import Page from '../containers/Page';
import Container from '../containers/Container';
import ScrollContainer from '../containers/ScrollContainer';
import Message from '../components/Message';
import ItemComponent from '../components/ItemComponent';
import TextContainer from '../containers/TextContainer';
import ComponentTitle from '../components/ComponentTitle';
import ComponentText from '../components/ComponentText';
import ComponentButton from '../components/ComponentButton';

class WorldPage extends Component {
  static navigationOptions = {
    headerRight: null,
    title: 'World'
  };

  constructor(props) {
    super(props);

    this.handleLoadAnswer = this.handleLoadAnswer.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  handleLoadAnswer(answer) {
    const { loadCategory, loadAnswer, navigation } = this.props;
    loadCategory('Answers');
    loadAnswer(answer);
    navigation.navigate('Answer');
  }

  handleLike(answer) {
    const { user: { _id }, likeAnswer, unlikeAnswer } = this.props;

    if (answer.user_id === _id) return; // can't like or unlike your answer

    answer.likers.includes(_id) ? unlikeAnswer(answer._id, _id) : likeAnswer(answer._id, _id);
  }

  render() {
    const { user, sharedAnswers } = this.props;

    return (
      <Page>
        <Container>
          <ScrollContainer>
            {sharedAnswers.length > 0 ? (
              sharedAnswers.map(answer => (
                <View key={answer._id} style={styles.item}>
                  <TextContainer
                    handleClick={() => user._id === answer.user_id && this.handleLoadAnswer(answer)}
                  >
                    <Text style={styles.pastAnswered}>
                      {answer.anonymous
                        ? 'Anonymous '
                        : answer.user_name ? `${answer.user_name} ` : 'Anonymous '}
                      <Text style={styles.date}> {moment(answer.sharedOn).fromNow()}</Text>
                    </Text>
                    <ComponentTitle title={answer.prompt_title} />
                    <Text style={styles.answer}>{answer.text}</Text>
                  </TextContainer>
                  <TouchableOpacity
                    style={styles.removeButton}
                    activeOpacity={0.7}
                    onPress={() => this.handleLike(answer)}
                  >
                    <FontAwesome
                      size={20}
                      name={answer.likers.includes(user._id) ? 'heart' : 'heart-o'}
                      color="#F08080"
                    />
                    <Text style={styles.likes}>{answer.likes}</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Message message="No shared answers" />
            )}
          </ScrollContainer>
        </Container>
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  pastAnswered: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
    paddingBottom: 4
  },
  answer: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600'
  },
  removeButton: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingTop: 12,
    display: 'flex',
    alignItems: 'center'
  },
  likes: {
    color: '#F08080',
    fontSize: 10,
    paddingTop: 2
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 8,
    paddingLeft: 12,
    paddingBottom: 8,
    flexShrink: 0
  },
  date: {
    fontSize: 8,
    color: '#AAA',
    fontWeight: '600',
    marginLeft: 4
  }
});

WorldPage.propTypes = {
  likeAnswer: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  loadAnswer: PropTypes.func.isRequired,
  loadCategory: PropTypes.func.isRequired,
  sharedAnswers: PropTypes.array,
  unlikeAnswer: PropTypes.func.isRequired
};

const mapStateToProps = ({ user, sharedAnswers }) => {
  return { user, sharedAnswers };
};

WorldPage = connect(mapStateToProps, { likeAnswer, loadAnswer, loadCategory, unlikeAnswer })(
  WorldPage
);

export default WorldPage;
