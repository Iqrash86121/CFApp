import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const PDesign = ({ navigation }) => {
  const products = [
    { 
      id: 1, 
      name: 'African Head cover', 
      price: 100, 
      description: 'Stylish and durable head cover made from high-quality African fabrics.',
      image: require('../../Assets/5.png'),
      type: 'accessory'
    },
    { 
      id: 2, 
      name: 'Plain Bonnet', 
      price: 80, 
      description: 'Stylish and durable head cover bonnet made from premium materials.',
      image: require('../../Assets/4.png'),
      type: 'accessory'
    },
    { 
      id: 3, 
      name: 'Tote Bag', 
      sizes: [
        { size: 'Large', price: 250 },
        { size: 'Medium', price: 180 },
        { size: 'Mini', price: 120 }
      ],
      description: 'Stylish and durable tote bag made from high-quality materials. Available in three sizes to suit different needs.',
      image: require('../../Assets/p2.png'),
      type: 'bag'
    },
    
    { 
      id: 4, 
      name: 'Medical Jump Bags', 
      price:995.00,
      description: 'Professional medical bags with multiple compartments. Available in three sizes for different medical supply needs.',
      image: require('../../Assets/pd.png'),
      type: 'accessory'
    },
    { 
      id: 5, 
      name: 'Accessories Shopping Bag', 
       sizes: [
         { size: 'Large', price: 250 },
        { size: 'Medium', price: 180 },
        { size: 'Mini', price: 120 }
      ],
      description: 'Fashionable shopping bag with accessory compartments. Three sizes available for different shopping needs.',
      image: require('../../Assets/bag.png'),
      type: 'bag'
    },
    { 
      id: 6, 
      name: 'Elegant Evening Bag', 
     sizes: [
        { size: 'Large', price: 250 },
        { size: 'Medium', price: 180 },
        { size: 'Mini', price: 120 }
      ],
      description: 'Chic evening bag for special occasions. Available in medium and mini sizes.',
      image: require('../../Assets/p3.png'),
      type: 'bag'
    },
    
  ];

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => navigation.navigate('AccDetailsScreen', { product: item })}
    >
      <Image 
        source={item.image} 
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        
        {item.sizes ? (
          <View style={styles.sizeContainer}>
            {item.sizes.map((size, index) => (
              <View key={index} style={styles.sizeOption}>
                <Text style={styles.sizeLabel}>{size.size}:</Text>
                <Text style={styles.sizePrice}>N${size.price.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.singlePrice}>N${item.price.toFixed(2)}</Text>
        )}
        
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
        <Text style={styles.title}>Product Designs</Text>
        <Text style={styles.subtitle}>Custom-made bags and accessories</Text>
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    letterSpacing: 1,
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
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  sizeContainer: {
    marginBottom: 8,
  },
  sizeOption: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  sizeLabel: {
    fontSize: 13,
    color: '#666',
    marginRight: 5,
    width: 60,
  },
  sizePrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ca9e07',
  },
  singlePrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ca9e07',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    fontStyle: 'italic',
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
    padding: 15,
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