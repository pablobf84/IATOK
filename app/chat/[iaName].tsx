import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

/**
 * Chat screen for interacting with a specific AI. The IA name is obtained
 * from the dynamic route parameter. This simple implementation displays
 * the IA name but could be extended with message streaming and other
 * interactive features.
 */
export default function ChatScreen() {
  const { iaName } = useLocalSearchParams<{ iaName: string }>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat con {iaName}</Text>
      {/* TODO: Integrate streaming chat functionality here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});