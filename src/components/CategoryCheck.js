import React, { PropTypes } from 'react'
import { View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const CategoryCheck = ({ children, picked }) => picked ? (<View><FontAwesome size={24} name="circle" color="#967ADC" /></View>) : (<View><FontAwesome size={24} name="circle-o" color="#AAA" /></View>)

CategoryCheck.propTypes = {
  handleClick: PropTypes.func,
  remove: PropTypes.bool,
  add: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
}
export default CategoryCheck
