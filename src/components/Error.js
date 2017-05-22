import React from 'react'
import { StyleSheet, Text } from 'react-native'

const Error = ({ children }) => (<Text style={styles.error}>{children}</Text>)

const styles = StyleSheet.create({
  error: {
    color: '#F08080',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 4,
    backgroundColor: '#FFF',
    padding: 8,
    fontWeight: '700',
  },
})

export default Error
