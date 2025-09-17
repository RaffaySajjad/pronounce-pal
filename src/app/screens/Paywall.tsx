import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { Title, Subtitle, Body, Caption } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ListItem } from '../../components/ui/ListItem';
import { gradients } from '../../lib/gradients';
import { palette, spacing } from '../../theme/colors';

type PaywallNavigationProp = StackNavigationProp<RootStackParamList, 'Paywall'>;

interface Props {
  navigation: PaywallNavigationProp;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bgLight,
  },
  gradient: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    alignItems: 'center',
  },
  heroIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  heroTitle: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  heroSubtitle: {
    textAlign: 'center',
    marginBottom: spacing.xl,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  planToggle: {
    flexDirection: 'row',
    backgroundColor: palette.surfaceLight,
    borderRadius: 12,
    padding: 4,
    marginBottom: spacing.xl,
  },
  planOption: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
  },
  planOptionActive: {
    backgroundColor: palette.primary,
  },
  benefitsList: {
    marginBottom: spacing.xl,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  benefitIcon: {
    marginRight: spacing.md,
    fontSize: 20,
  },
  ctaSection: {
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  button: {
    width: '100%',
  },
  footer: {
    alignItems: 'center',
    paddingTop: spacing.md,
  },
});

const Paywall: React.FC<Props> = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const handleSubscribe = () => {
    // Handle subscription logic
    console.log(`Subscribing to ${selectedPlan} plan`);
    navigation.goBack();
  };

  const handleRestore = () => {
    // Handle restore purchases
    console.log('Restoring purchases');
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const planDetails = {
    monthly: { price: '$9.99', period: 'month', savings: null },
    yearly: { price: '$59.99', period: 'year', savings: 'Save 50%' },
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Hero Section */}
        <LinearGradient
          colors={gradients.primary}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Body style={styles.heroIcon}>🚀</Body>
          
          <Title color={palette.textOnPrimary} style={styles.heroTitle}>
            Unlock Premium Features
          </Title>
          
          <Subtitle color={palette.textOnPrimary} style={styles.heroSubtitle}>
            Take your pronunciation to the next level
          </Subtitle>
        </LinearGradient>

        <View style={styles.content}>
          {/* Plan Toggle */}
          <View style={styles.planToggle}>
            <TouchableOpacity
              style={[styles.planOption, selectedPlan === 'monthly' && styles.planOptionActive]}
              onPress={() => setSelectedPlan('monthly')}
            >
              <Body color={selectedPlan === 'monthly' ? palette.textOnPrimary : palette.text}>
                Monthly
              </Body>
              <Caption color={selectedPlan === 'monthly' ? palette.textOnPrimary : palette.textMuted}>
                {planDetails.monthly.price}/{planDetails.monthly.period}
              </Caption>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.planOption, selectedPlan === 'yearly' && styles.planOptionActive]}
              onPress={() => setSelectedPlan('yearly')}
            >
              <Body color={selectedPlan === 'yearly' ? palette.textOnPrimary : palette.text}>
                Yearly
              </Body>
              <Caption color={selectedPlan === 'yearly' ? palette.textOnPrimary : palette.textMuted}>
                {planDetails.yearly.price}/{planDetails.yearly.period}
              </Caption>
              {planDetails.yearly.savings && (
                <Caption color={palette.success} style={{ fontWeight: '600' }}>
                  {planDetails.yearly.savings}
                </Caption>
              )}
            </TouchableOpacity>
          </View>

          {/* Benefits */}
          <Card style={styles.benefitsList}>
            <Body style={{ fontWeight: '600', marginBottom: spacing.lg }}>
              Premium Features:
            </Body>
            
            <View style={styles.benefitItem}>
              <Body style={styles.benefitIcon}>🎯</Body>
              <Body>Unlimited practice sessions</Body>
            </View>
            
            <View style={styles.benefitItem}>
              <Body style={styles.benefitIcon}>📊</Body>
              <Body>Advanced progress analytics</Body>
            </View>
            
            <View style={styles.benefitItem}>
              <Body style={styles.benefitIcon}>🎭</Body>
              <Body>Access to all scenarios</Body>
            </View>
            
            <View style={styles.benefitItem}>
              <Body style={styles.benefitIcon}>🤖</Body>
              <Body>Personalized AI coaching</Body>
            </View>
            
            <View style={styles.benefitItem}>
              <Body style={styles.benefitIcon}>📱</Body>
              <Body>Offline practice mode</Body>
            </View>
            
            <View style={styles.benefitItem}>
              <Body style={styles.benefitIcon}>🏆</Body>
              <Body>Achievement badges & rewards</Body>
            </View>
          </Card>

          {/* CTA Section */}
          <View style={styles.ctaSection}>
            <Button
              variant="primary"
              size="lg"
              onPress={handleSubscribe}
              style={styles.button}
            >
              Start Free Trial
            </Button>
            
            <Button
              variant="ghost"
              onPress={handleRestore}
              style={styles.button}
            >
              Restore Purchases
            </Button>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleClose}>
              <Caption color={palette.textMuted}>Maybe Later</Caption>
            </TouchableOpacity>
            
            <Caption color={palette.textMuted} style={{ textAlign: 'center', marginTop: spacing.md }}>
              7-day free trial, then {planDetails[selectedPlan].price} per {planDetails[selectedPlan].period}
            </Caption>
            
            <Caption color={palette.textMuted} style={{ textAlign: 'center', marginTop: spacing.xs }}>
              Cancel anytime
            </Caption>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Paywall;