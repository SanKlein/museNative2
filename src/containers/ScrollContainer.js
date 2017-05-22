import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'

const ScrollContainer = ({ children }) => (<ScrollView style={styles.container}>{children}</ScrollView>)

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexShrink: 0,
  },
})

export default ScrollContainer
