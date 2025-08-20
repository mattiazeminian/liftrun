import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';

import Colors from '../variables/colors';
import Spacing from '../variables/spacing';

import Navigation from '../components/navigation';
import SettingsItem from '../components/settingsitem';
import Button from '../components/button';

import ArrowLeftIcon from '../icons/arrowleft';
import IdIcon from '../icons/idicon';
import CalendarIcon from '../icons/calendaricon';
import TrainIcon from '../icons/trainicon';
import EquipmentIcon from '../icons/equipmenticon';
import FitnessLevelIcon from '../icons/fitnesslevelicon';

export default function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Navigation */}
      <Navigation
        leftContent={<ArrowLeftIcon />}
        onLeftClick={() => navigation.goBack()}
        showCenter={true}
        centerContent={
          <Image
            source={require('../assets/images/logo_text.png')}
            style={{ width: 270, height: 40, resizeMode: 'contain' }}
          />
        }
      />

      {/* Contenuto scrollabile con bottone in fondo */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Hi [user name]!</Text>
          <Text style={styles.heroDescription}>
            You have been working out with this plan for 172 days.
          </Text>
        </View>

        {/* Items */}
        <SettingsItem
          label="Personal data"
          icon={<IdIcon />}
          onPress={() => console.log('Account')}
        />
        <SettingsItem
          label="Fitness level"
          icon={<FitnessLevelIcon />}
          onPress={() => console.log('Fitness Level')}
        />
        <SettingsItem
          label="Type of training"
          icon={<TrainIcon />}
          onPress={() => console.log('Type')}
        />
        <SettingsItem
          label="Schedule"
          icon={<CalendarIcon />}
          onPress={() => console.log('Availability')}
        />
        <SettingsItem
          label="Equipment"
          icon={<EquipmentIcon />}
          onPress={() => console.log('Equipment')}
        />
        <SettingsItem
          label="Fitness level"
          icon={<FitnessLevelIcon />}
          onPress={() => console.log('FitnessLevel')}
        />

        {/* Bottone in fondo */}
        <Button
          variant="primary"
          style={styles.button}
          onPress={() => console.log('Save / Continue')}
        >
          Create a new plan 🚀{' '}
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl, // spazio extra così il bottone respira
  },
  hero: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginBottom: Spacing.xxl,
  },
  heroTitle: {
    color: Colors.darkBlue,
    fontFamily: 'Roboto Serif',
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 32,
  },
  heroDescription: {
    color: Colors.darkBlue,
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm, // distacco dall'ultimo bordo
  },
});
