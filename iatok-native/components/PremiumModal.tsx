import React from 'react';
import { View, Text, Modal, Button } from 'react-native';

interface PremiumModalProps {
  onClose: () => void;
}

/**
 * PremiumModal presents a simple modal overlay prompting the user to subscribe
 * or purchase premium content. This component can be extended to integrate
 * with payment providers such as RevenueCat and Stripe.
 */
export default function PremiumModal({ onClose }: PremiumModalProps) {
  return (
    <Modal transparent animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000099',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ backgroundColor: '#111', padding: 20, borderRadius: 8, width: '80%' }}>
          <Text style={{ color: '#fff', fontSize: 20, marginBottom: 10 }}>
            Contenido Premium
          </Text>
          <Text style={{ color: '#aaa', fontSize: 16, marginBottom: 20 }}>
            Para acceder a funciones exclusivas, suscríbete o utiliza tokens.
          </Text>
          <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}