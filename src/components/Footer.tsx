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
    <View style={styles.footer}>
      <TouchableOpacity 
        style={styles.tabItem}
        onPress={() => handleTabPress('Oka')}
      >
        <View style={styles.okaTab}>
          <Text style={styles.okaTabText}>O</Text>
        </View>
        <Text style={styles.tabLabel}>Oka (You)</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabItem}
        onPress={() => handleTabPress('Bond')}
      >
        <View style={styles.bondTab}>
          <Text style={styles.bondTabText}>B</Text>
        </View>
        <Text style={styles.tabLabel}>Bond</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabItem}
        onPress={() => handleTabPress('OkaPlus')}
      >
        <View style={styles.okaPlusTab}>
          <Text style={styles.plusIcon}>+</Text>
        </View>
        <Text style={styles.tabLabel}>Oka's</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#14b8a6',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
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
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  okaPlusTab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0d9488',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  plusIcon: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabLabel: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Footer;