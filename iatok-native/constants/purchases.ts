import Purchases from 'react-native-purchases';
import Constants from 'expo-constants';

/**
 * Configure the RevenueCat Purchases SDK. The API key should be stored in
 * your `.env` file under the name REVENUECAT_API_KEY or provided via the
 * Expo config extra field. This helper can optionally accept an appUserID
 * to identify the current user for subscription tracking.
 */
export async function configurePurchases(appUserID?: string) {
  const apiKey = (Constants.expoConfig?.extra as any)?.REVENUECAT_API_KEY || process.env.REVENUECAT_API_KEY || '';
  if (!apiKey) {
    console.warn('RevenueCat API key is not configured');
    return;
  }
  try {
    await Purchases.configure({ apiKey, appUserID });
  } catch (error) {
    console.error('Error configuring RevenueCat purchases', error);
  }
}