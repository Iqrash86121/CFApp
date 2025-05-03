// screens/ProductStack.js
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OutfitsCategories from '../Screens/OutfitsCategories'
import Personal from '../Screens/Categories/Personal'
import Medical from '../Screens/Categories/Medical'
import PDesign from '../Screens/Categories/PDesign'
import Workwear from '../Screens/Categories/Workwear'

const Stack = createNativeStackNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Show default header for stack screens
      }}
    >
         <Stack.Screen 
          name="OutfitsCategories" 
          component={OutfitsCategories} 
  
        />
         <Stack.Screen 
          name="Personal" 
          component={Personal} 
  
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
    </Stack.Navigator>
  );
};

export default ProductStack;