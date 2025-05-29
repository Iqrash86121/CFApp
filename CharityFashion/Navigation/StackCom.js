import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from '../Screens/HomeScreen';
import Splash from '../Screens/Splash';
import CoursesScreen from '../Screens/Courses';
import OutfitsCategories from '../Screens/OutfitsCategories'
import ProductDetailScreen from '../Screens/Categories/ProductDetailScreen'
import Medical from '../Screens/Categories/Medical'
import PDesign from '../Screens/Categories/PDesign'
import Workwear from '../Screens/Categories/Workwear'
const Stack = createNativeStackNavigator();

const StackCom = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false // This will hide all screen headers by default
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={Splash} 
          options={{ headerShown: false }} // Explicitly hide for Splash (redundant but clear)
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ headerShown: false }} // Hide header for HomeScreen
        />
        <Stack.Screen 
          name="OutfitsCategories" 
          component={OutfitsCategories} 
  
        />
         
        <Stack.Screen 
          name="Courses" 
          component={CoursesScreen} 
  
        />
        
         <Stack.Screen 
          name="Medical" 
          component={Medical} 
        
        />
         <Stack.Screen 
          name="PDesign" 
          component={PDesign} 
         
        />
         <Stack.Screen 
          name="Workwear" 
          component={Workwear} 
         
        />
         <Stack.Screen 
          name="ProductDetailScreen" 
          component={ProductDetailScreen} 
  
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackCom;