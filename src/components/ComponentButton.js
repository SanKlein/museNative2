import React, { PropTypes } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

const ComponentButton = ({ children, remove, add, left, right, handleClick }) => {
  const touchStyle = left ? [styles.componentButton, styles.buttonLeft] : right ? [styles.componentButton, styles.buttonRight] : styles.componentButton

  return (<TouchableOpacity style={touchStyle} onPress={handleClick} activeOpacity={.7}>{children}</TouchableOpacity>)
}

const styles = StyleSheet.create({
  componentButton: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    alignSelf: 'center',
  },
  buttonLeft: {
    paddingLeft: 0,
  },
  buttonRight: {
    paddingRight: 0,
  },
})

ComponentButton.propTypes = {
  handleClick: PropTypes.func,
  remove: PropTypes.bool,
  add: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
}

export default ComponentButton
