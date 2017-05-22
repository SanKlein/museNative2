import React from 'react'
import { StyleSheet, View } from 'react-native'

const Container = ({ children, handleClick }) => (<View style={styles.container} onClick={handleClick}>{children}</View>)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Container
