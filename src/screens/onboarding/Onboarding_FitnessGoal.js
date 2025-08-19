import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderOnboarding from '../../components/headeronboarding';
import CustomRadio from '../../components/radio';
import Button from '../../components/button';

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';

import AwardIcon from '../../icons/awardicon';

export default function Onboarding_FitnessGoal() {
  const navigation = useNavigation();

  // Stato di esempio per progress (da 0 a 1)
  const [progress, setProgress] = React.useState(0.2);

  // Stato per gruppo radio (stringa / numero / valore univoco)
  const [selectedRadio, setSelectedRadio] = useState(null);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerText}>
          <HeaderOnboarding
            iconSource={<AwardIcon />}
            title="What’s your primary fitness goal?"
            description="To build a plan that matches your fitness goal."
          />
        </View>

        {/* CHECKBOX GROUP */}
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
          disabled={selectedRadio === null} // disabilitato se nessuna radio selezionata
          onPress={() => navigation.navigate('Onboarding_TypeofTraining')}
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
