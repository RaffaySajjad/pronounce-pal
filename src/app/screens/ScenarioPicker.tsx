import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, TabParamList, Scenario } from '../../types';
import { Title, Body, Caption } from '../../components/ui/Typography';
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
    difficulty: 'Beginner',
    estimatedMinutes: 5,
    isPremium: false,
  },
  {
    id: 'job-interview',
    title: 'Job Interview',
    description: 'Practice professional conversation and interview skills',
    difficulty: 'Intermediate',
    estimatedMinutes: 10,
    isPremium: true,
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
    description: 'Make reservations, order food, and interact with waitstaff',
    difficulty: 'Beginner',
    estimatedMinutes: 8,
    isPremium: true,
  },
  {
    id: 'phone-call',
    title: 'Phone Call',
    description: 'Handle business calls and phone conversations confidently',
    difficulty: 'Advanced',
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
            <Caption color={palette.textMuted}>
              Practice real-world conversations
            </Caption>
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
                        <Caption color={getDifficultyColor(scenario.difficulty)}>
                          {scenario.difficulty}
                        </Caption>
                      </Chip>
                      {scenario.isPremium && (
                        <Chip variant="warning">
                          <Caption>Pro</Caption>
                        </Chip>
                      )}
                    </View>
                  </View>

                  <View style={styles.scenarioInfo}>
                    <Body color={palette.textMuted} style={{ marginBottom: spacing.xs }}>
                      {scenario.description}
                    </Body>
                    <Caption color={palette.textMuted}>
                      ~{scenario.estimatedMinutes} minutes
                    </Caption>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}

            <View style={styles.premiumPrompt}>
              <Body style={{ fontWeight: '600', marginBottom: spacing.xs }}>
                Unlock More Scenarios
              </Body>
              <Caption color={palette.textMuted}>
                Upgrade to Pro for access to advanced scenarios and unlimited practice sessions.
              </Caption>
            </View>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScenarioPicker;