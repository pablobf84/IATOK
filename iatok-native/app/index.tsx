import { useState, useEffect } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoCard from '../components/VideoCard';
import AgeGate from '../components/AgeGate';
import PremiumModal from '../components/PremiumModal';
import { supabase } from '../constants/supabase';

/**
 * Main feed screen. Displays a vertical list of video posts similar to TikTok.
 * Includes an age verification gate, premium modal trigger and simple state
 * management for demonstration purposes. The "posts" array should be
 * populated with realistic data such as video URLs and captions.
 */
export default function Feed() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [isMinor, setIsMinor] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  // TODO: Replace placeholder posts with real data fetched from your backend
  const [posts] = useState([
    {
      id: '1',
      ia_name: 'cyberpunk_ai_1',
      caption: 'Sumérgete en el futuro con este avatar de IA.',
      video_url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: '2',
      ia_name: 'cyberpunk_ai_2',
      caption: 'Explorando las calles neon de la ciudad.',
      video_url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: '3',
      ia_name: 'cyberpunk_ai_3',
      caption: 'Un vistazo al mañana.',
      video_url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: '4',
      ia_name: 'cyberpunk_ai_4',
      caption: 'Inspiración cyberpunk para tu creatividad.',
      video_url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
  ]);

  useEffect(() => {
    // Retrieve the age verification flag from AsyncStorage on mount. This ensures
    // that the user does not have to re-enter their birthdate every time the
    // application restarts.
    const fetchAgeVerification = async () => {
      try {
        const verified = await AsyncStorage.getItem('ageVerified');
        if (verified) setAgeVerified(true);
      } catch (err) {
        console.warn('Failed to load age verification status', err);
      }
    };
    fetchAgeVerification();
  }, []);

  const handleAgeVerify = (birthdate: string) => {
    const age = new Date().getFullYear() - new Date(birthdate).getFullYear();
    setAgeVerified(true);
    setIsMinor(age < 16);
    // Persist verification status using AsyncStorage and send to backend
    AsyncStorage.setItem('ageVerified', 'true').catch((err) => {
      console.warn('Failed to persist age verification status', err);
    });

    // Store the user's birthdate and age classification in Supabase for
    // compliance logging. You would typically associate this with an
    // authenticated user ID; here we use an anonymous ID stored in AsyncStorage
    // for demonstration. Ignore any errors silently to avoid blocking the UI.
    (async () => {
      try {
        const anonymousId = await AsyncStorage.getItem('anonymousId');
        const { data, error } = await supabase.from('age_verifications').upsert({
          id: anonymousId ?? undefined,
          birthdate,
          is_minor: age < 16,
          verified_at: new Date().toISOString(),
        });
        if (error) {
          console.warn('Supabase upsert error', error);
        }
      } catch (err) {
        console.warn('Error logging age verification to Supabase', err);
      }
    })();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {!ageVerified && <AgeGate onVerify={handleAgeVerify} />}
      {showPremium && <PremiumModal onClose={() => setShowPremium(false)} />}

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard
            post={item}
            isMinor={isMinor}
            onOpenPremium={() => setShowPremium(true)}
          />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height}
        decelerationRate="fast"
      />
    </View>
  );
}