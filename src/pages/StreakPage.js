import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import ObjectID from 'bson-objectid'
import { createNewAnswer, loadAnswer } from '../actions/answerActions'
import { loadCategory } from '../actions/promptActions'
import { isToday } from '../functions/dateFunctions'
import Answer from '../objects/Answer'
import Page from '../containers/Page'
import Container from '../containers/Container'
import SignupButton from '../components/SignupButton'
import Footer from '../containers/Footer'
import FooterButton from '../components/FooterButton'

const messages = ['Good job!', 'Congratulations!', "Let's go!", 'Aye!', 'Here we go!', "You're doing it!"]

class StreakPage extends Component {
  constructor(props) {
    super(props)

    this.handleNext = this.handleNext.bind(this)
    this.handleMain = this.handleMain.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { navigator } = this.props
    if (!isToday(nextProps.user.last)) {
      navigator.popToRoute(navigator.getCurrentRoutes()[0])
    }
  }

  handleSignup() {
    this.props.navigator.push({ name: 'Login'})
  }

  handleMain() {
    const { navigator } = this.props
    navigator.popToRoute(navigator.getCurrentRoutes()[0])
  }

  handleNext() {
    let { user, answers, prompts, createNewAnswer, answer, category, list, loadCategory, navigator } = this.props

    if (category === 'Everything') {
      category = ''
    }

    let prompt = {}
    if (list) {
      let listIds = user[list]
      let listPrompts = prompts.filter(p => listIds.find(id => id === p._id) && answer.prompt_id !== p._id)

      if (list === 'daily') answers = answers.filter(a => isToday(a.answered))

      let unansweredListPrompts = listPrompts.filter(p => !answers.some(a => a.prompt_id === p._id))
      let roundPrompts = []
      if (unansweredListPrompts.length === 0) {
        if (listPrompts.length === 0) {
          navigator.popToRoute(navigator.getCurrentRoutes().find(route => route.name === 'List'))
          return
        } else {
          roundPrompts = listPrompts
        }
      } else {
        roundPrompts = unansweredListPrompts
      }

      prompt = roundPrompts[Math.floor(Math.random() * roundPrompts.length)]
    } else if (category) {
      let categoryPrompts = prompts.filter(p => p.categories.some(c => c === category) && answer.prompt_id !== p._id) //&& !user.hide.includes(prompt._id))

      let unansweredPrompts = categoryPrompts.filter(p => !answers.some(a => a.prompt_id === p._id))
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

      prompt = roundPrompts[Math.floor(Math.random() * roundPrompts.length)]
    } else {
      let unansweredPrompts = prompts.filter(p => !answers.some(a => a.prompt_id === p._id) && answer.prompt_id !== p._id)
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

      prompt = roundPrompts[Math.floor(Math.random() * roundPrompts.length)]
    }

    if (prompt) {
      createNewAnswer(new Answer(user._id, user.name, prompt._id, prompt.title, prompt.type, prompt.categories))
      navigator.popToRoute(navigator.getCurrentRoutes().find(route => route.name === 'Answer'))
    } else {
      navigator.popToRoute(navigator.getCurrentRoutes().find(route => route.name === 'Categories'))
    }
  }

  render() {
    const { user, category, list } = this.props

    const message = messages[Math.floor(Math.random() * messages.length)]

    return (
      <Page>
        <Container>
          { !user.name ? <Footer><FooterButton handleClick={this.handleSignup} big text='Signup' /></Footer> : null }
          <View style={styles.message}>
            <Text style={styles.congrats}>{message}</Text>
            <Text style={styles.text}>{"You've reflected"}</Text>
            <Text style={styles.number}>{user.streak}</Text>
            <Text style={styles.text}>{user.streak === 1 ? ' day' : ' days'} {"in a row :)"}</Text>
          </View>
        </Container>
        { category !== "Today's Prompt" &&
          <Footer top>
            <FooterButton handleClick={this.handleMain} big top text='Change Topic' />
          </Footer>
        }
        <Footer>
          { category === "Today's Prompt" ? <FooterButton handleClick={this.handleMain} big purple text='Done' /> : <FooterButton handleClick={this.handleNext} big purple text={`Next - ${category ? category : list ? list : 'Everything'}`} /> }
        </Footer>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  message: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    paddingBottom: 10,
  },
  congrats: {
    color: '#333',
    fontSize: 28,
    marginBottom: 15,
    fontWeight: '700',
  },
  text: {
    color: '#777',
    fontSize: 20,
    fontWeight: '600',
  },
  number: {
    color: '#333',
    fontSize: 84,
    fontWeight: '700',
  },
})

StreakPage.propTypes = {
  user: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
  answers: PropTypes.array.isRequired,
  prompts: PropTypes.array.isRequired,
  category: PropTypes.string,
  list: PropTypes.string,
  createNewAnswer: PropTypes.func.isRequired,
  loadAnswer: PropTypes.func.isRequired,
  loadCategory: PropTypes.func.isRequired,
}

const mapStateToProps = ({ user, answer, answers, prompt, prompts, myPrompts, category, list }) => {
  prompts = prompts.slice()
  myPrompts.forEach(prompt => {
    if (!prompts.some(p => p._id === prompt._id)) {
      prompts.push(prompt)
    }
  })

  return { user, answer, answers, prompts, category, list }
}

StreakPage = connect(
  mapStateToProps,
  { createNewAnswer, loadAnswer, loadCategory }
)(StreakPage)

export default StreakPage
