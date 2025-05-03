import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image, Linking } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Email from 'react-native-email';

const Workwear = () => {
  // Sample product data with images
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Overalls', 
      price: 199.99, 
      description: 'Noise-cancelling wireless headphones with 30hr battery',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop' 
    },
    { 
      id: 2, 
      name: '6 Pockets with inserted reflectors and elastic', 
      price: 199.99, 
      description: 'Noise-cancelling wireless headphones with 30hr battery',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop' 
    },
    { 
      id: 3, 
      name: 'Dust coats', 
      price: 199.99, 
      description: 'Noise-cancelling wireless headphones with 30hr battery',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop' 
    },
    { 
      id: 3, 
      name: 'Security Uniforms Trousers, Shirt.', 
      price: 199.99, 
      description: 'Noise-cancelling wireless headphones with 30hr battery',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop' 
    },
   
  ]);

  // State to track selected products
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Toggle product selection (unchanged)
  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Format selected products for email (unchanged)
  const formatProductsForEmail = () => {
    let emailBody = "Selected Products:\n\n";
    
    selectedProducts.forEach(id => {
      const product = products.find(p => p.id === id);
      if (product) {
        emailBody += `Name: ${product.name}\n`;
        emailBody += `Price: $${product.price}\n`;
        emailBody += `Description: ${product.description}\n\n`;
      }
    });
    
    emailBody += `Total Items: ${selectedProducts.length}\n`;
    const totalPrice = selectedProducts.reduce((sum, id) => {
      const product = products.find(p => p.id === id);
      return sum + (product ? product.price : 0);
    }, 0);
    emailBody += `Total Price: $${totalPrice.toFixed(2)}`;
    
    return emailBody;
  };

  // Fallback using mailto: URL
  const sendWithMailto = (emailBody) => {
    const subject = 'Selected Products Information';
    const recipient = 'iqrashali86121@gmail.com';
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    Linking.openURL(mailtoUrl).catch(() => {
      Alert.alert('Error', 'No email clients available');
    });
  };

  // Updated email sending function with better error handling
  const sendProductsByEmail = async () => {
    if (selectedProducts.length === 0) {
      Alert.alert('No Selection', 'Please select at least one product');
      return;
    }

    try {
      const emailBody = formatProductsForEmail();
      
      // First try react-native-email
      if (Email && typeof Email.email === 'function') {
        await Email.email({
          subject: 'Selected Products Information',
          body: emailBody,
          to: ['iqrashali86121@gmail.com'],
        });
      } else {
        // Fallback to mailto if Email module not available
        sendWithMailto(emailBody);
      }
    } catch (error) {
      console.error('Email error:', error);
      // Fallback to mailto if react-native-email fails
      sendWithMailto(formatProductsForEmail());
    }
  };

  // Render each product item (unchanged)
  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.productItem,
        selectedProducts.includes(item.id) && styles.selectedProduct
      ]}
      onPress={() => toggleProductSelection(item.id)}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </View>
      <Checkbox
        status={selectedProducts.includes(item.id) ? 'checked' : 'unchecked'}
        onPress={() => toggleProductSelection(item.id)}
        color="#6200ee"
      />
    </TouchableOpacity>
  );

  // The rest of your component remains exactly the same
  return (
     <View style={styles.container}>
        <Text style={styles.header}>Select Products</Text>
        
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
        
        <View style={styles.footer}>
          <Text style={styles.selectionCount}>
            {selectedProducts.length} product(s) selected
          </Text>
          <TouchableOpacity
            style={[
              styles.emailButton,
              selectedProducts.length === 0 && styles.disabledButton
            ]}
            onPress={sendProductsByEmail}
            disabled={selectedProducts.length === 0}
          >
            <Text style={styles.emailButtonText}>Send Selected Products via Email</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 80,
  },
  productItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  selectedProduct: {
    borderColor: '#6200ee',
    borderWidth: 1,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    marginRight: 12,
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
    color: '#6200ee',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 13,
    color: '#666',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  selectionCount: {
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 16,
    color: '#333',
  },
  emailButton: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  emailButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Workwear;