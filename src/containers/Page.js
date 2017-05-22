import React from 'react'
import { StyleSheet, View } from 'react-native'

const Page = ({ children }) => (<View style={styles.page}>{children}</View>)

const styles = StyleSheet.create({
  page: {
    marginTop: 64,
    flex: 1,
    backgroundColor: '#FFF',
    flexDirection: 'column',
  },
})

export default Page
