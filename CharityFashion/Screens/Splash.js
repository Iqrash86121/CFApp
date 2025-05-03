import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1.5)).current;
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();

    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('HomeScreen');
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        {/* Background Image with 50% opacity */}
        <Image 
          source={require('../Assets/bg.png')} 
          style={[
            styles.backgroundImage,
            {
              width: width * 1.0,
              height: height * 0.7,
            }
          ]}
          blurRadius={1}
        />
        
        <View style={styles.logoContainer}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Image 
              source={require('../Assets/Logo.png')} 
              style={styles.logo}
            />
          </Animated.View>
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    opacity: 0.3,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  }
});

export default Splash;