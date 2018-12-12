import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AlertIOS,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { logout, changeEditName, changeEditEmail, saveEditUser } from '../actions/userActions';
import { capitalizeFirstLetter, checkEmail } from '../functions/stringFunctions';
import { setError } from '../actions/errorActions';
import Page from '../containers/Page';
import Error from '../components/Error';
import Container from '../containers/Container';
import ScrollContainer from '../containers/ScrollContainer';

class UserSettingsPage extends Component {
  static navigationOptions = {
    headerRight: null
  };

  constructor(props) {
    super(props);

    this.state = {
      edit: 'no'
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.confirmLogout = this.confirmLogout.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { loading, user, editUser, navigation } = this.props;
    if (
      this.state.edit === 'changed' &&
      loading &&
      !nextProps.loading &&
      editUser.name === nextProps.user.name &&
      editUser.email === nextProps.user.email
    ) {
      this.setState({ edit: 'saved' });
      navigation.goBack(0);
    }
    if (
      this.state.edit === 'changed' &&
      loading &&
      !nextProps.loading &&
      nextProps.user.name !== nextProps.editUser.name &&
      nextProps.user.name !== nextProps.editUser.name
    ) {
      this.setState({ edit: 'no' });
    }
  }

  componentWillUnmount() {
    this.props.setError('');
  }

  handleChangeName(text) {
    this.props.changeEditName(capitalizeFirstLetter(text));
    this.setState({ edit: 'changed' });
  }

  handleChangeEmail(text) {
    this.props.changeEditEmail(capitalizeFirstLetter(text));
    this.setState({ edit: 'changed' });
  }

  handleSave() {
    let { user, editUser, saveEditUser, setError } = this.props;

    Keyboard.dismiss(0);

    if (user.name === editUser.name && user.email === editUser.email) {
      return;
    }

    if (!editUser.name || !editUser.email) {
      setError('Please enter your name and email');
      return;
    } else if (!editUser.name) {
      setError('Please enter your name');
      return;
    } else if (!checkEmail(editUser.email)) {
      setError('Please enter your valid email');
      return;
    }

    const saveUser = {
      _id: user._id,
      name: editUser.name,
      email: editUser.email
    };

    saveEditUser(saveUser);
  }

  handleLogout() {
    const { logout, navigation } = this.props;

    logout();
    navigation.popToTop('');
  }

  confirmLogout() {
    AlertIOS.alert('Are you sure?', null, [
      { text: 'Cancel', onPress: () => null, style: 'cancel' },
      { text: 'Log out', onPress: () => this.handleLogout(), style: 'destructive' }
    ]);
  }

  render() {
    const { user, editUser, error, loading } = this.props;
    const { edit } = this.state;

    let loginClasses = '';
    let loginTextClasses = '';
    if (
      editUser.name &&
      editUser.email &&
      (editUser.name !== user.name || editUser.email !== user.email) &&
      (edit === 'saved' || edit === 'changed')
    ) {
      loginClasses = [styles.loginButton, styles.purpleButton];
      loginTextClasses = [styles.loginButtonText, styles.purpleButtonText];
    } else {
      loginClasses = styles.loginButton;
      loginTextClasses = styles.loginButtonText;
    }

    return (
      <Page>
        <Container>
          {error ? <Error>{error}</Error> : null}
          <View style={styles.content}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              placeholderTextColor="#AAA"
              selectionColor="#967ADC"
              style={styles.name}
              value={editUser.name}
              onChangeText={this.handleChangeName}
              onSubmitEditing={() => this.refs.Email.focus()}
              placeholder="Name"
              returnKeyType="next"
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholderTextColor="#AAA"
              selectionColor="#967ADC"
              style={styles.email}
              ref="Email"
              keyboardType="email-address"
              value={editUser.email}
              onChangeText={this.handleChangeEmail}
              onSubmitEditing={this.handleSave}
              placeholder="Email"
              returnKeyType="done"
            />
            <TouchableOpacity style={loginClasses} onPress={this.handleSave} activeOpacity={0.7}>
              <Text style={loginTextClasses}>
                {loading && edit === 'changed'
                  ? 'Loading...'
                  : edit === 'no' ? 'Save' : edit === 'changed' ? 'Save' : 'Saved'}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={this.confirmLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </Container>
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingLeft: 20,
    paddingRight: 20
  },
  label: {
    marginTop: 10,
    marginBottom: 3,
    fontSize: 15,
    color: '#777',
    fontWeight: '700'
  },
  name: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
    height: 32,
    marginBottom: 5,
    fontWeight: '700'
  },
  email: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
    height: 32,
    marginBottom: 25,
    fontWeight: '700'
  },
  logoutButton: {
    marginLeft: 20,
    marginRight: 20,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#FFF'
  },
  logoutText: {
    color: '#F08080',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600'
  },
  loginButton: {
    backgroundColor: '#F0F0F0',
    height: 54,
    borderRadius: 30,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButtonText: {
    color: '#333',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '700'
  },
  purpleButton: {
    backgroundColor: '#967ADC'
  },
  purpleButtonText: {
    color: '#FFF'
  }
});

UserSettingsPage.propTypes = {
  user: PropTypes.object.isRequired,
  editUser: PropTypes.object.isRequired,
  error: PropTypes.string,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = ({ user, editUser, error, loading }) => ({
  user,
  editUser,
  error,
  loading
});

UserSettingsPage = connect(mapStateToProps, {
  logout,
  changeEditName,
  changeEditEmail,
  saveEditUser,
  setError
})(UserSettingsPage);

export default UserSettingsPage;
