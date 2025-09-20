import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { LargeTitle, Title1, Title3, Body, Callout } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Icon } from '../../components/ui/Icon';
import { gradients } from '../../lib/gradients';
import { palette, spacing, radius } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

type OnboardingWelcomeNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[6],
  },

  // Header section
  header: {
    paddingTop: spacing[16],
    paddingBottom: spacing[8],
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: radius['3xl'],
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[8],
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: radius['2xl'],
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Hero section
  hero: {
    flex: 1,
    paddingVertical: spacing[8],
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.9,
  },

  // Features section
  features: {
    marginTop: spacing[8],
    marginBottom: spacing[10],
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing[4],
  },
  featureCard: {
    width: (width - spacing[6] * 2 - spacing[4]) / 2,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: radius['2xl'],
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  featureText: {
    textAlign: 'center',
    opacity: 0.9,
  },

  // CTA section
  ctaSection: {
    paddingBottom: spacing[8],
    paddingHorizontal: spacing[4],
  },
  ctaCard: {
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  micTestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  micIcon: {
    marginRight: spacing[2],
  },
  buttonContainer: {
    gap: spacing[3],
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
  },

  // Animated elements
  animatedElement: {
    opacity: 0,
  },
});

const OnboardingWelcome: React.FC<Props> = ({ navigation }) => {
  // Animation values
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const featuresOpacity = useSharedValue(0);
  const featuresTranslateY = useSharedValue(40);
  const ctaOpacity = useSharedValue(0);
  const ctaTranslateY = useSharedValue(50);

  useEffect(() => {
    // Staggered animations for a premium feel
    logoScale.value = withDelay(200, withSpring(1, { damping: 20, stiffness: 100 }));
    logoOpacity.value = withDelay(200, withSpring(1));

    titleOpacity.value = withDelay(600, withSpring(1));
    titleTranslateY.value = withDelay(600, withSpring(0));

    featuresOpacity.value = withDelay(1000, withSpring(1));
    featuresTranslateY.value = withDelay(1000, withSpring(0));

    ctaOpacity.value = withDelay(1400, withSpring(1));
    ctaTranslateY.value = withDelay(1400, withSpring(0));
  }, []);

  // Animated styles
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const featuresAnimatedStyle = useAnimatedStyle(() => ({
    opacity: featuresOpacity.value,
    transform: [{ translateY: featuresTranslateY.value }],
  }));

  const ctaAnimatedStyle = useAnimatedStyle(() => ({
    opacity: ctaOpacity.value,
    transform: [{ translateY: ctaTranslateY.value }],
  }));

  const handleGetStarted = () => {
    navigation.navigate('Main');
  };

  const handleMicrophoneTest = () => {
    // TODO: Implement microphone test
    console.log('Microphone test');
  };

  const features = [
    {
      icon: 'target' as const,
      title: 'Real-time Feedback',
      description: 'Get instant pronunciation corrections',
    },
    {
      icon: 'brain' as const,
      title: 'AI Conversations',
      description: 'Practice with intelligent tutors',
    },
    {
      icon: 'trending-up' as const,
      title: 'Track Progress',
      description: 'Monitor your improvement',
    },
    {
      icon: 'users' as const,
      title: 'Real Scenarios',
      description: 'Practice everyday situations',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={gradients.hero}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Header with Logo */}
            <View style={styles.header}>
              <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)']}
                  style={styles.logoGradient}
                >
                  <Icon name="mic" size="3xl" color={palette.textOnPrimary} />
                </LinearGradient>
              </Animated.View>
            </View>

            {/* Hero Section */}
            <Animated.View style={[styles.hero, titleAnimatedStyle]}>
              <View style={styles.titleContainer}>
                <LargeTitle color={palette.textOnPrimary} style={styles.title}>
                  Welcome to
                </LargeTitle>
                <LargeTitle color={palette.textOnPrimary} style={styles.title} weight="bold">
                  PronouncePal
                </LargeTitle>
                <Title3 color={palette.textOnPrimary} style={styles.subtitle} weight="regular">
                  Master pronunciation through AI-powered conversations and real-time feedback
                </Title3>
              </View>
            </Animated.View>

            {/* Features Grid */}
            <Animated.View style={[styles.features, featuresAnimatedStyle]}>
              <View style={styles.featureGrid}>
                {features.map((feature, index) => (
                  <View key={index} style={styles.featureCard}>
                    <View style={styles.featureIconContainer}>
                      <Icon
                        name={feature.icon}
                        size="lg"
                        color={palette.textOnPrimary}
                      />
                    </View>
                    <Callout
                      color={palette.textOnPrimary}
                      weight="semibold"
                      style={[styles.featureText, { marginBottom: spacing[1] }]}
                    >
                      {feature.title}
                    </Callout>
                    <Body
                      color={palette.textOnPrimary}
                      style={styles.featureText}
                    >
                      {feature.description}
                    </Body>
                  </View>
                ))}
              </View>
            </Animated.View>

            {/* CTA Section */}
            <Animated.View style={[styles.ctaSection, ctaAnimatedStyle]}>
              <Card
                variant="glass"
                padding="lg"
                borderRadius="2xl"
                style={styles.ctaCard}
              >
                <View style={styles.micTestContainer}>
                  <Icon name="mic" size="md" color={palette.text} style={styles.micIcon} />
                  <Body color={palette.text} weight="medium">
                    Test your microphone before starting
                  </Body>
                </View>

                <View style={styles.buttonContainer}>
                  <Button
                    variant="primary"
                    size="lg"
                    icon="mic"
                    onPress={handleMicrophoneTest}
                    style={styles.primaryButton}
                  >
                    Test Microphone
                  </Button>

                  <Button
                    variant="glass"
                    size="lg"
                    icon="arrow-right"
                    iconPosition="right"
                    onPress={handleGetStarted}
                    style={styles.secondaryButton}
                  >
                    Get Started
                  </Button>
                </View>
              </Card>
            </Animated.View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default OnboardingWelcome;