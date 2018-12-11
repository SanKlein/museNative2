import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const ListTitle = ({ children, answered, small, handleClick, title }) => {
  const classes =
    answered && small
      ? [styles.componentTitle, styles.answeredTitle, styles.smallTitle]
      : answered
        ? [styles.componentTitle, styles.answeredTitle]
        : small ? [styles.componentTitle, styles.smallTitle] : styles.componentTitle;

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={handleClick} activeOpacity={0.7}>
      <Text style={classes}>{title}</Text>
    </TouchableOpacity>
  );
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
    fontWeight: '500'
  }
});

ListTitle.propTypes = {
  handleClick: PropTypes.func,
  answered: PropTypes.bool
};

export default ListTitle;
