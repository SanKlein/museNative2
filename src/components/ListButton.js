import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';

const ListButton = ({ children, handleClick }) => (
  <TouchableHighlight style={styles.listButton} onClick={handleClick}>
    <Text>{children}</Text>
  </TouchableHighlight>
);

ListButton.propTypes = {
  handleClick: PropTypes.func
};

const styles = StyleSheet.create({
  listButton: {
    backgroundColor: 'transparent',
    fontSize: 22,
    fontWeight: '700',
    padding: 15,
    color: '#333',
    textAlign: 'center'
  }
});

export default ListButton;
