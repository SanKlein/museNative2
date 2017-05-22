import React, { PropTypes } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

const FooterButton = ({ children, big, green, purple, hide, handleClick, text }) => {
  const buttonStyle = big && green ? [styles.footerButton, styles.bigButton, styles.greenButton] : big && purple ? [styles.footerButton, styles.bigButton, styles.purpleButton] : green ? [styles.footerButton, styles.greenButton] : purple ? [styles.footerButton, styles.purpleButton] : big ? [styles.footerButton, styles.bigButton] : hide ? [styles.footerButton, styles.hideButton] : styles.footerButton
  const textStyle = purple || green ? [styles.footerText, styles.whiteText] : styles.footerText

  if ((big && !green && !purple) || (!big && green)) return (<TouchableOpacity style={buttonStyle} onPress={handleClick} activeOpacity={1}><Text style={textStyle}>{text}</Text></TouchableOpacity>)

  return (<TouchableOpacity style={buttonStyle} onPress={handleClick} activeOpacity={.7}><Text style={textStyle}>{text}</Text></TouchableOpacity>)
}

const styles = StyleSheet.create({
  footerButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
    alignSelf: 'center',
    height: 54,
    minWidth: 94,
    width: 94,
    marginLeft: 6,
    marginRight: 6,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#474747',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
  },
  bigButton: {
    flex: 1,
  },
  greenButton: {
    backgroundColor: '#66CC99',
  },
  whiteText: {
    color: '#FFF',
  },
  purpleButton: {
    backgroundColor: '#967ADC',
  },
  hideButton: {
    width: 0,
    minWidth: 0,
    marginLeft: 0,
    marginRight: 0,
    borderWidth: 0,
  },
})

FooterButton.propTypes = {
  handleClick: PropTypes.func,
}

export default FooterButton
