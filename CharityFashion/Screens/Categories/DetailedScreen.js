import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert, Linking } from 'react-native';
import Email from 'react-native-email';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const [measurements, setMeasurements] = useState({
    fullName: 'OSH-Med International',
    email: 'admin@osh-med.pro',
    contactNumber: '061302931',
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

  const sendMeasurementsEmail = () => {
    const emailBody = `
      Product Details:
      -----------------
      Name: ${product.name}
      Price: $${product.price.toFixed(2)}
      Description: ${product.description}
      
      Customer Measurements:
      ---------------------
      Full Name: ${measurements.fullName}
      Email: ${measurements.email}
      Contact Number: ${measurements.contactNumber}
      Bust: ${measurements.bust}
      Waist: ${measurements.waist}
      Hips: ${measurements.hips}
      Back Width: ${measurements.backWidth}
      Front Chest: ${measurements.frontChest}
      Shoulder: ${measurements.shoulder}
      Neck Size: ${measurements.neckSize}
      Sleeve: ${measurements.sleeve}
      Under Bust: ${measurements.underBust}
      Wrist: ${measurements.wrist}
      Upper Arm: ${measurements.upperArm}
      Calf/Ankle: ${measurements.calfAnkle}
      Nape to Waist: ${measurements.napeToWaist}
      Waist to Hip: ${measurements.waistToHip}
      Front Shoulder to Hip: ${measurements.frontShoulderToHip}
      Outside Leg: ${measurements.outsideLeg}
      Inside Leg: ${measurements.insideLeg}
    `;

    // First try react-native-email
    if (Email && typeof Email.email === 'function') {
      Email.email({
        subject: `Measurement Details for ${product.name}`,
        body: emailBody,
        to: ['admin@osh-med.pro'],
      }).catch(() => {
        // Fallback to mailto if react-native-email fails
        sendWithMailto(emailBody);
      });
    } else {
      // Fallback to mailto if Email module not available
      sendWithMailto(emailBody);
    }
  };

  const sendWithMailto = (emailBody) => {
    const subject = `Measurement Details for ${product.name}`;
    const recipient = 'admin@osh-med.pro';
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    Linking.openURL(mailtoUrl).catch(() => {
      Alert.alert('Error', 'No email clients available');
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: product.image }} 
        style={styles.productImage}
        resizeMode="cover"
      />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        <Text style={styles.descriptionTitle}>Description:</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Please fill the details below:</Text>
        
        {Object.entries({
          'Full Name': 'fullName',
          'Email': 'email',
          'Contact Number': 'contactNumber',
          'Bust': 'bust',
          'Waist': 'waist',
          'Hips': 'hips',
          'Back Width': 'backWidth',
          'Front Chest': 'frontChest',
          'Shoulder': 'shoulder',
          'Neck Size': 'neckSize',
          'Sleeve': 'sleeve',
          'Under Bust': 'underBust',
          'Wrist': 'wrist',
          'Upper Arm': 'upperArm',
          'Calf/Ankle': 'calfAnkle',
          'Nape to Waist': 'napeToWaist',
          'Waist to Hip': 'waistToHip',
          'Front Shoulder to Hip': 'frontShoulderToHip',
          'Outside Leg': 'outsideLeg',
          'Inside Leg': 'insideLeg'
        }).map(([label, key]) => (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
              style={styles.input}
              value={measurements[key]}
              onChangeText={(text) => handleInputChange(key, text)}
              placeholder={`Enter ${label}`}
              keyboardType={['contactNumber', 'bust', 'waist', 'hips'].includes(key) ? 'numeric' : 'default'}
            />
          </View>
        ))}

        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={sendMeasurementsEmail}
        >
          <Text style={styles.submitButtonText}>Submit Measurements</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6200ee',
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  submitButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;