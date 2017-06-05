import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const TextContainer = ({ children, handleClick }) => (<TouchableOpacity style={styles.textContainer} onPress={handleClick} activeOpacity={.7}>{children}</TouchableOpacity>)

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingTop: 2,
    paddingBottom: 8,
  },
})

export default TextContainer
