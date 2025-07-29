import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions,StatusBar,  } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';

const { width, height } = Dimensions.get('window');

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    
    const timer = setTimeout(() => {
      navigation.replace('SignUp');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
         <StatusBar backgroundColor="#3DC4AB" barStyle="dark-content" />
     <View style={styles.content}>
  <View style={styles.logoContainer}>  
    <Image
      source={require('../../assets/images/okabokaLogo.png')}
      style={styles.logo}
      resizeMode="contain"
    />
  </View>
  <Text style={styles.title}>OkaBoka</Text>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3DC4AB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 140,
    height: 140,
  },
  title: {
    fontSize: 32,
    fontWeight: 900,
    color: '#000000',
    textAlign: 'center',
  },
});

export default SplashScreen;