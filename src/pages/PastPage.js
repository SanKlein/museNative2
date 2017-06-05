import React, { Component, PropTypes } from 'react'
import { Keyboard, StyleSheet, Text, AlertIOS, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { loadCategory } from '../actions/promptActions'
import { loadAnswer, deleteAnswer } from '../actions/answerActions'
import { changeSearch } from '../actions/searchActions'
import { formattedDate } from '../functions/dateFunctions'
import Page from '../containers/Page'
import Container from '../containers/Container'
import ScrollContainer from '../containers/ScrollContainer'
import Message from '../components/Message'
import ListComponent from '../components/ListComponent'
import TextContainer from '../containers/TextContainer'
import ComponentTitle from '../components/ComponentTitle'
import ComponentSubtext from '../components/ComponentSubtext'
import ComponentButton from '../components/ComponentButton'

class PastPage extends Component {
  constructor(props) {
    super(props)

    this.handleLoadAnswer = this.handleLoadAnswer.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
    this.deleteAnswer = this.deleteAnswer.bind(this)
  }

  componentWillUnmount() {
    const { search, changeSearch } = this.props
    search && changeSearch('')
  }

  handleLoadAnswer(answer) {
    const { loadCategory, loadAnswer, navigator } = this.props

    Keyboard.dismiss(0)

    loadCategory('Answers')
    loadAnswer(answer)
    navigator.push({ name: 'Answer' })
    // const route = navigator.getCurrentRoutes().find(route => route.name === 'Answer')
    // route ? navigator.popToRoute(route) : navigator.push({ name: 'Answer' })
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
    const { deleteAnswer, navigator } = this.props
    deleteAnswer(a._id)
  }

  render() {
    const { user, answers, search } = this.props

    return (
      <Page>
        <Container>
          <ScrollContainer>
            { answers.length > 0 ? answers.map(answer => (
                <View style={styles.item} key={answer._id}>
                  <TextContainer handleClick={() => this.handleLoadAnswer(answer)}>
                    <Text style={styles.pastAnswered}>{formattedDate(answer.answered)}</Text>
                    <ComponentTitle title={answer.prompt_title} />
                    <ComponentSubtext text={answer.text} />
                  </TextContainer>
                  <ComponentButton handleClick={(e) => this.confirmDelete(e, answer)} remove right><Ionicons size={20} name="md-trash" color="#F08080" /></ComponentButton>
                </View>
              )) : search ? <Message message='No matching answers' /> : <Message message='No answers' />
            }
          </ScrollContainer>
        </Container>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 2,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 3,
    flexShrink: 0,
  },
  pastAnswered: {
    fontSize: 11,
    color: '#AAA',
    fontWeight: '600',
    paddingBottom: 4,
  },
})

PastPage.propTypes = {
  user: PropTypes.object.isRequired,
  answers: PropTypes.array,
  search: PropTypes.string.isRequired,
  loadAnswer: PropTypes.func.isRequired,
  changeSearch: PropTypes.func.isRequired,
  loadCategory: PropTypes.func.isRequired,
}

const mapStateToProps = ({ user, answers, search }) => {
  search = search.toLowerCase()
  answers = answers.filter(a => a.text && (a.text.toLowerCase().indexOf(search) >= 0 || a.prompt_title.toLowerCase().indexOf(search) >= 0)).reverse()

  return { user, answers, search }
 }

PastPage = connect(
  mapStateToProps,
  { loadAnswer, changeSearch, loadCategory, deleteAnswer }
)(PastPage)

export default PastPage
