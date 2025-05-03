import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({ title}) => {
  return (
    <View style={styles.container}>
     
      <Text style={styles.title}>{title}</Text>
      <View style={styles.spacer} /> {/* For alignment when back button is hidden */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'Black',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
 
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    flex: 1,
  },
  spacer: {
    width: 24, // Same as back button width for balance
  },
});

export default Header;