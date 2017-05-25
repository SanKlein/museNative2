import React, { Component, PropTypes } from 'react'
import { Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { loadCategory } from '../actions/promptActions'
import { loadAnswer } from '../actions/answerActions'
import { changeSearch } from '../actions/searchActions'
import Page from '../containers/Page'
import Container from '../containers/Container'
import ScrollContainer from '../containers/ScrollContainer'
import Message from '../components/Message'
import ListComponent from '../components/ListComponent'
import TextContainer from '../containers/TextContainer'
import ComponentTitle from '../components/ComponentTitle'
import ComponentSubtext from '../components/ComponentSubtext'

class PastPage extends Component {
  constructor(props) {
    super(props)

    this.handleLoadAnswer = this.handleLoadAnswer.bind(this)
  }

  componentWillUnmount() {
    const { search, changeSearch } = this.props
    search && changeSearch('')
  }

  handleLoadAnswer(answer) {
    const { loadCategory, loadAnswer, navigator } = this.props

    Keyboard.dismiss(0)

    loadCategory(answer.categories[0])
    loadAnswer(answer)
    const route = navigator.getCurrentRoutes().find(route => route.name === 'Answer')
    route ? navigator.popToRoute(route) : navigator.push({ name: 'Answer' })
  }

  render() {
    const { user, answers, search } = this.props

    return (
      <Page>
        <Container>
          <ScrollContainer>
            { answers.length > 0 ? answers.reverse().map(answer => (
                <ListComponent key={answer._id} handleClick={() => this.handleLoadAnswer(answer)}>
                  <TextContainer>
                    <ComponentTitle title={answer.prompt_title} />
                    <ComponentSubtext text={answer.text} />
                  </TextContainer>
                </ListComponent>
              )) : search ? <Message message='No matching answers' /> : <Message message='No answers' />
            }
          </ScrollContainer>
        </Container>
      </Page>
    )
  }
}

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
  answers = answers.filter(a => a.text && (a.text.toLowerCase().indexOf(search) >= 0 || a.prompt_title.toLowerCase().indexOf(search) >= 0))

  return { user, answers, search }
 }

PastPage = connect(
  mapStateToProps,
  { loadAnswer, changeSearch, loadCategory }
)(PastPage)

export default PastPage
