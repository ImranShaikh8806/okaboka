import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  Alert,
  Animated,
  ScrollView
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';

type AboutYouScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AboutYou'>;

interface Props {
  navigation: AboutYouScreenNavigationProp;
}

const AboutYouScreen: React.FC<Props> = ({ navigation }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [customGender, setCustomGender] = useState('');
  const [location, setLocation] = useState('');
  
  
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    
    if (gender === 'Other') {
      
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        })
      ]).start();
    } else {
      
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        })
      ]).start(() => {
        setCustomGender('');
      });
    }
  };

  const handleContinue = () => {
   
    if (!day || !month || !year) {
      Alert.alert('Missing Information', 'Please enter your complete date of birth');
      return;
    }
    
    if (!selectedGender) {
      Alert.alert('Missing Information', 'Please select your gender');
      return;
    }
    
    if (selectedGender === 'Other' && !customGender.trim()) {
      Alert.alert('Missing Information', 'Please specify your gender');
      return;
    }
    
    if (!location.trim()) {
      Alert.alert('Missing Information', 'Please enter your location');
      return;
    }

    
    navigation.navigate('RelationWorkScreen'); 
  };

  const handleDayChange = (text: string) => {
    if (text.length <= 2 && /^\d*$/.test(text)) {
      setDay(text);
    }
  };

  const handleMonthChange = (text: string) => {
    if (text.length <= 2 && /^\d*$/.test(text)) {
      setMonth(text);
    }
  };

  const handleYearChange = (text: string) => {
    if (text.length <= 4 && /^\d*$/.test(text)) {
      setYear(text);
    }
  };

  const isFormValid = () => {
    const basicValid = day && month && year && selectedGender && location.trim();
    if (selectedGender === 'Other') {
      return basicValid && customGender.trim();
    }
    return basicValid;
  };

  const animatedHeight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3DC4AB" barStyle="dark-content" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>A little about you so we match better</Text>
        </View>

        {/* Date of Birth */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Date of Birth</Text>
          <View style={styles.dateRow}>
            <TextInput
              style={styles.dateInput}
              value={day}
              onChangeText={handleDayChange}
              placeholder="DD"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={2}
              textAlign="center"
            />
            <TextInput
              style={styles.dateInput}
              value={month}
              onChangeText={handleMonthChange}
              placeholder="MM"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={2}
              textAlign="center"
            />
            <TextInput
              style={styles.dateInput}
              value={year}
              onChangeText={handleYearChange}
              placeholder="YYYY"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={4}
              textAlign="center"
            />
          </View>
        </View>

        {/* Gender */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Gender</Text>
          <View style={styles.genderRow}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === 'Male' && styles.selectedGenderButton
              ]}
              onPress={() => handleGenderSelect('Male')}
            >
              <Text style={[
                styles.genderButtonText,
                selectedGender === 'Male' && styles.selectedGenderButtonText
              ]}>
                Male
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === 'Female' && styles.selectedGenderButton
              ]}
              onPress={() => handleGenderSelect('Female')}
            >
              <Text style={[
                styles.genderButtonText,
                selectedGender === 'Female' && styles.selectedGenderButtonText
              ]}>
                Female
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === 'Other' && styles.selectedGenderButton
              ]}
              onPress={() => handleGenderSelect('Other')}
            >
              <Text style={[
                styles.genderButtonText,
                selectedGender === 'Other' && styles.selectedGenderButtonText
              ]}>
                Other
              </Text>
            </TouchableOpacity>
          </View>
          
         
          <Animated.View style={[
            styles.customGenderContainer,
            {
              height: animatedHeight,
              opacity: opacityAnim,
            }
          ]}>
            <TextInput
              style={styles.customGenderInput}
              value={customGender}
              onChangeText={setCustomGender}
              placeholder="Write Here"
              placeholderTextColor="#999"
              autoCapitalize="words"
            />
          </Animated.View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Location (City,Country)</Text>
          <TextInput
            style={styles.locationInput}
            value={location}
            onChangeText={setLocation}
            placeholder=""
            placeholderTextColor="#999"
            autoCapitalize="words"
          />
          <TouchableOpacity style={styles.currentLocationButton}>
            <Text style={styles.currentLocationText}>📍 Use current location</Text>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              { opacity: isFormValid() ? 1 : 0.6 }
            ]} 
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
          
          <Text style={styles.footerText}>Who are you open to connecting with?</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3DC4AB',
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  titleSection: {
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 26,
  },
  section: {
    marginBottom: 25,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    flex: 0.3,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 0.31,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  selectedGenderButton: {
    backgroundColor: '#4a5568',
  },
  genderButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  selectedGenderButtonText: {
    color: '#ffffff',
  },
  customGenderContainer: {
    marginTop: 10,
    overflow: 'hidden',
  },
  customGenderInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  locationInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLocationText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  buttonSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: '#4a5568',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 60,
    marginBottom: 20,
    minWidth: 200,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  footerText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default AboutYouScreen;