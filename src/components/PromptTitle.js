import React from 'react'
import { StyleSheet, Text } from 'react-native'

const PromptTitle = ({ title }) => (<Text style={styles.promptTitle}>{title}</Text>)

const styles = StyleSheet.create({
  promptTitle: {
    fontSize: 22,
    color: '#333',
    fontWeight: '700',
    flex: 1,
  },
})

export default PromptTitle
