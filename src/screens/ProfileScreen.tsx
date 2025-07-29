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

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [fullName, setFullName] = useState('');

  const handleContinue = () => {
    if (fullName.trim().length >= 2) {
      
      navigation.navigate('AboutYouScreen'); 
    } else {
      Alert.alert('Invalid Name', 'Please enter your full name');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3DC4AB" barStyle="dark-content" />
      
      {/* Profile */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/images/profile.jpg')}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>
        
        <Text style={styles.title}>What should we call you?</Text>
      </View>

      {/* Input */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput
          style={styles.nameInput}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Your Name"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
        />
        
        <TouchableOpacity 
          style={[
            styles.continueButton,
            { opacity: fullName.trim().length >= 2 ? 1 : 0.6 }
          ]} 
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Lets Get To Know You</Text>
        </TouchableOpacity>
        
        <Text style={styles.privacyText}>Your safety is our priority.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3DC4AB',
    paddingHorizontal: 30,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 80,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 40,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  inputSection: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
  nameInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  continueButton: {
    backgroundColor: '#4a5568',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignSelf: 'center',
    marginBottom: 20,
    minWidth: 200,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  privacyText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
});

export default ProfileScreen;