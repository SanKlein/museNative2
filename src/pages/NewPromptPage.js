import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Keyboard } from 'react-native'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import { connect } from 'react-redux'
import { changeNewPromptTitle, pickNewPromptCategory, createNewPrompt, clearNewPrompt, loadCategory } from '../actions/promptActions'
import { createNewAnswer } from '../actions/answerActions'
import { setError } from '../actions/errorActions'
import { capitalizeFirstLetter } from '../functions/stringFunctions'
import Answer from '../objects/Answer'
import Prompt from '../objects/Prompt'
import Page from '../containers/Page'
import Container from '../containers/Container'
import Error from '../components/Error'
import ScrollContainer from '../containers/ScrollContainer'
import ListComponent from '../components/ListComponent'
import ComponentTitle from '../components/ComponentTitle'
import CategoryCheck from '../components/CategoryCheck'
import Footer from '../containers/Footer'
import FooterButton from '../components/FooterButton'

class NewPromptPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      height: 0,
    }

    this.handleChangeText = this.handleChangeText.bind(this)
    this.checkCategory = this.checkCategory.bind(this)
    this.toggleCategory = this.toggleCategory.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.loadAnswer = this.loadAnswer.bind(this)
    this.getHeight = this.getHeight.bind(this)
  }

  componentWillUnmount() {
    this.props.clearNewPrompt()
  }

  handleChangeText(text) {
    this.props.changeNewPromptTitle(capitalizeFirstLetter(text))
  }

  checkCategory(category) {
    return this.props.newPrompt.categories.includes(category)
  }

  toggleCategory(category) {
    Keyboard.dismiss(0)
    this.props.pickNewPromptCategory(category)
  }

  handleSave() {
    Keyboard.dismiss(0)
    const { user, newPrompt, createNewPrompt, createNewAnswer, setError, navigator, loadCategory } = this.props
    if (!newPrompt.title || newPrompt.categories.length === 0) {
      setError('Please fill all fields')
      return
    }
    const prompt = new Prompt(user._id, user.name, newPrompt.title, newPrompt.type, newPrompt.categories)
    loadCategory(newPrompt.categories[0])
    createNewPrompt(prompt)
    createNewAnswer(new Answer(user._id, user.name, prompt._id, prompt.title, prompt.type, prompt.categories))
    navigator.replace({ name: 'Answer' })
  }

  loadAnswer() {
    if (!this.refs.Answer.isFocused()) {
      this.refs.Answer.focus()
    } else {
      Keyboard.dismiss(0)
    }
  }

  getHeight(layout) {
    this.setState({ height: layout.height })
  }

  render() {
    const { newPrompt, categories, error } = this.props

    return (
      <Page>
        <Container>
          { error ? <Error>{error}</Error> : null }
          <TouchableOpacity style={styles.promptTitle} onPress={this.loadAnswer} activeOpacity={1}>
            <View style={styles.answer} onLayout={(event) => { this.getHeight(event.nativeEvent.layout) }}>
              <AutoGrowingTextInput placeholderTextColor='#AAA' selectionColor='#967ADC' style={styles.title} ref='Answer' value={newPrompt.title} onChangeText={this.handleChangeText} autoFocus={true} placeholder='Type prompt here...' maxHeight={this.state.height} />
            </View>
          </TouchableOpacity>
          <View style={styles.categories}>
            <View style={styles.bar}></View>
            <Text style={styles.categoriesTitle}>Categories</Text>
            { categories.map(category => (
              <ListComponent key={category} handleClick={() => this.toggleCategory(category)}>
                <ComponentTitle answered={!this.checkCategory(category)} small title={category} />
                <CategoryCheck picked={this.checkCategory(category)} />
              </ListComponent>
            ))}
          </View>
          <Footer margin>
            <FooterButton handleClick={this.handleSave} purple={newPrompt.title && newPrompt.categories.length !== 0} big text='Save' />
          </Footer>
        </Container>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  answer: {
    flex: 1,
  },
  promptTitle: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#333',
    marginTop: 8,
    paddingLeft: 12,
    paddingRight: 12,
    fontWeight: '700',
    paddingBottom: 8,
  },
  categories: {
    flex: 1.3,
    flexShrink: 0,
  },
  bar: {
    padding: 2,
    backgroundColor: '#F0F0F0',
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 20,
  },
  categoriesTitle: {
    color: '#777',
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 16,
    fontWeight: '700',
  },
})

NewPromptPage.propTypes = {
  user: PropTypes.object.isRequired,
  newPrompt: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  changeNewPromptTitle: PropTypes.func.isRequired,
  pickNewPromptCategory: PropTypes.func.isRequired,
  createNewPrompt: PropTypes.func.isRequired,
  createNewAnswer: PropTypes.func.isRequired,
  clearNewPrompt: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

const mapStateToProps = ({ user, newPrompt, categories, error }) => ({ user, newPrompt, categories, error })

NewPromptPage = connect(
  mapStateToProps,
  { changeNewPromptTitle, pickNewPromptCategory, createNewPrompt, createNewAnswer, clearNewPrompt, setError, loadCategory }
)(NewPromptPage)

export default NewPromptPage
