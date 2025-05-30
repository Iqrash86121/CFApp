import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert, Linking, Clipboard } from 'react-native';
import { openComposer } from 'react-native-email-link';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const [measurements, setMeasurements] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    bust: '',
    waist: '',
    hips: '',
    backWidth: '',
    frontChest: '',
    shoulder: '',
    neckSize: '',
    sleeve: '',
    underBust: '',
    wrist: '',
    upperArm: '',
    calfAnkle: '',
    napeToWaist: '',
    waistToHip: '',
    frontShoulderToHip: '',
    outsideLeg: '',
    insideLeg: ''
  });

  const handleInputChange = (name, value) => {
    setMeasurements(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendOrderEmail = async () => {
    // Validate required fields
    if (!measurements.fullName || !measurements.contactNumber) {
      Alert.alert('Error', 'Full Name and Contact Number are required');
      return;
    }

    const recipient = 'charityfashionsales@gmail.com';
    const subject = `New Order: ${product.name}`;
    const body = `Dear Charity Fashion,\n\n` +
      `I would like to place an order for:\n\n` +
      `• Product: ${product.name}\n` +
      `• Price: N$${product.price.toFixed(2)}\n\n` +
      `My details:\n` +
      `• Full Name: ${measurements.fullName}\n` +
      `• Email: ${measurements.email || 'Not provided'}\n` +
      `• Contact: ${measurements.contactNumber}\n\n` +
      `Measurements (in cm):\n` +
      `${Object.entries(measurements)
        .filter(([key]) => !['fullName', 'email', 'contactNumber'].includes(key))
        .map(([key, value]) => `• ${key.replace(/([A-Z])/g, ' $1').toUpperCase()}: ${value || 'Not provided'}`)
        .join('\n')}\n\n` +
      `Please confirm my order details.\n\n` +
      `Best regards,\n${measurements.fullName}`;

    try {
      // First try react-native-email-link
      await openComposer({
        to: recipient,
        subject: subject,
        body: body
      });
    } catch (error) {
      console.log('Email error:', error);

      // Fallback to mailto link
      try {
        const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        await Linking.openURL(mailtoUrl);
      } catch (mailtoError) {
        console.log('Mailto error:', mailtoError);

        // Final fallback - copy to clipboard
        await Clipboard.setString(`To: ${recipient}\nSubject: ${subject}\n\n${body}`);
        Alert.alert(
          'Email Not Configured',
          'The order details have been copied to your clipboard. Please paste them into your email app.',
          [
            { text: 'OK', onPress: () => { } },
            {
              text: 'Open Mail App',
              onPress: () => Linking.openURL('mailto:')
            }
          ]
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* New Header Matching OutfitsCategories */}
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
          <Text style={styles.productPrice}>N${product.price.toFixed(2)}</Text>
          <Text style={styles.descriptionTitle}>Product Description:</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Measurement Details</Text>
          <Text style={styles.formSubtitle}>Please provide your measurements (in centimeters)</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={measurements.fullName}
              onChangeText={(text) => handleInputChange('fullName', text)}
              placeholder="Your full name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contact Number *</Text>
            <TextInput
              style={styles.input}
              value={measurements.contactNumber}
              onChangeText={(text) => handleInputChange('contactNumber', text)}
              placeholder="+264"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={measurements.email}
              onChangeText={(text) => handleInputChange('email', text)}
              placeholder="your@email.com"
              keyboardType="email-address"
            />
          </View>

          <Text style={styles.sectionTitle}>Body Measurements</Text>

          {['Bust', 'Waist', 'Hips', 'Back Width', 'Front Chest',
            'Shoulder', 'Neck Size', 'Sleeve', 'Under Bust', 'Wrist',
            'Upper Arm', 'Calf/Ankle', 'Nape to Waist', 'Waist to Hip',
            'Front Shoulder to Hip', 'Outside Leg', 'Inside Leg'].map((label) => {
              const key = label.toLowerCase().replace(/ /g, '');
              return (
                <View key={key} style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>{label}</Text>
                  <TextInput
                    style={styles.input}
                    value={measurements[key]}
                    onChangeText={(text) => handleInputChange(key, text)}
                    placeholder={`${label} in cm`}
                    keyboardType="numeric"
                  />
                </View>
              );
            })}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={sendOrderEmail}
          >
            <Text style={styles.submitButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerContact}>Need help with measurements?</Text>
        <Text style={styles.footerNumber}>Call us: +264 812200730</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // New Header Styles
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
  // Rest of the styles remain the same
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

export default ProductDetailScreen;