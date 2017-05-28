import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text, Linking } from 'react-native'
import { connect } from 'react-redux'
import { formattedDate } from '../functions/dateFunctions'
import { loadListTitle } from '../actions/promptActions'
import { editUser } from '../actions/userActions'
import Page from '../containers/Page'
import SignupButton from '../components/SignupButton'
import Container from '../containers/Container'
import ScrollContainer from '../containers/ScrollContainer'
import CategoryButton from '../components/CategoryButton'

class UserProfilePage extends Component {
  constructor(props) {
    super(props)

    this.handlePast = this.handlePast.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
    this.handleLoadList = this.handleLoadList.bind(this)
    this.handleNewPrompt = this.handleNewPrompt.bind(this)
  }

  handlePast() {
    this.props.navigator.push({ name: 'Past' })
  }

  handleSignup() {
    this.props.navigator.push({ name: 'Login' })
  }

  handleNewPrompt() {
    this.props.navigator.push({ name: 'NewPrompt' })
  }

  handleLoadList(list) {
    const { loadListTitle, navigator } = this.props
    loadListTitle(list)
    navigator.push({ name: 'List' })
  }

  handleEmail() {
    Linking.openURL('mailto:parker@reflectwithmuse.com?subject=Hi Parker')
  }

  render() {
    const { user } = this.props

    return (
      <Page>
        <Container>
          <ScrollContainer>
            { !user.name && <CategoryButton handleClick={this.handleSignup} text='Signup / Login' /> }
            { user.name ? <Text style={styles.name}>{user.name}</Text> : null }
            <Text style={styles.date}>Score - {user.score}</Text>
            <Text style={styles.score}>Streak - {user.streak} <Text style={styles.long}>({user.longestStreak})</Text></Text>
            <CategoryButton key='answers' handleClick={this.handlePast} text='Your Answers' />
            <View style={styles.space}></View>
            <CategoryButton key='create' handleClick={this.handleNewPrompt} text='Create New Prompt' purple />
            <View style={styles.space}></View>
            <CategoryButton key='saved' handleClick={this.handleLoadList} category='saved' top text='Saved' />
            <CategoryButton key='favorites' handleClick={this.handleLoadList} category='favorites' text='Favorites' />
            <CategoryButton key='daily' handleClick={this.handleLoadList} category='daily' text='Daily' />
            <CategoryButton key='created' handleClick={this.handleLoadList} category='created' text='Created' />
            <View style={styles.space}></View>
            <View style={styles.contact}>
              <Text style={styles.mainContactText}>Questions / Feedback?</Text>
              <Text style={styles.contactText}>We love hearing from you</Text>
              <CategoryButton handleClick={this.handleEmail} text='Contact' purple />
            </View>
          </ScrollContainer>
        </Container>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  name: {
    color: '#333',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: '700',
  },
  date: {
    color: '#777',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '700',
  },
  long: {
    color: '#AAA',
    fontWeight: '600',
  },
  score: {
    color: '#777',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
    fontWeight: '700',
  },
  space: {
    marginTop: 20,
  },
  contact: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  mainContactText: {
    color: '#777',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: '600',
  },
  contactText: {
    color: '#777',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
})

UserProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
  loadListTitle: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
}

const mapStateToProps = ({ user }) => ({ user })

UserProfilePage = connect(
  mapStateToProps,
  { editUser, loadListTitle }
)(UserProfilePage)

export default UserProfilePage
