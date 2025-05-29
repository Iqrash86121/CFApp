import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView, Linking, Clipboard } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { openComposer } from 'react-native-email-link';

const CoursesScreen = () => {
  const [courses] = useState([
    { 
      id: 1, 
      name: 'Free hand sewing and Cutting Techniques ', 
      price: 850, 
      description: 'Learn how to sew African print Shopping bags, matching bonnets and other accessories',
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop' 
    },
    { 
      id: 2, 
      name: 'Pattern and Garment construction', 
      price: 1500, 
      description: 'Development and style your own patterns and contract a garment.',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&auto=format&fit=crop' 
    },
    { 
      id: 3, 
      name: 'Modern Sewing Techniques', 
      price: 2500, 
      description: 'Select your own project you want us to work with you, own collections and build your unique style.',
      image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=500&auto=format&fit=crop' 
    },
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const toggleCourseSelection = (courseId) => {
    setSelectedCourse(prev => prev === courseId ? null : courseId);
  };

  const sendCourseInquiry = async () => {
    if (!selectedCourse) {
      Alert.alert('No Selection', 'Please select a course first');
      return;
    }

    const course = courses.find(c => c.id === selectedCourse);
    const recipient = 'charityfashionsales@gmail.com';
    const subject = `Inquiry About ${course.name} Course`;
    const body = `Dear Charity Fashion,\n\nI am interested in the following course:\n\n` +
                 `• Course Name: ${course.name}\n` +
                 `• Price: $${course.price.toFixed(2)}\n` +
                 `• Description: ${course.description}\n\n` +
                 `Please provide me with more information about enrollment.\n\n` +
                 `Best regards,\n[Your Name]`;

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
        Clipboard.setString(`To: ${recipient}\nSubject: ${subject}\n\n${body}`);
        Alert.alert(
          'Email Not Configured',
          'We have copied the email content to your clipboard. Please paste it into your email app.',
          [
            { text: 'OK', onPress: () => {} },
            { text: 'Open Mail App', onPress: () => Linking.openURL('mailto:') }
          ]
        );
      }
    }
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

      <Text style={styles.title}>Available Courses</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {courses.map(course => (
          <TouchableOpacity
            key={course.id}
            style={[
              styles.courseItem,
              selectedCourse === course.id && styles.selectedCourse
            ]}
            onPress={() => toggleCourseSelection(course.id)}
          >
            <Image 
              source={{ uri: course.image }} 
              style={styles.courseImage}
            />
            <View style={styles.courseDetails}>
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.coursePrice}>${course.price.toFixed(2)}</Text>
              <Text style={styles.courseDuration}>{course.duration}</Text>
              <Text style={styles.courseDescription}>{course.description}</Text>
            </View>
            <Checkbox
              status={selectedCourse === course.id ? 'checked' : 'unchecked'}
              color="#ca9e07"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.selectionText}>
          {selectedCourse ? "1 course selected" : "Select a course"}
        </Text>
        <TouchableOpacity
          style={[
            styles.emailButton,
            !selectedCourse && styles.disabledButton
          ]}
          onPress={sendCourseInquiry}
          disabled={!selectedCourse}
        >
          <Text style={styles.emailButtonText}>Send Inquiry</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  scrollContent: {
    paddingBottom: 120,
    paddingHorizontal: 15,
  },
  courseItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  selectedCourse: {
    borderColor: '#ca9e07',
    borderWidth: 2,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  courseDetails: {
    flex: 1,
  },
  courseName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ca9e07',
    marginBottom: 5,
  },
  courseDuration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    padding: 15,
    alignItems: 'center',
  },
  selectionText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  emailButton: {
    backgroundColor: '#ca9e07',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#999',
  },
  emailButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CoursesScreen;