import React, { PropTypes } from 'react'
import { StyleSheet, TouchableHighlight, Text } from 'react-native'

const SignupButton = ({ children, handleClick }) => (
  <TouchableHighlight style={styles.signupButton} onPress={handleClick} underlayColor='#ffb280'>
    <Text style={styles.signupButtonText}>{name}</Text>
  </TouchableHighlight>
)

SignupButton.propTypes = {
  handleClick: PropTypes.func,
}

const styles = StyleSheet.create({
  signupButton: {
    backgroundColor: '#F0F0F0',
    color: '#474747',
    fontSize: 20,
    padding: 8,
    borderRadius: 50,
    marginTop: 10,
  },
})

export default SignupButton
