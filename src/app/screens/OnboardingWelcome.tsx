import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { Title, Subtitle, Body } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { gradients } from '../../lib/gradients';
import { palette, spacing } from '../../theme/colors';

type OnboardingWelcomeNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingWelcome'>;

interface Props {
  navigation: OnboardingWelcomeNavigationProp;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  heroSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  logo: {
    fontSize: 64,
    marginBottom: spacing.xl,
  },
  titleContainer: {
    marginBottom: spacing.md,
  },
  subtitleContainer: {
    marginBottom: spacing.xl,
  },
  features: {
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  featureIcon: {
    marginRight: spacing.md,
    fontSize: 20,
  },
  ctaContainer: {
    paddingTop: spacing.lg,
  },
  button: {
    width: '100%',
  },
});

const OnboardingWelcome: React.FC<Props> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('TabNavigator');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={gradients.primary}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.content}>
            <View style={styles.heroSection}>
              <Body style={styles.logo}>🗣️</Body>
              
              <Title color={palette.textOnPrimary} style={[styles.titleContainer, { textAlign: 'center' }]}>
                Welcome to PronouncePal
              </Title>
              
              <Subtitle color={palette.textOnPrimary} style={[styles.subtitleContainer, { textAlign: 'center', opacity: 0.9 }]}>
                Master pronunciation through AI-powered conversations
              </Subtitle>

              <View style={styles.features}>
                <View style={styles.featureItem}>
                  <Body style={[styles.featureIcon, { color: palette.textOnPrimary }]}>🎯</Body>
                  <Body color={palette.textOnPrimary}>Real-time pronunciation feedback</Body>
                </View>
                
                <View style={styles.featureItem}>
                  <Body style={[styles.featureIcon, { color: palette.textOnPrimary }]}>🤖</Body>
                  <Body color={palette.textOnPrimary}>AI conversation partners</Body>
                </View>
                
                <View style={styles.featureItem}>
                  <Body style={[styles.featureIcon, { color: palette.textOnPrimary }]}>📈</Body>
                  <Body color={palette.textOnPrimary}>Track your progress</Body>
                </View>
                
                <View style={styles.featureItem}>
                  <Body style={[styles.featureIcon, { color: palette.textOnPrimary }]}>🎭</Body>
                  <Body color={palette.textOnPrimary}>Practice real-world scenarios</Body>
                </View>
              </View>
            </View>

            <View style={styles.ctaContainer}>
              <Button
                variant="secondary"
                size="lg"
                onPress={handleGetStarted}
                style={styles.button}
              >
                Get Started
              </Button>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default OnboardingWelcome;