import React, { PropTypes } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

const ComponentText = ({ children, handleClick, text }) => (
  <TouchableOpacity style={styles.componentTouch} onPress={handleClick} activeOpacity={.7}>
    <Text style={styles.componentText} numberOfLines={2}>{text}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  componentTouch: {
    overflow: 'hidden',
    flex: 1,
  },
  componentText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
})

ComponentText.propTypes = {
  handleClick: PropTypes.func,
}

export default ComponentText
