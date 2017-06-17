import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'

const AboutSection = ({ children, handleClick }) => (<View style={styles.container}>{children}</View>)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0,
    flex: 1,
  },
})

export default AboutSection
