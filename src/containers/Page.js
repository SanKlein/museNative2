import React from 'react';
import { StyleSheet, View } from 'react-native';

const Page = ({ children }) => <View style={styles.page}>{children}</View>;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFF'
  }
});

export default Page;
