import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const Workwear = ({ navigation }) => {
 const products = [
  { 
    id: 1, 
    name: 'OVERALLS:', 
    price: 435.84, 
    description: 'Industrial-grade work overalls with reinforced stitching, made from durable poly-cotton blend that resists stains and tears. Ideal for construction and heavy labor.',
    image: require('../../Assets/overall.png')
  },
  { 
    id: 2, 
    name: '6 Pockets with inserted reflectors and elastic', 
    price: 500, 
    description: 'Functional work pants featuring six strategically placed pockets, elastic waistband, and safety reflectors for high visibility in low-light conditions.',
    image: require('../../Assets/6pok.png')
  },
  { 
    id: 3, 
    name: 'Security Uniform (Trousers, Shirt)', 
    price: 1050.00, 
    description: 'Professional security uniform set with moisture-wicking fabric, multiple utility pockets, and a polished look that commands authority while ensuring comfort.',
    image: require('../../Assets/uni.png')
  },
  { 
    id: 4, 
    name: 'Fashion Overall',
    price: 380, 
    description: 'Stylish denim overall with contemporary fit, perfect for casual wear while maintaining functionality with multiple pockets.',
    image: require('../../Assets/FO.png')
  },
  { 
    id: 5, 
    name: 'Sustainable Fashion upcycle dress',
    price: 250, 
    description: 'Eco-chic dress crafted from upcycled materials, combining sustainability with modern fashion trends for environmentally conscious consumers.',
    image: require('../../Assets/FS.png')
  },
  { 
    id: 6, 
    name: 'Overall design bushwear',
    price: 380, 
    description: 'Rugged bushwear overalls designed for outdoor enthusiasts, featuring water-resistant fabric and ample storage for tools and gear.',
    image: require('../../Assets/FB.png')
  },
  { 
    id: 7, 
    name: 'Costume Design',
    price: 550, 
    description: 'Custom costume designs for theatrical performances or special events, made with attention to detail and authentic materials.',
    image: require('../../Assets/cus.png')
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
        <Text style={styles.title}> Protective Work Wear</Text>
        <Text style={styles.subtitle}>Elegant Professional  wear of any type</Text>
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
    color: '#ca9e07',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  viewDetailsButton: {
    backgroundColor: '#f8e8b0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ca9e07',
  },
  viewDetailsText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    backgroundColor: '#333',
    padding: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerContact: {
    color: '#ca9e07',
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

export default Workwear;