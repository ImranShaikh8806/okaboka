import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Footer: React.FC = () => {
  const handleTabPress = (tab: string) => {
    console.log(`${tab} tab pressed`);
  };

  return (
    <View style={styles.container}>
      {/* Floating Plus Button */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => handleTabPress('OkaPlus')}
      >
        <View style={styles.floatingButtonInner}>
          <Text style={styles.plusIcon}>+</Text>
        </View>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('Oka')}
        >
         
          <Text style={styles.tabLabel}>Oka (You)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('Bond')}
        >
        
          <Text style={styles.tabLabel}>Bond</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('OkaPlus')}
        >
          <Text style={styles.tabLabel}>Oka's</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  footer: {
    backgroundColor: '#3DC4AB',
    paddingHorizontal: 16,
    
    paddingVertical:15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  okaTab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  okaTabText: {
    color: '#14b8a6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bondTab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6b7280',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  bondTabText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  invisibleTab: {
    width: 48,
    height: 48,
    marginBottom: 4,
  },
  floatingButton: {
    position: 'absolute',
    left: '50%',
    marginLeft: -30,
    top: -70,
    zIndex: 10,
    elevation: 10,
  },
  floatingButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  plusIcon: {
    color: '#14b8a6',
    fontSize: 28,
    fontWeight: 'bold',
  },
  tabLabel: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default Footer;