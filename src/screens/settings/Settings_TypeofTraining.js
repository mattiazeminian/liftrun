import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Navigation from '../../components/navigation';
import CustomRadio from '../../components/radio';
import Button from '../../components/button';

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';
import Typography from '../../variables/typography';

import ArrowLeftIcon from '../../icons/arrowleft';

export default function Settings_TypeofTraining() {
  const navigation = useNavigation();

  const [selectedRadio, setSelectedRadio] = useState(1); // Opzione selezionata iniziale
  const [modified, setModified] = useState(false);

  const options = [
    'Gym workouts',
    'Running',
    'Both (mixed)',
    'Home / Bodyweight only',
  ];

  useEffect(() => {
    setModified(selectedRadio !== 1); // abilita se cambiamo la selezione da default
  }, [selectedRadio]);

  return (
    <View style={styles.container}>
      <Navigation
        leftContent={<ArrowLeftIcon />}
        onLeftClick={() => navigation.goBack()}
        showCenter={true}
        centerContent={
          <Image
            source={require('../../assets/images/logo_text.png')}
            style={styles.logo}
          />
        }
      />

      <View style={styles.content}>
        <View style={styles.radioContainer}>
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Type of training</Text>
          </View>
          {options.map((label, index) => (
            <CustomRadio
              key={index}
              label={label}
              selected={selectedRadio === index}
              onChange={() => setSelectedRadio(index)}
              style={styles.radio}
            />
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            variant="primary"
            style={styles.button}
            disabled={!modified}
            onPress={() => {
              alert(`Selected goal: ${options[selectedRadio]}`);
            }}
          >
            SAVE CHANGES
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
  logo: {
    width: 270,
    height: 40,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hero: {
    marginBottom: Spacing.md,
  },
  heroTitle: {
    ...Typography.robotoSerif.mdRegular,
    color: Colors.darkBlue,
  },
  radioContainer: {
    gap: Spacing.md,
    width: '100%',
    flexDirection: 'column',
  },
  radio: {
    // personalizzazioni stile radio se necessarie
  },
  buttonsContainer: {
    width: '100%',
    marginTop: Spacing.xl,
  },
  button: {
    width: '100%',
  },
});
