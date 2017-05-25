import React, { Component, PropTypes } from 'react'
import { AlertIOS } from 'react-native'
import { connect } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'
import { createNewAnswer, removeDailyPrompt, removeFavoritePrompt, removeSavePrompt } from '../actions/answerActions'
import { loadList } from '../actions/promptActions'
import Answer from '../objects/Answer'
import { isToday } from '../functions/dateFunctions'
import Page from '../containers/Page'
import Container from '../containers/Container'
import ScrollContainer from '../containers/ScrollContainer'
import ListComponent from '../components/ListComponent'
import ListTitle from '../components/ListTitle'
import ComponentButton from '../components/ComponentButton'
import Message from '../components/Message'
import Footer from '../containers/Footer'
import FooterButton from '../components/FooterButton'

class ListPage extends Component {
  constructor(props) {
    super(props)

    this.confirmRemove = this.confirmRemove.bind(this)
    this.handleRandom = this.handleRandom.bind(this)
    this.handleLoadPrompt = this.handleLoadPrompt.bind(this)
    this.handleRemovePrompt = this.handleRemovePrompt.bind(this)
  }

  componentWillMount() {
    const { listTitle, navigator } = this.props

    if (!listTitle) {
      navigator.pop(0)
    }
  }

  confirmRemove(prompt) {
    AlertIOS.alert(
     'Are you sure?',
     null,
     [
       { text: 'Cancel', onPress: () => null, style: 'cancel' },
       { text: 'Remove', onPress: () => this.handleRemovePrompt(prompt), style: 'destructive' },
     ],
    )
  }

  handleRandom() {
    let { user, listTitle, unansweredListPrompts, answeredListPrompts, createNewAnswer, navigator, loadList } = this.props
    if (unansweredListPrompts.length === 0) {
      unansweredListPrompts = answeredListPrompts
    }
    const prompt = unansweredListPrompts[Math.floor(Math.random() * unansweredListPrompts.length)]
    loadList(listTitle)
    createNewAnswer(new Answer(user._id, user.name, prompt._id, prompt.title, prompt.type, prompt.categories))
    const route = navigator.getCurrentRoutes().find(route => route.name === 'Answer')
    route ? navigator.popToRoute(route) : navigator.push({ name: 'Answer' })
  }

  handleLoadPrompt(prompt) {
    const { user, listTitle, createNewAnswer, navigator, loadList } = this.props
    loadList(listTitle)
    createNewAnswer(new Answer(user._id, user.name, prompt._id, prompt.title, prompt.type, prompt.categories))
    const route = navigator.getCurrentRoutes().find(route => route.name === 'Answer')
    route ? navigator.popToRoute(route) : navigator.push({ name: 'Answer' })
  }

  handleRemovePrompt(prompt) {
    const { user, listTitle, removeDailyPrompt, removeFavoritePrompt, removeSavePrompt } = this.props
    switch(listTitle) {
      case 'daily':
        return removeDailyPrompt(user._id, prompt._id)
      case 'favorites':
        return removeFavoritePrompt(user._id, prompt._id)
      case 'saved':
        return removeSavePrompt(user._id, prompt._id)
      default:
        console.log('sorry')
    }
  }

  render() {
    const { listTitle, answeredListPrompts, unansweredListPrompts } = this.props
    const allPrompts = answeredListPrompts.concat(unansweredListPrompts)

    return (
      <Page>
        <Container>
          <ScrollContainer>
            { (unansweredListPrompts.length + answeredListPrompts.length) === 0 ? <Message message={`You have no ${listTitle} prompts`} /> : null }
            { unansweredListPrompts.map(prompt => (
              <ListComponent key={prompt._id}>
                <ListTitle handleClick={() => this.handleLoadPrompt(prompt)} title={prompt.title} />
                { listTitle !== 'created' && <ComponentButton handleClick={() => this.confirmRemove(prompt)} remove right><Entypo size={22} name="minus" color="#F08080" /></ComponentButton> }
              </ListComponent>
            )) }
            { answeredListPrompts.map(prompt => (
              <ListComponent key={prompt._id}>
                <ListTitle handleClick={() => this.handleLoadPrompt(prompt)} answered title={prompt.title} />
                { listTitle !== 'created' && <ComponentButton handleClick={() => this.confirmRemove(prompt)} remove right><Entypo size={22} name="minus" color="#F08080" /></ComponentButton> }
              </ListComponent>
            )) }
          </ScrollContainer>
        </Container>
        { allPrompts.length > 0 && <Footer margin>
            <FooterButton handleClick={this.handleRandom} big text='Random' />
        </Footer> }
      </Page>
    )
  }
}

ListPage.propTypes = {
  user: PropTypes.object.isRequired,
  listTitle: PropTypes.string.isRequired,
  answeredListPrompts: PropTypes.array.isRequired,
  unansweredListPrompts: PropTypes.array.isRequired,
  createNewAnswer: PropTypes.func.isRequired,
  removeDailyPrompt: PropTypes.func.isRequired,
  removeFavoritePrompt: PropTypes.func.isRequired,
  removeSavePrompt: PropTypes.func.isRequired,
}

const mapStateToProps = ({ user, listTitle, prompts, myPrompts, answers }) => {
  let listIds = user[listTitle]
  prompts = prompts.slice()
  myPrompts.forEach(prompt => {
    if (!prompts.some(p => p._id === prompt._id)) {
      prompts.push(prompt)
    }
  })
  let listPrompts = prompts.filter(p => listIds.find(id => id === p._id))

  if (listTitle === 'daily') answers = answers.filter(a => isToday(a.answered))

  const answeredListPrompts = listPrompts.filter(p => answers.some(a => a.prompt_id === p._id))
  const unansweredListPrompts = listPrompts.filter(p => !answers.some(a => a.prompt_id === p._id))

  return { user, listTitle, answeredListPrompts, unansweredListPrompts }
}

ListPage = connect(
  mapStateToProps,
  { createNewAnswer, removeDailyPrompt, removeFavoritePrompt, removeSavePrompt, loadList }
)(ListPage)

export default ListPage
