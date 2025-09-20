import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, TabParamList, Scenario } from '../../types';
import { Title, Body, Caption1 } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { Section } from '../../components/ui/Section';
import { palette, spacing } from '../../theme/colors';

type ScenarioPickerNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'ScenariosTab'>,
  StackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: ScenarioPickerNavigationProp;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bgLight,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  scenarioCard: {
    marginBottom: spacing.md,
  },
  scenarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  scenarioInfo: {
    marginBottom: spacing.md,
  },
  premiumPrompt: {
    backgroundColor: `${palette.warning}20`,
    padding: spacing.md,
    borderRadius: 8,
    marginTop: spacing.lg,
  },
});

const scenarios: Scenario[] = [
  {
    id: 'coffee-shop',
    title: 'Coffee Shop',
    description: 'Order your favorite drink and practice common cafe interactions',
    difficulty: 'beginner',
    category: 'Daily Life',
    estimatedDuration: 5,
    estimatedMinutes: 5,
    isPremium: false,
  },
  {
    id: 'job-interview',
    title: 'Job Interview',
    description: 'Practice professional conversation and interview skills',
    difficulty: 'intermediate',
    category: 'Professional',
    estimatedDuration: 10,
    estimatedMinutes: 10,
    isPremium: true,
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
    description: 'Make reservations, order food, and interact with waitstaff',
    difficulty: 'beginner',
    category: 'Dining',
    estimatedDuration: 8,
    estimatedMinutes: 8,
    isPremium: true,
  },
  {
    id: 'phone-call',
    title: 'Phone Call',
    description: 'Handle business calls and phone conversations confidently',
    difficulty: 'advanced',
    category: 'Professional',
    estimatedDuration: 12,
    estimatedMinutes: 12,
    isPremium: true,
  },
];

const ScenarioPicker: React.FC<Props> = ({ navigation }) => {
  const handleScenarioPress = (scenario: Scenario) => {
    if (scenario.isPremium) {
      navigation.navigate('Paywall');
    } else {
      navigation.navigate('Session', { scenarioId: scenario.id });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return palette.success;
      case 'Intermediate':
        return palette.warning;
      case 'Advanced':
        return palette.danger;
      default:
        return palette.textMuted;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.header}>
            <Title style={{ marginBottom: spacing.xs }}>Choose a Scenario</Title>
            <Caption1 color={palette.textMuted}>
              Practice real-world conversations
            </Caption1>
          </View>

          <Section>
            {scenarios.map((scenario) => (
              <TouchableOpacity
                key={scenario.id}
                onPress={() => handleScenarioPress(scenario)}
              >
                <Card style={styles.scenarioCard}>
                  <View style={styles.scenarioHeader}>
                    <Body style={{ fontWeight: '600' }}>{scenario.title}</Body>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                      <Chip variant="default">
                        <Caption1 color={getDifficultyColor(scenario.difficulty)}>
                          {scenario.difficulty}
                        </Caption1>
                      </Chip>
                      {scenario.isPremium && (
                        <Chip variant="warning">
                          <Caption1>Pro</Caption1>
                        </Chip>
                      )}
                    </View>
                  </View>

                  <View style={styles.scenarioInfo}>
                    <Body color={palette.textMuted} style={{ marginBottom: spacing.xs }}>
                      {scenario.description}
                    </Body>
                    <Caption1 color={palette.textMuted}>
                      ~{scenario.estimatedMinutes} minutes
                    </Caption1>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}

            <View style={styles.premiumPrompt}>
              <Body style={{ fontWeight: '600', marginBottom: spacing.xs }}>
                Unlock More Scenarios
              </Body>
              <Caption1 color={palette.textMuted}>
                Upgrade to Pro for access to advanced scenarios and unlimited practice sessions.
              </Caption1>
            </View>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScenarioPicker;