import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text, Linking, TouchableOpacity } from 'react-native'
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
    this.handleAbout = this.handleAbout.bind(this)
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

  handleAbout() {
    this.props.navigator.push({ name: 'Home' })
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
            <View style={styles.contact}>
              <TouchableOpacity style={styles.aboutButton} onPress={this.handleAbout} activeOpacity={.7}>
                <Text style={styles.aboutText}>About Us</Text>
              </TouchableOpacity>
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
    marginBottom: 0,
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
    marginTop: 2,
    marginBottom: 12,
    fontWeight: '700',
  },
  space: {
    marginTop: 6,
  },
  contact: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  aboutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginTop: 10,
    marginBottom: 0,
    marginLeft: 12,
    marginRight: 12,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 30,
    height: 54,
  },
  aboutText: {
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 12,
    color: '#777',
    textAlign: 'center',
    fontWeight: '700',
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
