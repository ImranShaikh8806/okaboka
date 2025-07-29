import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

const Header: React.FC = () => {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <View style={styles.logoContainer}>
            <Image 
              source={require("../../assets/images/okabokaLogo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.appName}>OkaBoka</Text>
        </View>
        
        <View style={styles.rightSection}>
          <View style={styles.bellContainer}>
            <Image 
              source={require("../../assets/images/bell.gif")}
              style={styles.bellImage}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.profileContainer}>
            <Image 
              source={require("../../assets/images/profile.jpg")}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      
      <View style={{backgroundColor: '#3DC4AB', }}>
        <View style={styles.whiteLine} />
      </View>
    </>
  );
};



const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3DC4AB', 
    paddingHorizontal: 15,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70, 
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoImage: {
    width: 32,
    height: 32,
  },
  appName: {
    color: 'black', 
    fontSize: 22,
    fontWeight: 'bold',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  bellImage: {
    width: 28,
    height: 28,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#666', 
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
whiteLine: {
  height: 1,
  backgroundColor: 'white',
  marginHorizontal: 8, 
},


});

export default Header;