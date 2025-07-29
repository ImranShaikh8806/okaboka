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

type RelationWorkScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RelationWork'>;

interface Props {
  navigation: RelationWorkScreenNavigationProp;
}

const RelationWorkScreen: React.FC<Props> = ({ navigation }) => {
  const [interestedIn, setInterestedIn] = useState('');
  const [relationshipStatus, setRelationshipStatus] = useState('');
  const [profession, setProfession] = useState('');
  
  // Student 
  const [schoolName, setSchoolName] = useState('');
  const [studyingIn, setStudyingIn] = useState('');
  
  // Employee
  const [companyName, setCompanyName] = useState('');
  const [jobRole, setJobRole] = useState('');
  
  // Freelancer/Other
  const [workDescription, setWorkDescription] = useState('');
  
  
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const handleProfessionSelect = (selectedProfession: string) => {
    setProfession(selectedProfession);
    
    
    setSchoolName('');
    setStudyingIn('');
    setCompanyName('');
    setJobRole('');
    setWorkDescription('');
    
    if (selectedProfession !== '') {
      
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
      ]).start();
    }
  };

  const handleContinue = () => {
    // Basic validation
    if (!interestedIn || !relationshipStatus || !profession) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    
    if (profession === 'Student' && (!schoolName.trim() || !studyingIn.trim())) {
      Alert.alert('Missing Information', 'Please complete your student information');
      return;
    }
    
    if (profession === 'Employee' && (!companyName.trim() || !jobRole.trim())) {
      Alert.alert('Missing Information', 'Please complete your employment information');
      return;
    }
    
    if ((profession === 'Freelancer' || profession === 'Other') && !workDescription.trim()) {
      Alert.alert('Missing Information', 'Please describe your work');
      return;
    }

   
    navigation.navigate('HomeScreen');
  };

  const handleSkipForNow = () => {
    
    navigation.navigate('HomeScreen');
  };

  const renderProfessionInputs = () => {
    const animatedHeight = slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, profession === 'Student' ? 200 : profession === 'Employee' ? 200 : 120],
    });

    return (
      <Animated.View style={[
        styles.professionInputsContainer,
        {
          height: animatedHeight,
          opacity: opacityAnim,
        }
      ]}>
        {profession === 'Student' && (
          <>
            <Text style={styles.inputLabel}>What's your School/college name?</Text>
            <TextInput
              style={styles.textInput}
              value={schoolName}
              onChangeText={setSchoolName}
              placeholder=""
              placeholderTextColor="#999"
              autoCapitalize="words"
            />
            
            <Text style={styles.inputLabel}>Currently studying in?</Text>
            <TouchableOpacity style={styles.dropdownInput}>
              <TextInput
                style={styles.dropdownText}
                value={studyingIn}
                onChangeText={setStudyingIn}
                placeholder="Select or type..."
                placeholderTextColor="#999"
              />
              <Text style={styles.dropdownIcon}>⌄</Text>
            </TouchableOpacity>
          </>
        )}
        
        {profession === 'Employee' && (
          <>
            <TextInput
              style={styles.textInput}
              value={companyName}
              onChangeText={setCompanyName}
              placeholder="Company name"
              placeholderTextColor="#999"
              autoCapitalize="words"
            />
            
            <Text style={styles.inputLabel}>What's your role there?</Text>
            <TextInput
              style={styles.textInput}
              value={jobRole}
              onChangeText={setJobRole}
              placeholder=""
              placeholderTextColor="#999"
              autoCapitalize="words"
            />
          </>
        )}
        
        {(profession === 'Freelancer' || profession === 'Other') && (
          <>
            <Text style={styles.inputLabel}>What kind of work do you do?</Text>
            <TextInput
              style={[styles.textInput, ]}
              value={workDescription}
              onChangeText={setWorkDescription}
              placeholder=""
              placeholderTextColor="#999"
              autoCapitalize="sentences"
              multiline
              numberOfLines={3}
            />
          </>
        )}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3DC4AB" barStyle="dark-content" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        
        <View style={styles.titleSection}>
          <Text style={styles.title}>Let us understand who you're looking for and where you're at.</Text>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Interested In <Text style={styles.subText}>(Who's energy do you connect with?)</Text>
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                interestedIn === 'Male' && styles.selectedButton
              ]}
              onPress={() => setInterestedIn('Male')}
            >
              <Text style={[
                styles.optionButtonText,
                interestedIn === 'Male' && styles.selectedButtonText
              ]}>
                Male
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.optionButton,
                interestedIn === 'Female' && styles.selectedButton
              ]}
              onPress={() => setInterestedIn('Female')}
            >
              <Text style={[
                styles.optionButtonText,
                interestedIn === 'Female' && styles.selectedButtonText
              ]}>
                Female
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.optionButton,
                interestedIn === 'Other' && styles.selectedButton
              ]}
              onPress={() => setInterestedIn('Other')}
            >
              <Text style={[
                styles.optionButtonText,
                interestedIn === 'Other' && styles.selectedButtonText
              ]}>
                Other
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Relationship Status</Text>
          <View style={styles.relationshipRow}>
            <TouchableOpacity
              style={[
                styles.relationshipButton,
                relationshipStatus === 'Single' && styles.selectedButton
              ]}
              onPress={() => setRelationshipStatus('Single')}
            >
              <Text style={[
                styles.optionButtonText,
                relationshipStatus === 'Single' && styles.selectedButtonText
              ]}>
                Single
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.relationshipButton,
                relationshipStatus === 'In A Relationship' && styles.selectedButton
              ]}
              onPress={() => setRelationshipStatus('In A Relationship')}
            >
              <Text style={[
                styles.optionButtonText,
                relationshipStatus === 'In A Relationship' && styles.selectedButtonText
              ]}>
                In A Relationship
              </Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={[
              styles.preferNotToSayButton,
              relationshipStatus === 'Prefer Not To Say' && styles.selectedButton
            ]}
            onPress={() => setRelationshipStatus('Prefer Not To Say')}
          >
            <Text style={[
              styles.optionButtonText,
              relationshipStatus === 'Prefer Not To Say' && styles.selectedButtonText
            ]}>
              Prefer Not To Say
            </Text>
          </TouchableOpacity>
        </View>

        {/* Are You */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Are You</Text>
          <View style={styles.professionRow}>
            <TouchableOpacity
              style={[
                styles.professionButton,
                profession === 'Student' && styles.selectedButton
              ]}
              onPress={() => handleProfessionSelect('Student')}
            >
              <Text style={[
                styles.optionButtonText,
                profession === 'Student' && styles.selectedButtonText
              ]}>
                Student
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.professionButton,
                profession === 'Employee' && styles.selectedButton
              ]}
              onPress={() => handleProfessionSelect('Employee')}
            >
              <Text style={[
                styles.optionButtonText,
                profession === 'Employee' && styles.selectedButtonText
              ]}>
                Employee
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.professionRow}>
            <TouchableOpacity
              style={[
                styles.professionButton,
                profession === 'Freelancer' && styles.selectedButton
              ]}
              onPress={() => handleProfessionSelect('Freelancer')}
            >
              <Text style={[
                styles.optionButtonText,
                profession === 'Freelancer' && styles.selectedButtonText
              ]}>
                Freelancer
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.professionButton,
                profession === 'Other' && styles.selectedButton
              ]}
              onPress={() => handleProfessionSelect('Other')}
            >
              <Text style={[
                styles.optionButtonText,
                profession === 'Other' && styles.selectedButtonText
              ]}>
                Other
              </Text>
            </TouchableOpacity>
          </View>
          
          
          {renderProfessionInputs()}
        </View>

       
        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={styles.continueButton} 
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
          
          <Text style={styles.vibeText}>Your very first vibe</Text>
          
          <TouchableOpacity onPress={handleSkipForNow}>
            <Text style={styles.skipText}>Skip For Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3DC4AB',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    marginBottom: 25,
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
  subText: {
    fontSize: 14,
    fontWeight: '400',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
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
  selectedButton: {
    backgroundColor: '#4a5568',
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  selectedButtonText: {
    color: '#ffffff',
  },
  relationshipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  relationshipButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 0.48,
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
  preferNotToSayButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    width: '48%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  professionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  professionButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 0.48,
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
  professionInputsContainer: {
    marginTop: 10,
    overflow: 'hidden',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    marginTop: 10,
  },
  textInput: {
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
    minHeight: 50,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  dropdownInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    height: 50,
  },
  dropdownText: {
    fontSize: 16,
    flex: 1,
    color: '#000000',
  },
  dropdownIcon: {
    fontSize: 18,
    color: '#666',
  },
  bottomSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  continueButton: {
    backgroundColor: '#4a5568',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 60,
    marginBottom: 15,
    minWidth: 200,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  vibeText: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 15,
    fontWeight: '500',
  },
  skipText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default RelationWorkScreen;