import React, { PropTypes } from 'react'
import { StyleSheet, View } from 'react-native'

const ItemComponent = ({ children, created }) => {
  return created ? (<View style={[styles.item, styles.created]}>{children}</View>) : (<View style={styles.item}>{children}</View>)
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingLeft: 12,
    paddingBottom: 8,
    flexShrink: 0,
  },
  created: {
    paddingRight: 12,
  }
})

export default ItemComponent
