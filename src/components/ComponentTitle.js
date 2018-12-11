import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const ComponentTitle = ({ children, answered, small, title }) => {
  const classes =
    answered && small
      ? [styles.componentTitle, styles.answeredTitle, styles.smallTitle]
      : answered
        ? [styles.componentTitle, styles.answeredTitle]
        : small ? [styles.componentTitle, styles.smallTitle] : styles.componentTitle;

  return <Text style={classes}>{title}</Text>;
};

const styles = StyleSheet.create({
  componentTitle: {
    color: '#333',
    flex: 1,
    fontSize: 18,
    fontWeight: '700'
  },
  answeredTitle: {
    opacity: 0.7
  },
  smallTitle: {
    fontWeight: '700'
  }
});

ComponentTitle.propTypes = {
  answered: PropTypes.bool
};

export default ComponentTitle;
