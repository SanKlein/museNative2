import React, { PropTypes } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const CategoryButton = ({ children, handleClick, category, text, purple }) => {
  const buttonStyle = purple ? [styles.categoryButton, styles.purpleButton] : styles.categoryButton
  const textStyle = purple ? [styles.text, styles.purpleText] : styles.text
  return (
    <TouchableOpacity style={buttonStyle} onPress={() => handleClick(category)} activeOpacity={.7}>
      <View style={styles.icon}>{category === 'Everything' ? <MaterialIcons size={22} name="all-inclusive" color="#333" /> : category === "Today's Prompt" ? <FontAwesome size={22} name="star-o" color="#FFF" /> : category === 'Self' ? <FontAwesome size={22} name="smile-o" color="#333" /> : category === 'Life' ? <Ionicons size={22} name="md-globe" color="#333" /> : category === 'Today' ? <Ionicons size={22} name="md-calendar" color="#333" /> : category === 'Growth' ? <Ionicons size={22} name="md-trending-up" color="#333" /> : category === 'Gratitude' ? <FontAwesome size={22} name="heart-o" color="#333" /> : category === 'Work' ? <SimpleLineIcons size={22} name="briefcase" color="#333" /> : category === 'saved' ? <MaterialIcons size={22} name="bookmark-border" color="#333" /> : category === 'favorites' ? <FontAwesome size={22} name="star-o" color="#333" /> : category === 'daily' ? <Ionicons size={22} name="md-calendar" color="#333" /> : category === 'created' ? <Ionicons size={22} name="md-brush" color="#333" /> : null }</View>
      <Text style={textStyle}>{text}</Text>
      { category === "Today's Prompt" ? <View style={styles.button}><Ionicons size={22} name="md-arrow-round-forward" color="#FFF" /></View> : category ? <View style={styles.button}><Ionicons size={22} name="md-arrow-round-forward" color="#333" /></View> : <View style={styles.button}></View> }
    </TouchableOpacity>
  )
}

CategoryButton.propTypes = {
  handleClick: PropTypes.func,
}

const styles = StyleSheet.create({
  categoryButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    marginTop: 10,
    marginBottom: 0,
    marginLeft: 12,
    marginRight: 12,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 30,
    height: 54,
    flex: 1,
  },
  purpleButton: {
    backgroundColor: '#967ADC',
  },
  icon: {
    width: 30,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '700',
  },
  purpleText: {
    color: '#FFF',
  },
  button: {
    width: 30,
    alignItems: 'center',
  },
})

export default CategoryButton
