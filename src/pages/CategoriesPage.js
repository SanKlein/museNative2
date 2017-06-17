import React, { Component, PropTypes } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createNewAnswer, loadAnswer } from '../actions/answerActions'
import { loadCategory, loadTodayPrompt } from '../actions/promptActions'
// import { addLife } from '../actions/userActions'
import Page from '../containers/Page'
import Container from '../containers/Container'
import ScrollContainer from '../containers/ScrollContainer'
import CategoryButton from '../components/CategoryButton'
import Answer from '../objects/Answer'
import { isToday } from '../functions/dateFunctions'

class CategoriesPage extends Component {
  constructor(props) {
    super(props)

    this.handleRandomCategory = this.handleRandomCategory.bind(this)
    this.handleRandom = this.handleRandom.bind(this)
    this.handleToday = this.handleToday.bind(this)
  }

  componentWillMount() {
    const { state, navigator } = this.props

    if (state === 'home') {
      navigator.push({ name: 'Home' })
    } else {
      this.props.loadTodayPrompt()
    }
  }

  handleRandomCategory(category) {
    let { user, prompts, answers, loadCategory, createNewAnswer, navigator, seen } = this.props

    let categoryPrompts = prompts.filter(p => p.categories.some(c => c === category))

    let unansweredPrompts = categoryPrompts.filter(p => !answers.some(a => a.prompt_id === p._id) && !seen.prompts.some(s => s === p._id))
    let roundPrompts = []
    if (unansweredPrompts.length < 10) {
      roundPrompts = categoryPrompts
    } else if (user.answered.length > 10) {
      roundPrompts = unansweredPrompts
    } else {
      roundPrompts = unansweredPrompts.filter(p => p.round === '1')
      if (roundPrompts.length < 5) {
        roundPrompts = unansweredPrompts
      }
    }

    const prompt = roundPrompts[Math.floor(Math.random() * roundPrompts.length)]
    createNewAnswer(new Answer(user._id, user.name, prompt._id, prompt.title, prompt.type, prompt.categories))
    loadCategory(category)
    navigator.push({ name: 'Answer' })
  }

  handleRandom() {
    let { user, prompts, answers, loadCategory, createNewAnswer, navigator, seen } = this.props

    let unansweredPrompts = prompts.filter(p => !answers.some(a => a.prompt_id === p._id) && !seen.prompts.some(s => s === p._id))
    let roundPrompts = []
    if (unansweredPrompts.length < 10) {
      roundPrompts = prompts
    } else if (user.answered.length > 10) {
      roundPrompts = unansweredPrompts
    } else {
      roundPrompts = unansweredPrompts.filter(p => p.round === '1')
      if (roundPrompts.length < 5) {
        roundPrompts = unansweredPrompts
      }
    }

    const prompt = roundPrompts[Math.floor(Math.random() * roundPrompts.length)]
    createNewAnswer(new Answer(user._id, user.name, prompt._id, prompt.title, prompt.type, prompt.categories))
    loadCategory('Everything')
    navigator.push({ name: 'Answer' })
  }

  handleToday() {
    const { user, answer, todayPrompt, answers, prompts, loadAnswer, loadCategory, createNewAnswer, navigator } = this.props

    loadCategory("Today's Prompt")

    if (answer.prompt_id === todayPrompt) {
      navigator.push({ name: 'Answer' })
      return
    }
    if (answers.length) {
      const answerFound = answers.find(a => a.prompt_id === todayPrompt && isToday(a.answered))
      if (answerFound) {
        loadAnswer(answerFound)
        navigator.push({ name: 'Answer' })
        return
      }
    }
    if (prompts.length) {
      const prompt = prompts.find(p => p._id === todayPrompt)
      if (prompt) {
        createNewAnswer(new Answer(user._id, user.name, prompt._id, prompt.title, prompt.type, prompt.categories))
        navigator.push({ name: 'Answer' })
        return
      }
    }
  }

  render() {
    const { user, categories } = this.props

    return (
      <Page>
        <Container>
          <Text style={styles.title}>What do you want to reflect on?</Text>
          <ScrollView style={styles.buttons}>
            <CategoryButton handleClick={this.handleToday} category={"Today's Prompt"} top text="Today's Prompt" purple />
            <CategoryButton handleClick={this.handleRandom} category='Everything' top text='Everything' />
            { categories.map(category => (<CategoryButton key={category} handleClick={this.handleRandomCategory} category={category} text={category} />)) }
          </ScrollView>
        </Container>
      </Page>
    )
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
    paddingBottom: 8,
  },
  buttons: {
    flex: 1,
    paddingTop: 0,
    marginBottom: 8,
    // justifyContent: 'space-between',
    // alignItems: 'space-between',
  },
})

CategoriesPage.propTypes = {
  user: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  prompts: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired,
  createNewAnswer: PropTypes.func.isRequired,
  loadCategory: PropTypes.func.isRequired,
}

const mapStateToProps = ({ user, answer, categories, prompts, myPrompts, answers, state, todayPrompt, seen }) => {
  prompts = prompts.slice()
  myPrompts.forEach(prompt => {
    if (!prompts.some(p => p._id === prompt._id)) {
      prompts.push(prompt)
    }
  })

  return { user, answer, categories, prompts, answers, state, todayPrompt, seen }
}

CategoriesPage = connect(
  mapStateToProps,
  { createNewAnswer, loadCategory, loadAnswer, loadTodayPrompt }
)(CategoriesPage)

export default CategoriesPage
