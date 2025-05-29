import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const PDesign = ({ navigation }) => {
  // Medical uniform products data
  const products = [
    { 
      id: 1, 
      name: 'Medical Scrubs Set', 
      price: 49.99, 
      description: 'Professional medical scrubs with antimicrobial treatment. Comfortable stretch fabric with multiple pockets.',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&auto=format&fit=crop' 
    },
    { 
      id: 2, 
      name: 'Lab Coat', 
      price: 59.99, 
      description: 'White medical lab coat with premium fabric and multiple functional pockets.',
      image: 'https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=500&auto=format&fit=crop' 
    },
    { 
      id: 3, 
      name: 'Nursing Shoes', 
      price: 79.99, 
      description: 'Comfortable nursing shoes with slip-resistant soles for long shifts.',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop' 
    },
    { 
      id: 4, 
      name: 'Surgical Mask', 
      price: 9.99, 
      description: '3-ply disposable surgical masks, box of 50 pieces.',
      image: 'https://images.unsplash.com/photo-1584634731339-252c58ab7454?w=500&auto=format&fit=crop' 
    },
  ];

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetailScreen', { product: item })}
    >
      <Image 
        source={{ uri: item.image }} 
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
        <Text style={styles.footerEmail}>charityfashioncc@gmail.com</Text>
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

export default PDesign;