import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert, Linking, Clipboard, SafeAreaView } from 'react-native';
import { openComposer } from 'react-native-email-link';

const AccDetailsScreen = ({ route }) => {
  const { product } = route.params;
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [orderDetails, setOrderDetails] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    quantity: '',
    color: '',
    specialInstructions: ''
  });

  const handleInputChange = (name, value) => {
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const sendOrderEmail = async () => {
    // Validate required fields
    if (!orderDetails.fullName || !orderDetails.contactNumber || !orderDetails.quantity) {
      Alert.alert('Error', 'Full Name, Contact Number and Quantity are required');
      return;
    }

    const recipient = 'charityfashionsales@gmail.com';
    const subject = `New Order: ${product.name}`;
    const body = `Dear Charity Fashion,\n\n` +
      `I would like to place an order for:\n\n` +
      `• Product: ${product.name}\n` +
      `${selectedSize ? `• Size: ${selectedSize.size}\n` : ''}` +
      `• Price: N$${selectedSize ? selectedSize.price.toFixed(2) : product.price.toFixed(2)}\n` +
      `• Quantity: ${orderDetails.quantity}\n` +
      `• Color: ${orderDetails.color || 'Not specified'}\n\n` +
      `My details:\n` +
      `• Full Name: ${orderDetails.fullName}\n` +
      `• Email: ${orderDetails.email || 'Not provided'}\n` +
      `• Contact: ${orderDetails.contactNumber}\n\n` +
      `Special Instructions:\n${orderDetails.specialInstructions || 'None'}\n\n` +
      `Please confirm my order details.\n\n` +
      `Best regards,\n${orderDetails.fullName}`;

    try {
      await openComposer({
        to: recipient,
        subject: subject,
        body: body
      });
    } catch (error) {
      console.log('Email error:', error);
      try {
        const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        await Linking.openURL(mailtoUrl);
      } catch (mailtoError) {
        console.log('Mailto error:', mailtoError);
        await Clipboard.setString(`To: ${recipient}\nSubject: ${subject}\n\n${body}`);
        Alert.alert(
          'Email Not Configured',
          'The order details have been copied to your clipboard. Please paste them into your email app.',
          [
            { text: 'OK', onPress: () => {} },
            { text: 'Open Mail App', onPress: () => Linking.openURL('mailto:') }
          ]
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image 
            source={require('../../Assets/Logo.png')}
            style={styles.logo}
          />
          <Text style={styles.companyName}>CFASHION.NA</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image
            source={product.image}
            style={styles.productImage}
            resizeMode="cover"
          />

          <View style={styles.detailsContainer}>
            <Text style={styles.productName}>{product.name}</Text>
            
            {product.sizes ? (
              <View>
                <Text style={styles.priceLabel}>Available Sizes:</Text>
                <View style={styles.sizeOptionsContainer}>
                  {product.sizes.map((size, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.sizeOption,
                        selectedSize.size === size.size && styles.selectedSizeOption
                      ]}
                      onPress={() => handleSizeSelection(size)}
                    >
                      <Text style={[
                        styles.sizeOptionText,
                        selectedSize.size === size.size && styles.selectedSizeOptionText
                      ]}>
                        {size.size}
                      </Text>
                      <Text style={styles.sizePrice}>N${size.price.toFixed(2)}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.currentPrice}>
                  Price: N${selectedSize.price.toFixed(2)}
                </Text>
              </View>
            ) : (
              <Text style={styles.productPrice}>N${product.price.toFixed(2)}</Text>
            )}
            
            <Text style={styles.descriptionTitle}>Product Description:</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Order Details</Text>
            <Text style={styles.formSubtitle}>Please provide your order information</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name *</Text>
              <TextInput
                style={styles.input}
                value={orderDetails.fullName}
                onChangeText={(text) => handleInputChange('fullName', text)}
                placeholder="Your full name"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Contact Number *</Text>
              <TextInput
                style={styles.input}
                value={orderDetails.contactNumber}
                onChangeText={(text) => handleInputChange('contactNumber', text)}
                placeholder="+264"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={orderDetails.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="your@email.com"
                keyboardType="email-address"
              />
            </View>

            <Text style={styles.sectionTitle}>Product Customization</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Quantity *</Text>
              <TextInput
                style={styles.input}
                value={orderDetails.quantity}
                onChangeText={(text) => handleInputChange('quantity', text)}
                placeholder="How many items?"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Color Preference</Text>
              <TextInput
                style={styles.input}
                value={orderDetails.color}
                onChangeText={(text) => handleInputChange('color', text)}
                placeholder="Preferred color (optional)"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Special Instructions</Text>
              <TextInput
                style={[styles.input, { height: 80 }]}
                value={orderDetails.specialInstructions}
                onChangeText={(text) => handleInputChange('specialInstructions', text)}
                placeholder="Any special requests or instructions"
                multiline
              />
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={sendOrderEmail}
            >
              <Text style={styles.submitButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerContact}>Need help with your order?</Text>
          <Text style={styles.footerNumber}>Call us: +264 812200730</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  scrollContent: {
    paddingBottom: 100,
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 15,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  sizeOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  sizeOption: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    minWidth: 80,
    alignItems: 'center',
  },
  selectedSizeOption: {
    borderColor: '#ca9e07',
    backgroundColor: '#f8e8b0',
  },
  sizeOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  selectedSizeOptionText: {
    color: '#ca9e07',
  },
  sizePrice: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ca9e07',
    marginBottom: 15,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ca9e07',
    marginBottom: 15,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 15,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  formSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  submitButton: {
    backgroundColor: '#ca9e07',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
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
    color: '#ca9e07',
    fontSize: 14,
    marginBottom: 5,
  },
  footerNumber: {
    color: 'white',
    fontSize: 14,
  },
});

export default AccDetailsScreen;