import React from 'react'
import { StyleSheet, View } from 'react-native'

const Page = ({ children }) => (<View style={styles.page}>{children}</View>)

const styles = StyleSheet.create({
  page: {
    marginTop: 44,
    flex: 1,
    backgroundColor: '#FFF',
    flexDirection: 'column',
  },
})

export default Page
