import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, AlertIOS } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { deleteAnswer, createNewAnswer, loadAnswer } from '../actions/answerActions'
import Answer from '../objects/Answer'
import Page from '../containers/Page'
import Container from '../containers/Container'
import PromptTitle from '../components/PromptTitle'
import ScrollContainer from '../containers/ScrollContainer'
import ListComponent from '../components/ListComponent'
import ComponentText from '../components/ComponentText'
import ComponentButton from '../components/ComponentButton'
import Message from '../components/Message'
import Footer from '../containers/Footer'
import FooterButton from '../components/FooterButton'

class AnswerSettingsPage extends Component {
  constructor(props) {
    super(props)

    this.confirmDelete = this.confirmDelete.bind(this)
    this.handleLoadAnswer = this.handleLoadAnswer.bind(this)
    this.deleteAnswer = this.deleteAnswer.bind(this)
    this.handleNewAnswer = this.handleNewAnswer.bind(this)
  }

  componentWillMount() {
    const { answer, navigator } = this.props
    if (!answer.prompt_id) {
      navigator.pop(0)
    }
  }

  handleLoadAnswer(e, answer) {
    const { loadAnswer, navigator } = this.props
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
    loadAnswer(answer)
    navigator.pop(0)
  }

  confirmDelete(e, a) {
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true

    AlertIOS.alert(
     'Are you sure?',
     null,
     [
       { text: 'Cancel', onPress: () => null, style: 'cancel' },
       { text: 'Delete', onPress: () => this.deleteAnswer(a), style: 'destructive' },
     ],
    )
  }

  deleteAnswer(a) {
    const { deleteAnswer, answer, navigator } = this.props
    deleteAnswer(a._id)
    if (a._id === answer._id) {
      navigator.pop(0)
    }
  }

  handleNewAnswer() {
    const { user, answer, createNewAnswer, navigator } = this.props
    createNewAnswer(new Answer(user._id, user.name, answer.prompt_id, answer.prompt_title, answer.type, answer.categories))
    navigator.pop(0)
  }

  render() {
    const { answer, filteredAnswers } = this.props

    return (
      <Page>
        <Container handleClick={this.handleBack}>
          <View style={styles.prompt}>
            <PromptTitle title={answer.prompt_title} />
          </View>
          <ScrollContainer>
            { filteredAnswers.length > 0 ? filteredAnswers.map(a => (
              <ListComponent key={a._id}>
                <ComponentText handleClick={(e) => this.handleLoadAnswer(e, a)} text={a.text} />
                <ComponentButton handleClick={(e) => this.confirmDelete(e, a)} remove right><FontAwesome size={20} name="trash-o" color="#F08080" /></ComponentButton>
              </ListComponent>
            )) : <Message message='No answers' /> }
          </ScrollContainer>
        </Container>
        <Footer>
          <FooterButton handleClick={this.handleNewAnswer} big purple text='New Answer' />
        </Footer>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  prompt: {
    marginTop: 2,
    paddingLeft: 12,
    paddingRight: 12,
    flexShrink: 0,
    flexDirection: 'row',
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    paddingTop: 10,
    flexShrink: 0,
  },
})

AnswerSettingsPage.propTypes = {
  user: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
  filteredAnswers: PropTypes.array.isRequired,
  deleteAnswer: PropTypes.func.isRequired,
  createNewAnswer: PropTypes.func.isRequired,
  loadAnswer: PropTypes.func.isRequired,
}

const mapStateToProps = ({ user, answer, answers }) => {
  const filteredAnswers = answers.filter(a => a.prompt_id === answer.prompt_id)

  return { user, answer, filteredAnswers }
 }

AnswerSettingsPage = connect(
  mapStateToProps,
  { deleteAnswer, createNewAnswer, loadAnswer }
)(AnswerSettingsPage)

export default AnswerSettingsPage
