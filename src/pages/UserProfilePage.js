import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Linking, TouchableOpacity } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import { connect } from 'react-redux';

import { formattedDate } from '../functions/dateFunctions';
import { loadListTitle } from '../actions/promptActions';
import { loadLogin } from '../actions/loginActions';
import { editUser } from '../actions/userActions';
import Page from '../containers/Page';
import SignupButton from '../components/SignupButton';
import Container from '../containers/Container';
import ScrollContainer from '../containers/ScrollContainer';
import FlexButton from '../components/FlexButton';
import NavigationButton from '../components/NavigationButton';

class UserProfilePage extends Component {
  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam('name');
    return {
      headerRight: name ? (
        <NavigationButton navigate="UserSettings">
          <Octicons size={22} name="gear" color="#333" />
        </NavigationButton>
      ) : null
    };
  };

  constructor(props) {
    super(props);

    this.handlePast = this.handlePast.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoadList = this.handleLoadList.bind(this);
    this.handleNewPrompt = this.handleNewPrompt.bind(this);
    this.handleAbout = this.handleAbout.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({
      name: this.props.user.name
    });
  }

  handlePast() {
    this.props.navigation.navigate('Past');
  }

  handleSignup() {
    this.props.navigation.navigate('Login');
  }

  handleLogin() {
    this.props.loadLogin();
    this.props.navigation.navigate('Login');
  }

  handleNewPrompt() {
    this.props.navigation.navigate('NewPrompt');
  }

  handleLoadList(list) {
    const { loadListTitle, navigation } = this.props;
    loadListTitle(list);
    navigation.navigate('List');
  }

  handleAbout() {
    this.props.navigation.navigate('About');
  }

  render() {
    const { user } = this.props;

    return (
      <Page>
        <Container>
          <View flexDirection="row">
            {!user.name && <FlexButton handleClick={this.handleSignup} text="Signup" />}
            {!user.name && <FlexButton purple handleClick={this.handleLogin} text="Login" />}
          </View>
          {user.name ? (
            <View style={styles.nameSection}>
              <Text style={styles.name}>{user.name}</Text>
            </View>
          ) : null}
          <View style={styles.scoreSection}>
            <Text style={styles.date}>Score - {user.score}</Text>
            <Text style={styles.score}>
              Streak - {user.streak} <Text style={styles.long}>({user.longestStreak})</Text>
            </Text>
          </View>
          <FlexButton key="answers" handleClick={this.handlePast} text="Your Answers" />
          <View style={styles.space} />
          <FlexButton
            key="create"
            handleClick={this.handleNewPrompt}
            text="Create New Prompt"
            purple
          />
          <View style={styles.space} />
          <FlexButton
            key="saved"
            handleClick={this.handleLoadList}
            category="saved"
            top
            text="Saved"
          />
          <FlexButton
            key="favorites"
            handleClick={this.handleLoadList}
            category="favorites"
            text="Favorites"
          />
          <FlexButton key="daily" handleClick={this.handleLoadList} category="daily" text="Daily" />
          <FlexButton
            key="created"
            handleClick={this.handleLoadList}
            category="created"
            text="Created"
          />
          <View style={styles.contact}>
            <TouchableOpacity
              style={styles.aboutButton}
              onPress={this.handleAbout}
              activeOpacity={0.7}
            >
              <Text style={styles.aboutText}>{"What's Müse and why should we use it?"}</Text>
            </TouchableOpacity>
          </View>
        </Container>
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  nameSection: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    color: '#333',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 0,
    fontWeight: '700'
  },
  date: {
    color: '#777',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700'
  },
  scoreSection: {
    flex: 1,
    justifyContent: 'center'
  },
  long: {
    color: '#AAA',
    fontWeight: '600'
  },
  score: {
    color: '#777',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 2,
    fontWeight: '700'
  },
  space: {
    marginTop: 6
  },
  contact: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  aboutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginLeft: 12,
    marginRight: 12,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 30,
    paddingBottom: 4
  },
  aboutText: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    fontWeight: '700'
  }
});

UserProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
  loadListTitle: PropTypes.func.isRequired,
  loadLogin: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => ({ user });

UserProfilePage = connect(mapStateToProps, { editUser, loadListTitle, loadLogin })(UserProfilePage);

export default UserProfilePage;
