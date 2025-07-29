import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { width: screenWidth } = Dimensions.get('window');


const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState('Sad');
  
  const moods = [
    { name: 'Happy', emoji: '😊' },
    { name: 'Romantic', emoji: '😍' },
    { name: 'Sad', emoji: '😔' },
    { name: 'Neutral', emoji: '😐' },
    { name: 'Excited', emoji: '🤩' }
  ];

  return (
    <View style={styles.moodContainer}>
      <Text style={styles.moodTitle}>How I'm Feeling Right Now</Text>
      
      <View style={styles.moodSelector}>
        {/* Left Arrow */}
        <TouchableOpacity style={styles.arrow}>
          <Text style={styles.arrowText}>←</Text>
        </TouchableOpacity>
        
        {/* Mood Items */}
        <View style={styles.moodList}>
          {moods.map((mood, index) => {
            const isCenter = index === 2; 
            
            return (
              <TouchableOpacity
                key={mood.name}
                style={[
                  styles.moodItem,
                  isCenter && styles.centerMoodItem
                ]}
                onPress={() => setSelectedMood(mood.name)}
              >
                {/* Emoji */}
                <Text style={[
                  styles.emojiText,
                  isCenter && styles.centerEmojiText
                ]}>
                  {mood.emoji}
                </Text>
                
                {/* Mood Label */}
                <Text style={[
                  styles.moodLabel,
                  isCenter && styles.centerMoodLabel
                ]}>
                  {mood.name}
                </Text>
                
                
                {isCenter && (
                  <Text style={styles.moodCount}>👥 1.5k</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        
        {/* Right Arrow */}
        <TouchableOpacity style={styles.arrow}>
          <Text style={styles.arrowText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


interface MomentCardProps {
  date: string;
  location: string;
  description: string;
  images: string[];
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const MomentCard: React.FC<MomentCardProps> = ({
  date,
  location,
  description,
  images,
  isExpanded,
  onToggleExpand
}) => {
  const displayImages = isExpanded ? images : images.slice(0, 4);
  
  const renderImageGrid = () => {
    return (
      <View style={styles.imageGrid}>
        {displayImages.map((image, index) => {
         
          const isLastAndOdd = index === displayImages.length - 1 && displayImages.length % 2 === 1;
          
          if (isLastAndOdd) {
            return (
              <View key={index} style={styles.fullWidthImageContainer}>
                <Image 
                  source={{ uri: `file:///${image}` }} 
                  
                  style={styles.fullWidthImage}
                  resizeMode="cover"
                />
                {index === 2 && (
                  <View style={styles.bestMomentBadge}>
                    <Text style={styles.bestMomentText}>Best Moment Of The Day</Text>
                  </View>
                )}
              </View>
            );
          }
          
          return (
            <View key={index} style={styles.imageContainer}>
              <Image 
                source={{ uri: `file:///${image}` }} 
                
                style={styles.momentImage}
                resizeMode="cover"
              />
              {index === 2 && !isExpanded && (
                <View style={styles.bestMomentBadge}>
                  <Text style={styles.bestMomentText}>Best Moment Of The Day</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.momentCard}>
      <View style={styles.momentHeader}>
        <View style={styles.momentHeaderLeft}>
          <Text style={styles.momentDate}>{date}</Text>
          <Text style={styles.momentEmoji}>😊</Text>
        </View>
        <Text style={styles.moreIcon}>⋯</Text>
      </View>
      
      <View style={styles.locationContainer}>
        <Text style={styles.locationPin}>📍</Text>
        <Text style={styles.locationText}>{location}</Text>
      </View>
      
      <Text style={styles.momentDescription}>{description}</Text>
      
      {renderImageGrid()}
      
      {!isExpanded && images.length > 4 && (
        <TouchableOpacity style={styles.moreButton} onPress={onToggleExpand}>
          <Text style={styles.moreButtonText}>
            {images.length - 4} More Moments
          </Text>
        </TouchableOpacity>
      )}
      
      {isExpanded && (
        <TouchableOpacity style={styles.moreButton} onPress={onToggleExpand}>
          <Text style={styles.moreButtonText}>∧</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Homescreen 
const Homescreen: React.FC = () => {
  const [expandedMoments, setExpandedMoments] = useState<{[key: number]: boolean}>({});
  
  const moments = [
    {
      id: 1,
      date: 'July 07, 2025',
      location: 'Metro Manila, Philippines',
      description: 'You spent time outdoors — surrounded by trees, sunlight, and the quiet rhythm of the city.',
      images: ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png']
    },
    {
      id: 2,
      date: 'July 27, 2025',
      location: 'Bataan, Philippines',
      description: 'You spent time outdoors — surrounded by trees, sunlight, and the quiet rhythm of the city.',
      images: ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png']
    },
    {
      id: 3,
      date: 'July 27, 2025',
      location: 'Bataan, Philippines',
      description: 'You spent time by the shore — embraced by salty breeze, golden sand, and the gentle heartbeat of the sea.',
      images: ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png']
    }
  ];
  
  const toggleMomentExpansion = (momentId: number) => {
    setExpandedMoments(prev => ({
      ...prev,
      [momentId]: !prev[momentId]
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <MoodSelector />
        {moments.map((moment) => (
          <MomentCard
            key={moment.id}
            date={moment.date}
            location={moment.location}
            description={moment.description}
            images={moment.images}
            isExpanded={expandedMoments[moment.id] || false}
            onToggleExpand={() => toggleMomentExpansion(moment.id)}
          />
        ))}
      </ScrollView>
      
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  
  
  moodContainer: {
    backgroundColor: '#1DD1A1', // Teal color matching the screenshot
    paddingTop:10,
    
    marginBottom: 16,
  },
  moodTitle: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
moodSelector: {
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  paddingHorizontal: 8, 
},
 arrow: {
   
  paddingVertical: 16,
},
  arrowText: {
    color: '#000000',
    fontSize: 28,
    fontWeight: 'bold',
  },
moodList: {
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'space-between', 
  flex: 1,
  marginHorizontal: 4, 
},
 moodItem: {
  alignItems: 'center',
  marginHorizontal: 4, 
},
  centerMoodItem: {
    marginBottom: 16, 
  },
  emojiText: {
    fontSize: 32,
    marginBottom: 4,
  },
  centerEmojiText: {
    fontSize: 48, 
  },
  moodLabel: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  centerMoodLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  moodCount: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '500',
  },
  
  
  scrollView: {
    flex: 1,
  },
  
  
  momentCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  momentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  momentHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  momentDate: {
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
  },
  momentEmoji: {
    fontSize: 24,
  },
  moreIcon: {
    fontSize: 20,
    color: '#9ca3af',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationPin: {
    marginRight: 4,
  },
  locationText: {
    color: '#6b7280',
    fontSize: 14,
  },
  momentDescription: {
    color: '#374151',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  imageContainer: {
    width: '50%',
    paddingHorizontal: 4,
    marginBottom: 8,
    position: 'relative',
  },
  fullWidthImageContainer: {
    width: '100%',
    paddingHorizontal: 4,
    marginBottom: 8,
    position: 'relative',
  },
  momentImage: {
    width: '100%',
    height: 96,
    borderRadius: 8,
  },
  fullWidthImage: {
    width: '100%',
    height: 128,
    borderRadius: 8,
  },
  bestMomentBadge: {
    position: 'absolute',
    top: 8,
    right: 12,
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bestMomentText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
  },
  moreButton: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  moreButtonText: {
    color: '#14b8a6',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default Homescreen;