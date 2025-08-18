import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import HeaderOnboarding from '../../components/headeronboarding';
import CustomRadio from '../../components/radio';
import Button from '../../components/button';

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';

import FitnessLevelIcon from '../../icons/fitnesslevelicon';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export default function Onboarding_FitnessLevel() {
  const navigation = useNavigation();
  const route = useRoute();

  // Recupera uid passato da schermo precedente
  const { uid } = route.params || {};

  const [selectedRadio, setSelectedRadio] = useState(null);

  async function handleNext() {
    if (!uid || selectedRadio === null) {
      return;
    }

    try {
      const fitnessLevels = ['Beginner', 'Intermediate', 'Advanced'];
      const selectedLevel = fitnessLevels[selectedRadio];

      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        fitnessLevel: selectedLevel,
      });

      navigation.navigate('Onboarding_PersonalData', { uid });
    } catch {
      // gestione errore opzionale
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <HeaderOnboarding
          iconSource={<FitnessLevelIcon />}
          title="What’s your current fitness level?"
          description="To match the plan to your current level."
        />
      </View>

      <View style={styles.radioContainer}>
        {['Beginner', 'Intermediate', 'Advanced'].map((label, index) => (
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
