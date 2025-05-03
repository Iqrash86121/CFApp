import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductStack from './ProductStack';
import Courses from '../Screens/Courses';

const Tab = createMaterialTopTabNavigator();

const TabNavigation = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Static Header */}
      <View style={styles.header}>
        <Image 
          source={require('../Assets/Logo.png')} 
          style={styles.logo} 
        />
        <Text style={styles.companyName}>Charity Fashion</Text>
      </View>
      
      {/* Top Tabs Navigation */}
      
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#6200ee',
            tabBarInactiveTintColor: 'gray',
            tabBarIndicatorStyle: {
              backgroundColor: '#6200ee',
            },
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
            },
            tabBarStyle: {
              backgroundColor: 'white',
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        >
          <Tab.Screen name="Products" component={ProductStack} />
          <Tab.Screen name="Courses" component={Courses} />
        </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabNavigation;