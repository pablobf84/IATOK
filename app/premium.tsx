import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Purchases, { Package, PurchasesOffering } from 'react-native-purchases';
import { configurePurchases } from '../constants/purchases';

/**
 * Dedicated premium page. Use this screen to inform users about premium
 * subscription options, perks and to trigger payment flows via Stripe
 * and RevenueCat integration.
 */
export default function PremiumPage() {
  const [offerings, setOfferings] = useState<PurchasesOffering | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Configure RevenueCat and fetch offerings on mount.
    const setupPurchases = async () => {
      await configurePurchases();
      try {
        const { current } = await Purchases.getOfferings();
        if (current) {
          setOfferings(current);
        }
      } catch (error) {
        console.warn('Error fetching offerings', error);
      } finally {
        setLoading(false);
      }
    };
    setupPurchases();
  }, []);

  const handlePurchase = async (pkg: Package) => {
    try {
      const purchaserInfo = await Purchases.purchasePackage(pkg);
      console.log('Purchase successful', purchaserInfo);
      // TODO: unlock premium features in your app after successful purchase
    } catch (error: any) {
      if (!error.userCancelled) {
        console.error('Purchase error', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sección Premium</Text>
      {loading ? (
        <Text style={styles.subtitle}>Cargando ofertas...</Text>
      ) : offerings && offerings.availablePackages.length > 0 ? (
        offerings.availablePackages.map((pkg) => (
          <TouchableOpacity
            key={pkg.identifier}
            style={styles.packageButton}
            onPress={() => handlePurchase(pkg)}
          >
            <Text style={styles.packageText}>{pkg.product.title}</Text>
            <Text style={styles.packagePrice}>{pkg.product.priceString}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.subtitle}>No hay ofertas disponibles.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
  },
  packageButton: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  packageText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  packagePrice: {
    color: '#bbb',
    fontSize: 16,
  },
});