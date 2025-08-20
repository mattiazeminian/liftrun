import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import Colors from '../variables/colors';
import Spacing from '../variables/spacing';
import Typography from '../variables/typography';

import Navigation from '../components/navigation';
import SettingsItem from '../components/settingsitem';
import Button from '../components/button';

import ArrowLeftIcon from '../icons/arrowleft';
import IdIcon from '../icons/idicon';
import CalendarIcon from '../icons/calendaricon';
import TrainIcon from '../icons/trainicon';
import EquipmentIcon from '../icons/equipmenticon';
import FitnessLevelIcon from '../icons/fitnesslevelicon';
import AwardIcon from '../icons/awardicon';

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

      {/* Contenuto fisso senza scroll */}
      <View style={styles.content}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Hi [user name]!</Text>
          <Text style={styles.heroDescription}>
            You started this plan on 17/05/2024
          </Text>
          <Text style={styles.heroDescription}>That was 234 days ago</Text>
        </View>

        {/* Container item allineati a sinistra */}
        <View style={styles.itemsContainer}>
          <SettingsItem
            label="Personal data"
            icon={<IdIcon />}
            onPress={() => navigation.navigate('PersonalDataSettings')}
          />
          <SettingsItem
            label="Fitness goal"
            icon={<AwardIcon />}
            onPress={() => navigation.navigate('FitnessGoalSettings')}
          />
          <SettingsItem
            label="Type of training"
            icon={<TrainIcon />}
            onPress={() => navigation.navigate('TypeofTrainingSettings')}
          />
          <SettingsItem
            label="Schedule"
            icon={<CalendarIcon />}
            onPress={() => console.log('Availability')}
          />
          <SettingsItem
            label="Equipment"
            icon={<EquipmentIcon />}
            onPress={() => navigation.navigate('EquipmentSettings')}
          />
          <SettingsItem
            label="Fitness level"
            icon={<FitnessLevelIcon />}
            onPress={() => navigation.navigate('FitnessLevelSettings')}
          />
        </View>

        {/* Bottone in fondo */}
        <View style={styles.buttonContainer}>
          <Button
            variant="primary"
            style={styles.button}
            onPress={() => console.log('Save / Continue')}
          >
            Create a new plan 🚀{' '}
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hero: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: Spacing.m,
    width: '100%',
    paddingBottom: Spacing.xxl,
  },
  heroTitle: {
    color: Colors.darkBlue,
    ...Typography.robotoSerif.mdRegular,
  },
  heroDescription: {
    color: Colors.darkBlue,
    textAlign: 'left',
    ...Typography.manrope.smRegular,
  },
  itemsContainer: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: Spacing.xl,
  },
  button: {
    width: '100%',
  },
});
