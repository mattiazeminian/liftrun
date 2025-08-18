import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import HeaderOnboarding from '../../components/headeronboarding';
import CustomRadio from '../../components/radio';
import Button from '../../components/button';

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';

import AwardIcon from '../../icons/awardicon';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export default function Onboarding_FitnessGoal() {
  const navigation = useNavigation();
  const route = useRoute();

  // Recupera uid passato da schermo precedente
  const { uid } = route.params || {};

  const [selectedRadio, setSelectedRadio] = useState(null);

  async function handleNext() {
    if (!uid) {
      return;
    }
    if (selectedRadio === null) {
      return;
    }

    try {
      const goals = [
        'Lose weight / Fat loss',
        'Build muscle',
        'Tone up & stay fit',
        'Improve endurance / Train for a race',
        'Maintain current shape',
      ];
      const fitnessGoal = goals[selectedRadio];

      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        fitnessGoal,
      });

      navigation.navigate('Onboarding_TypeofTraining', { uid });
    } catch {
      // Eventuale gestione errore
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <HeaderOnboarding
          iconSource={<AwardIcon />}
          title="What’s your primary fitness goal?"
          description="To build a plan that matches your fitness goal."
        />
      </View>

      <View style={styles.radioContainer}>
        {[
          'Lose weight / Fat loss',
          'Build muscle',
          'Tone up & stay fit',
          'Improve endurance / Train for a race',
          'Maintain current shape',
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
