import React from 'react'
import { StyleSheet, View } from 'react-native'

const Footer = ({ children, margin, top }) => margin && top ? <View style={[styles.footer, styles.addMargin, styles.topFooter]}>{children}</View> : top ? <View style={[styles.footer, styles.topFooter]}>{children}</View> : margin ? <View style={[styles.footer, styles.addMargin]}>{children}</View> : <View style={styles.footer}>{children}</View>

const styles = StyleSheet.create({
  footer: {
    position: 'relative',
    paddingLeft: 6,
    paddingRight: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 10,
    marginBottom: 10,
  },
  topFooter: {
    marginBottom: 0,
  },
})

export default Footer
