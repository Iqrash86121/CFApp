import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const Medical = ({ navigation }) => {
  // Medical uniform products data with inline image requires
  const products = [
    { 
      id: 1, 
      name: 'Medical Scrubs Set', 
      price: 524, 
      description: 'Professional medical scrubs with multiple pockets.',
      image: require('../../Assets/scrub.png')
    },
    { 
      id: 2, 
      name: 'Medical Uniform', 
      price: 741.3, 
      description: 'Premium medical scrubs set featuring antimicrobial fabric treatment for hygiene and odor resistance. The breathable, stretchable material provides all-day comfort during long shifts. Includes multiple functional pockets for medical tools and devices. Wrinkle-resistant design maintains a professional appearance. Available in various sizes and colors to suit your workplace requirements. Ideal for doctors, nurses, and healthcare professionals seeking both comfort and functionality.',
      image: require('../../Assets/Hospitalwear.png')
    },
    { 
      id: 3, 
      name: '5 pockets trousers', 
      price: 516.23, 
      description: 'Versatile work trousers featuring five functional pockets for maximum utility.',
      image: require('../../Assets/pocket.png')
    },
    { 
      id: 4, 
      name: 'Scrubs (TOP AND TROUSER)', 
      price: 524.23, 
      description: 'Professional medical scrubs with multiple pockets.',
      image: require('../../Assets/PPE.png')
    },
    { 
      id: 5, 
      name: 'Golf t-shirt', 
      price: 270.50, 
      description: 'High-performance golf t-shirt',
      image: require('../../Assets/golf.png')
    },
    { 
      id: 6, 
      name: 'Ambulance Respond Wear', 
      price: 741, 
      description: 'Professional protective ambulance respond wear. ',
      image: require('../../Assets/amb.png')
    },
  ];

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetailScreen', { product: item })}
    >
      <Image 
        source={item.image} 
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>N${item.price.toFixed(2)}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <View style={styles.viewDetailsButton}>
        <Text style={styles.viewDetailsText}>View</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Medical Uniforms</Text>
        <Text style={styles.subtitle}>Professional wear for healthcare workers</Text>
      </View>
      
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <Text style={styles.footerContact}>Contact Us:</Text>
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
  header: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  listContent: {
    padding: 15,
    paddingBottom: 80,
  },
  productItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ca9e07', // Gold color
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  viewDetailsButton: {
    backgroundColor: '#f8e8b0', // Light gold background
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ca9e07', // Gold border
  },
  viewDetailsText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    backgroundColor: '#333',
    padding: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerContact: {
    color: '#ca9e07', // Gold color
    fontSize: 14,
    marginBottom: 5,
  },
  footerNumber: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  footerEmail: {
    color: 'white',
    fontSize: 14,
  },
});

export default Medical;