import React, { PropTypes } from 'react'
import { StyleSheet, View } from 'react-native'

const ItemComponent = ({ children }) => (<View style={styles.item}>{children}</View>)

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingLeft: 12,
    paddingBottom: 5,
    flexShrink: 0,
  },
})

export default ItemComponent
