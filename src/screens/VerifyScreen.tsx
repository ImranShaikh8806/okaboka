import React, { useState, useRef, useEffect } from 'react';
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

const VerifyScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(4);
  const inputRefs = useRef([]);

  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (value, index) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length === 4) {
      
      navigation.navigate('ProfileScreen'); 
    } else {
      Alert.alert('Invalid Code', 'Please enter a 4-digit verification code');
    }
  };

  const handleResend = () => {
    if (countdown === 0) {
      
      setCountdown(4);
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
      Alert.alert('Code Sent', 'A new verification code has been sent to your phone');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3DC4AB" barStyle="dark-content" />
      
      {/* Logo  */}
      <View style={styles.logoSection}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/okabokaLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Title  */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Verify your number</Text>
        <Text style={styles.subtitle}>We've sent a code to your phone</Text>
      </View>

      {/* OTP Input  */}
      <View style={styles.otpSection}>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>
      </View>

      {/* Verify Button */}
      <View style={styles.buttonSection}>
        <TouchableOpacity 
          style={[
            styles.verifyButton,
            { opacity: otp.join('').length === 4 ? 1 : 0.6 }
          ]} 
          onPress={handleVerify}
        >
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>

      {/* Resend  */}
      <View style={styles.resendSection}>
        <Text style={styles.resendText}>Didn't receive code? </Text>
        <TouchableOpacity onPress={handleResend} disabled={countdown > 0}>
          <Text style={[
            styles.resendLink,
            { opacity: countdown > 0 ? 0.6 : 1 }
          ]}>
            Resend
          </Text>
        </TouchableOpacity>
        {countdown > 0 && (
          <Text style={styles.countdownText}>
            You can request a new code in {countdown} seconds
          </Text>
        )}
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
  logoSection: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 60,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
  },
  otpSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  otpInput: {
    width: 50,
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  verifyButton: {
    backgroundColor: '#4a5568',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 80,
    alignItems: 'center',
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  resendSection: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
    color: '#000000',
  },
  resendLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
  countdownText: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
  },
});

export default VerifyScreen;