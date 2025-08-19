import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import HeaderOnboarding from '../../components/headeronboarding';
import CustomRadio from '../../components/radio';
import Button from '../../components/button';

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';

import TrainIcon from '../../icons/trainicon';

export default function Onboarding_TypeofTraining() {
  const navigation = useNavigation();

  // Stato per gruppo radio (stringa / numero / valore univoco)
  const [selectedRadio, setSelectedRadio] = useState(null);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerText}>
          <HeaderOnboarding
            iconSource={<TrainIcon />}
            title="What type of training do you prefer?"
            description="So we focus on the type of training you enjoy."
          />
        </View>

        {/* CHECKBOX GROUP */}
        <View style={styles.radioContainer}>
          {[
            'Gym workouts',
            'Running',
            'Both (mixed)',
            'Home / Bodyweight only',
          ].map((label, index) => (
            <CustomRadio
              key={index}
              label={label}
              selected={selectedRadio === index}
              onChange={() => setSelectedRadio(index)}
              style={styles.radio}
            />
          ))}
        </View>
        <Button
          variant="primary"
          style={styles.button}
          disabled={selectedRadio === null} // disabilitato se nessuna radio selezionata
          onPress={() => navigation.navigate('Onboarding_Schedule')}
        >
          NEXT
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.md,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerText: {
    backgroundColor: Colors.white,
    justifyContent: 'center', // opzionale, centra verticalmente il contenuto
    alignItems: 'center', // centra orizzontalmente il contenuto
  },
  radioContainer: {
    gap: Spacing.m,
    width: '100%', // fai in modo che il container occupi tutta la larghezza disponibile
    flexDirection: 'column',
  },
});
