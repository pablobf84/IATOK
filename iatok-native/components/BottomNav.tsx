import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Home, PlusCircle, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';

/**
 * Bottom navigation bar for quickly accessing major sections of the app. Uses
 * Expo Router to navigate between screens when icons are pressed.
 */
export default function BottomNav() {
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#111',
      }}
    >
      <TouchableOpacity onPress={() => router.replace('/')}> 
        <Home size={28} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/create-ia')}> 
        <PlusCircle size={28} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/premium')}> 
        <User size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}