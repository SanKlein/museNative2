import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'

const AboutSection = ({ children, handleClick }) => (<View style={styles.container}>{children}</View>)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 30,
    paddingLeft: 12,
    paddingRight: 12,
    flexShrink: 0,
  },
})

export default AboutSection
