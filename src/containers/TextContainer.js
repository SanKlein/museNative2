import React from 'react'
import { StyleSheet, View } from 'react-native'

const TextContainer = ({ children }) => (<View style={styles.textContainer}>{children}</View>)

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingTop: 2,
    paddingBottom: 18,
  },
})

export default TextContainer
