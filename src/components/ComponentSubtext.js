import React, { PropTypes } from 'react'
import { StyleSheet, Text } from 'react-native'

const ComponentSubtext = ({ children, text }) => (<Text style={styles.componentSubtext} numberOfLines={2}>{text}</Text>)

const styles = StyleSheet.create({
  componentSubtext: {
    fontSize: 14,
    paddingTop: 4,
    color: '#777',
    overflow: 'hidden',
    fontWeight: '600',
  },
})

export default ComponentSubtext
