import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OutfitsCategories = () => {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState(null);

  const categories = [
    { id: 1, name: 'PERSONAL & WORK WEAR', screen: 'Workwear' },
    { id: 2, name: 'MEDICAL UNIFORMS', screen: 'Medical' },
    { id: 3, name: 'ACCESSORIES', screen: 'PDesign' },
  ];

  const handleCategoryPress = (screenName, id) => {
    setActiveButton(id);
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../Assets/Logo.png')}
          style={styles.logo}
        />
        <Text style={styles.companyName}>CFASHION.NA</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroSection}>
          <Text style={styles.mainTitle}>ORDER BY CATEGORY</Text>
          <Text style={styles.subTitle}>Personal Protective Wear & Work Wear</Text>
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            Every item can be customized to your preferred color, size, and design.
          </Text>
          <Text style={styles.productionNote}>
            Production time: Typically 7 days (may vary based on quantity and complexity)
          </Text>
        </View>
       
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                activeButton === category.id && styles.activeButton
              ]}
              onPress={() => handleCategoryPress(category.screen, category.id)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.categoryText,
                activeButton === category.id && styles.activeButtonText
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerContact}>CONTACT US:</Text>
        <Text style={styles.footerNumber}>+264 812200730</Text>
        <Text style={styles.footerEmail}>charityfashionsales@gmail.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 1.5,
  },
  heroSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ca9e07',
    marginBottom: 5,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  noteContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 25,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ca9e07',
  },
  noteText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
    lineHeight: 22,
    textAlign: 'center',
  },
  productionNote: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeButton: {
    backgroundColor: '#ca9e07',
    borderColor: '#ca9e07',
  },
  categoryText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  activeButtonText: {
    color: '#fff',
  },
  footer: {
    backgroundColor: '#333',
    padding: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: '#ca9e07',
  },
  footerContact: {
    color: '#ca9e07',
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  footerNumber: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  footerEmail: {
    color: '#fff',
    fontSize: 14,
  },
});

export default OutfitsCategories;