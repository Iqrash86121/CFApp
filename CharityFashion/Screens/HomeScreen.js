import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import ImageSlider from '../Components/ImageSlider'

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header with Logo and Company Name */}
      <View style={styles.header}>
        <Image 
          source={require('../Assets/Logo.png')} // Replace with your actual logo path
          style={styles.logo}
        />
        <Text style={styles.companyName}>CFASHION.NA</Text>
      </View>

      {/* Image Slider */}
      <ImageSlider/>

      {/* Buttons */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity 
          style={[styles.button, styles.productsButton]}
          onPress={() => navigation.navigate('OutfitsCategories')}
        >
          <Text style={styles.buttonText}>Fashion Design and Accessories</Text>
        </TouchableOpacity>

        <View style={styles.buttonSpacer} />

        <TouchableOpacity 
          style={[styles.button, styles.coursesButton]}
          onPress={() => navigation.navigate('Courses')}
        >
          <Text style={styles.buttonText}>Training and Development</Text>
        </TouchableOpacity>
      </View>

      {/* Footer with Company Details */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>CHARITY FASHION</Text>
        <Text style={styles.footerText}>Martin Neib Ave. Shop 12 Okahandja, Namibia</Text>
        <Text style={styles.footerContact}>Contact Us:</Text>
        <Text style={styles.footerNumber}>+264 812200730</Text>
        <Text style={styles.footerEmail}>charityfashionsales@gmail.com</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  productsButton: {
    backgroundColor: '#ca9e07',
  },
  coursesButton: {
    backgroundColor: '#ca9e07',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  buttonSpacer: {
    height: 20,
  },
  footer: {
    backgroundColor: '#333',
    padding: 10,
    alignItems: 'center',
  },
  footerTitle: {
    color: '#ca9e07',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footerNumber: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  footerText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  footerContact: {
    color: '#ca9e07',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
  },
  footerEmail: {
    color: 'white',
    fontSize: 14,
  },
})