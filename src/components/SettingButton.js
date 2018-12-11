import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';

const SettingButton = ({ children, handleClick, fade }) => {
  if (fade) {
    return (
      <TouchableHighlight
        style={{ ...styles.settingButton, ...styles.fadeButton }}
        onClick={handleClick}
      >
        <Text>{children}</Text>
      </TouchableHighlight>
    );
  } else {
    return (
      <TouchableHighlight style={styles.settingButton} onClick={handleClick}>
        <Text>{children}</Text>
      </TouchableHighlight>
    );
  }
};

SettingButton.propTypes = {
  handleClick: PropTypes.func,
  fade: PropTypes.bool
};

const styles = StyleSheet.create({
  settingButton: {
    fontSize: 22,
    fontWeight: '700',
    padding: 20,
    color: '#333',
    textAlign: 'center'
  },
  fadeButton: {
    opacity: 0.5
  }
});

export default SettingButton;
