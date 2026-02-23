import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Screen for creating a new AI avatar. This is a placeholder implementation
 * that can be extended to include form inputs, avatar customization and
 * submission to a backend service.
 */
export default function CreateIA() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear IA (Próximamente)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});