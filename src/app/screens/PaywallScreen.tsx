// See PRD Section 4: Scope — MVP Features
// Premium subscription paywall screen

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import Button from '../components/Button';

type PaywallScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Paywall'
>;

interface Props {
  navigation: PaywallScreenNavigationProp;
}

const PaywallScreen: React.FC<Props> = ({ navigation }) => {
  const handleUpgradeToPremium = () => {
    // TODO: Integrate with in-app purchase system
    // TODO: Process payment
    // TODO: Update user subscription status
    console.log('Upgrading to premium...');
  };

  const handleRestorePurchases = () => {
    // TODO: Restore previous purchases
    console.log('Restoring purchases...');
  };

  const handleContinueFree = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🚀 Unlock Your Full Potential</Text>
        <Text style={styles.subtitle}>
          Upgrade to PronouncePal Premium and accelerate your English learning
        </Text>
      </View>

      {/* Features Comparison */}
      <View style={styles.comparisonContainer}>
        <View style={styles.planColumn}>
          <Text style={styles.planTitle}>Free</Text>
          <View style={styles.featureList}>
            <Text style={styles.feature}>✅ 3 basic scenarios</Text>
            <Text style={styles.feature}>✅ Basic pronunciation feedback</Text>
            <Text style={styles.feature}>❌ Limited practice sessions</Text>
            <Text style={styles.feature}>❌ No progress tracking</Text>
            <Text style={styles.feature}>❌ No custom drills</Text>
          </View>
        </View>

        <View style={[styles.planColumn, styles.premiumColumn]}>
          <Text style={[styles.planTitle, styles.premiumTitle]}>Premium</Text>
          <View style={styles.featureList}>
            <Text style={styles.premiumFeature}>✅ 50+ scenarios</Text>
            <Text style={styles.premiumFeature}>✅ Advanced AI feedback</Text>
            <Text style={styles.premiumFeature}>✅ Unlimited sessions</Text>
            <Text style={styles.premiumFeature}>✅ Detailed progress tracking</Text>
            <Text style={styles.premiumFeature}>✅ Personalized drills</Text>
            <Text style={styles.premiumFeature}>✅ Priority support</Text>
          </View>
        </View>
      </View>

      {/* Pricing */}
      <View style={styles.pricingContainer}>
        <View style={styles.priceCard}>
          <Text style={styles.priceAmount}>$9.99</Text>
          <Text style={styles.pricePeriod}>per month</Text>
          <Text style={styles.priceDescription}>
            Cancel anytime • 7-day free trial
          </Text>
        </View>
      </View>

      {/* Benefits */}
      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitsTitle}>Why upgrade?</Text>
        <View style={styles.benefit}>
          <Text style={styles.benefitIcon}>🎯</Text>
          <Text style={styles.benefitText}>
            Get targeted practice with scenarios tailored to your needs
          </Text>
        </View>
        <View style={styles.benefit}>
          <Text style={styles.benefitIcon}>📈</Text>
          <Text style={styles.benefitText}>
            Track your progress with detailed analytics and improvement insights
          </Text>
        </View>
        <View style={styles.benefit}>
          <Text style={styles.benefitIcon}>🤖</Text>
          <Text style={styles.benefitText}>
            Advanced AI provides more accurate and helpful pronunciation feedback
          </Text>
        </View>
        <View style={styles.benefit}>
          <Text style={styles.benefitIcon}>🔄</Text>
          <Text style={styles.benefitText}>
            Generate custom drills based on your specific pronunciation mistakes
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Button
          title="Start 7-Day Free Trial"
          onPress={handleUpgradeToPremium}
          style={styles.upgradeButton}
        />
        
        <TouchableOpacity
          style={styles.restoreButton}
          onPress={handleRestorePurchases}
        >
          <Text style={styles.restoreText}>Restore Purchases</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinueFree}
        >
          <Text style={styles.continueText}>Continue with Free Version</Text>
        </TouchableOpacity>
      </View>

      {/* Terms */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By subscribing, you agree to our Terms of Service and Privacy Policy.
          Subscription automatically renews unless cancelled at least 24 hours
          before the end of the current period.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#2563eb',
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#dbeafe',
    textAlign: 'center',
    lineHeight: 24,
  },
  comparisonContainer: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  planColumn: {
    flex: 1,
    padding: 16,
  },
  premiumColumn: {
    backgroundColor: '#fef3c7',
    borderLeftWidth: 1,
    borderLeftColor: '#f59e0b',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  premiumTitle: {
    color: '#92400e',
  },
  featureList: {
    gap: 8,
  },
  feature: {
    fontSize: 14,
    color: '#6b7280',
  },
  premiumFeature: {
    fontSize: 14,
    color: '#92400e',
    fontWeight: '500',
  },
  pricingContainer: {
    alignItems: 'center',
    margin: 16,
  },
  priceCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  priceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  pricePeriod: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  priceDescription: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  benefitsContainer: {
    margin: 16,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  benefitIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
  },
  upgradeButton: {
    backgroundColor: '#2563eb',
  },
  restoreButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  restoreText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '500',
  },
  continueButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  continueText: {
    fontSize: 14,
    color: '#6b7280',
  },
  termsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  termsText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default PaywallScreen;
