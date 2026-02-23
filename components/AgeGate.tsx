import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

interface AgeGateProps {
  onVerify: (birthdate: string) => void;
}

/**
 * AgeGate component prompts the user for their birth date and invokes the
 * provided callback with the entered date. This ensures compliance with
 * age-related regulations such as GDPR and DSA by verifying that the user
 * meets the minimum age requirement before accessing content.
 */
export default function AgeGate({ onVerify }: AgeGateProps) {
  const [birthdate, setBirthdate] = useState('');

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000cc',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ width: '80%', backgroundColor: '#111', padding: 20, borderRadius: 8 }}>
        <Text style={{ color: '#fff', fontSize: 18, marginBottom: 10 }}>
          Introduce tu fecha de nacimiento (AAAA-MM-DD)
        </Text>
        <TextInput
          value={birthdate}
          onChangeText={setBirthdate}
          placeholder="AAAA-MM-DD"
          placeholderTextColor="#888"
          style={{ color: '#fff', borderColor: '#444', borderWidth: 1, borderRadius: 4, padding: 8, marginBottom: 10 }}
        />
        <Button
          title="Verificar edad"
          onPress={() => {
            if (birthdate) {
              onVerify(birthdate);
            }
          }}
        />
      </View>
    </View>
  );
}