import React, { useRef, useState, useEffect } from 'react';
import { View, Dimensions, Image, StyleSheet, ScrollView, Animated, TouchableOpacity } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef();
  const intervalRef = useRef();

  const sliderImages = [
    { id: 1, image: require('../Assets/our.png') },
    { id: 2, image: require('../Assets/offers.png') },
    { id: 3, image: require('../Assets/Details.png') },
  ];

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleSlideChange = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setCurrentIndex(index);
  };

  const goToSlide = (index) => {
    // Reset the interval when user manually changes slide
    resetInterval();
    
    scrollRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
  };

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % sliderImages.length;
      goToSlide(nextIndex);
    }, 2000); // Change slide every 2 seconds
  };

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    startInterval();
  };

  useEffect(() => {
    startInterval();
    
    // Clean up interval on component unmount
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [currentIndex]); // Restart interval when currentIndex changes

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleSlideChange}
        scrollEventThrottle={16}
      >
        {sliderImages.map((item) => (
          <View key={item.id} style={styles.slide}>
            <Image source={item.image} style={styles.image} />
          </View>
        ))}
      </ScrollView>

      {/* Dots indicator */}
      <View style={styles.dotsContainer}>
        {sliderImages.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot
            ]}
            onPress={() => goToSlide(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  slide: {
    width: screenWidth,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 12,
  },
});

export default ImageSlider;