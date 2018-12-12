// src/components/NavigationButton.js

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

// eslint-disable-next-line
class NavigationButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, navigation, navigate } = this.props;

    return (
      <TouchableOpacity
        style={{ padding: 8, marginLeft: 8, marginRight: 8 }}
        activeOpacity={0.7}
        onPress={() => navigation.navigate(navigate)}
      >
        {children}
      </TouchableOpacity>
    );
  }
}

export default withNavigation(NavigationButton);
