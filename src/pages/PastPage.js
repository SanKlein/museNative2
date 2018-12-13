import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Keyboard, StyleSheet, Text, AlertIOS, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { loadCategory } from '../actions/promptActions';
import { loadAnswer, deleteAnswer } from '../actions/answerActions';
import { changeSearch } from '../actions/searchActions';
import { formattedDate } from '../functions/dateFunctions';
import Page from '../containers/Page';
import Container from '../containers/Container';
import ScrollContainer from '../containers/ScrollContainer';
import Message from '../components/Message';
import ItemComponent from '../components/ItemComponent';
import TextContainer from '../containers/TextContainer';
import ComponentTitle from '../components/ComponentTitle';
import ComponentSubtext from '../components/ComponentSubtext';
import ComponentButton from '../components/ComponentButton';

class PastPage extends Component {
  constructor(props) {
    super(props);

    this.handleLoadAnswer = this.handleLoadAnswer.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
  }

  componentWillUnmount() {
    const { search, changeSearch } = this.props;
    search && changeSearch('');
  }

  handleLoadAnswer(answer) {
    const { loadCategory, loadAnswer, navigation } = this.props;

    Keyboard.dismiss(0);

    loadCategory('Answers');
    loadAnswer(answer);
    navigation.navigate('Answer');
  }

  confirmDelete(e, a) {
    e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);

    AlertIOS.alert('Are you sure?', null, [
      { text: 'Cancel', onPress: () => null, style: 'cancel' },
      { text: 'Delete', onPress: () => this.deleteAnswer(a), style: 'destructive' }
    ]);
  }

  deleteAnswer(a) {
    const { deleteAnswer, navigation } = this.props;
    deleteAnswer(a._id);
  }

  render() {
    const { user, answers, search } = this.props;

    return (
      <Page>
        <Container>
          <ScrollContainer>
            {answers.length > 0 ? (
              answers.map(answer => (
                <ItemComponent key={answer._id}>
                  <TextContainer handleClick={() => this.handleLoadAnswer(answer)}>
                    <Text style={styles.pastAnswered}>{formattedDate(answer.answered)}</Text>
                    <ComponentTitle title={answer.prompt_title} />
                    <ComponentSubtext text={answer.text} />
                  </TextContainer>
                  <TouchableOpacity
                    style={styles.removeButton}
                    activeOpacity={0.7}
                    onPress={e => this.confirmDelete(e, answer)}
                  >
                    <Ionicons size={20} name="md-trash" color="#F08080" />
                  </TouchableOpacity>
                </ItemComponent>
              ))
            ) : search ? (
              <Message message="No matching answers" />
            ) : (
              <Message message="No answers" />
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
    color: '#AAA',
    fontWeight: '600',
    paddingBottom: 4
  },
  removeButton: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingTop: 12,
    alignSelf: 'center',
    height: 46
  }
});

PastPage.propTypes = {
  user: PropTypes.object.isRequired,
  answers: PropTypes.array,
  search: PropTypes.string.isRequired,
  loadAnswer: PropTypes.func.isRequired,
  changeSearch: PropTypes.func.isRequired,
  loadCategory: PropTypes.func.isRequired
};

const mapStateToProps = ({ user, answers, search }) => {
  search = search.toLowerCase();
  answers = answers
    .filter(
      a =>
        a.text &&
        (a.text.toLowerCase().indexOf(search) >= 0 ||
          a.prompt_title.toLowerCase().indexOf(search) >= 0)
    )
    .reverse();

  return { user, answers, search };
};

PastPage = connect(mapStateToProps, { loadAnswer, changeSearch, loadCategory, deleteAnswer })(
  PastPage
);

export default PastPage;
