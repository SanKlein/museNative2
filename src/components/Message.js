import React from 'react'
import { StyleSheet, Text } from 'react-native'

const Message = ({ message }) => (<Text style={styles.message}>{message}</Text>)

const styles = StyleSheet.create({
  message: {
    fontSize: 16,
    color: '#777',
    marginTop: 4,
    paddingLeft: 12,
    paddingRight: 12,
    fontWeight: '700',
  },
})

export default Message
