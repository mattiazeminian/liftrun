import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import HeaderOnboarding from '../../components/headeronboarding';
import CustomRadio from '../../components/radio';
import Button from '../../components/button';

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';

import TrainIcon from '../../icons/trainicon';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export default function Onboarding_TypeofTraining() {
  const navigation = useNavigation();
  const route = useRoute();

  // Recupera uid da params
  const { uid } = route.params || {};

  const [selectedRadio, setSelectedRadio] = useState(null);

  async function handleNext() {
    if (!uid || selectedRadio === null) {
      // opzionale: gestisci errore o avviso
      return;
    }

    try {
      const trainingTypes = [
        'Gym workouts',
        'Running',
        'Both (mixed)',
        'Home / Bodyweight only',
      ];
      const selectedTrainingType = trainingTypes[selectedRadio];

      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        trainingType: selectedTrainingType,
      });

      // Naviga avanti, ad esempio verso schermata successiva
      navigation.navigate('Onboarding_Schedule', { uid });
    } catch (error) {
      // opzionale: gestione errore
      console.error('Errore aggiornando tipo di allenamento:', error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <HeaderOnboarding
          iconSource={<TrainIcon />}
          title="What type of training do you prefer?"
          description="So we focus on the type of training you enjoy."
        />
      </View>

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
        disabled={selectedRadio === null}
        onPress={handleNext}
      >
        NEXT
      </Button>
    </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioContainer: {
    gap: Spacing.m,
    width: '100%',
    flexDirection: 'column',
  },
});
