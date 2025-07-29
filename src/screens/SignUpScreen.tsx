import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  Alert 
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

interface Props {
  navigation: SignUpScreenNavigationProp;
}

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendCode = () => {
    
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    
    if (cleanedNumber.length === 10) {
     
      navigation.navigate('Verify');
    } else {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number');
    }
  };

  const handleWhatsApp = () => {
    
    navigation.navigate('Verify');
  };

  const handlePhoneNumberChange = (text: string) => {
    
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 10) {
      setPhoneNumber(cleaned);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3DC4AB" barStyle="dark-content" />
      
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.welcomeTitle}>Welcome to okaBoka</Text>
        <Text style={styles.subtitle}>Connect with emotionally similar people</Text>
      </View>

      {/* Logo */}
      <View style={styles.logoSection}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/okabokaLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Description */}
      <View style={styles.descriptionSection}>
        <Text style={styles.description}>
          Let's start with your number your world begins here.
        </Text>
      </View>

      {/* Input */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Phone Number</Text>
        <TextInput
          style={styles.phoneInput}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          placeholder="Enter 10-digit phone number"
          keyboardType="phone-pad"
          placeholderTextColor="#999"
          maxLength={10}
        />
        
        <Text style={styles.orText}>or</Text>
        
        <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
          <Text style={styles.whatsappButtonText}>Continue With Whatsapp</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.sendCodeButton,
            { opacity: phoneNumber.length === 10 ? 1 : 0.6 }
          ]} 
          onPress={handleSendCode}
        >
          <Text style={styles.sendCodeButtonText}>Send Me The Code</Text>
        </TouchableOpacity>
        
        <Text style={styles.privacyText}>We'll never share your number</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3DC4AB',
    paddingHorizontal: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    fontWeight: '500',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
  },
  descriptionSection: {
    alignItems: 'center',
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '600',
  },
  inputSection: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  phoneInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
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
  orText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
  },
  whatsappButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  whatsappButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  sendCodeButton: {
    backgroundColor: '#4a5568',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24, 
    alignSelf: 'center',   
    marginBottom: 15,
    width: 200,            
    justifyContent: 'center', 
    alignItems: 'center',     
  },
  sendCodeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  privacyText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000000',
    marginBottom: 20,
  },
});

export default SignUpScreen;