import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const ListButton = ({ children, handleClick }) => (
  <TouchableOpacity style={styles.listButton} onPress={handleClick}>
    <Text style={styles.listButtonText}>{children}</Text>
  </TouchableOpacity>
);

ListButton.propTypes = {
  handleClick: PropTypes.func
};

const styles = StyleSheet.create({
  listButton: {
    backgroundColor: 'transparent',
    padding: 32,
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  listButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '700'
  }
});

export default ListButton;
