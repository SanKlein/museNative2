import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { deleteAnswer, createNewAnswer, loadAnswer } from '../actions/answerActions'
import { loadCategory } from '../actions/promptActions'
import Answer from '../objects/Answer'
import Page from '../containers/Page'
import Container from '../containers/Container'
import PromptTitle from '../components/PromptTitle'
import ScrollContainer from '../containers/ScrollContainer'
import ItemComponent from '../components/ItemComponent'
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

    Alert.alert(
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
    const { user, answer, createNewAnswer, navigator, category, loadCategory, list } = this.props

    if (category === 'Answers' || list) {
      loadCategory(answer.categories[0])
    }

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
              <ItemComponent key={a._id}>
                <ComponentText handleClick={(e) => this.handleLoadAnswer(e, a)} text={a.text} />
                <TouchableOpacity style={styles.removeButton} activeOpacity={.7} onPress={(e) => this.confirmDelete(e, a)}><Ionicons size={20} name="md-trash" color="#F08080" /></TouchableOpacity>
              </ItemComponent>
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
    marginBottom: 3,
    paddingLeft: 12,
    paddingRight: 12,
    flexShrink: 0,
    flexDirection: 'row',
  },
  removeButton: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    alignSelf: 'center',
    height: 30,
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

const mapStateToProps = ({ user, answer, answers, category, list }) => {
  const filteredAnswers = answers.filter(a => a.prompt_id === answer.prompt_id)

  return { user, answer, filteredAnswers, category, list }
 }

AnswerSettingsPage = connect(
  mapStateToProps,
  { deleteAnswer, createNewAnswer, loadAnswer, loadCategory }
)(AnswerSettingsPage)

export default AnswerSettingsPage
