import React, { PropTypes } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const ListComponent = ({ children, handleClick }) => (<TouchableOpacity style={styles.listComponent} onPress={handleClick} activeOpacity={.7}>{children}</TouchableOpacity>)

ListComponent.propTypes = {
  handleClick: PropTypes.func,
}

const styles = StyleSheet.create({
  listComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 12,
    paddingRight: 12,
    flexShrink: 0,
  },
})

export default ListComponent
