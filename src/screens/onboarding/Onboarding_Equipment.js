import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderOnboarding from '../../components/headeronboarding';
import CustomCheckbox from '../../components/checkbox';
import Button from '../../components/button';

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';

import EquipmentIcon from '../../icons/equipmenticon';

export default function Onboarding_Equipment() {
  const navigation = useNavigation();

  // Stati per 4 checkbox (array o singoli stati)
  const [checkboxes, setCheckboxes] = useState([false, false, false, false]);

  const toggleCheckbox = index => {
    setCheckboxes(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerText}>
          <HeaderOnboarding
            iconSource={<EquipmentIcon />}
            title="What equipment do you have access to?"
            description="We only include exercises you can actually do."
          />
        </View>

        {/* CHECKBOX GROUP */}
        <View style={styles.checkboxContainer}>
          {[
            'Gym',
            'Home equipment (e.g., dumbbells, bench)',
            'Bodyweight only',
            'Outdoors (e.g., for running)',
          ].map((label, index) => (
            <CustomCheckbox
              key={index}
              label={label}
              checked={checkboxes[index]}
              onChange={() => toggleCheckbox(index)}
              style={styles.checkbox}
            />
          ))}
        </View>
        <Button
          variant="primary"
          style={styles.button}
          disabled={!checkboxes.some(checked => checked === true)} // disabilitato se nessuna checkbox selezionata
          onPress={() => navigation.navigate('Onboarding_FitnessLevel')}
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
  checkboxContainer: {
    gap: Spacing.m,
    width: '100%', // fai in modo che il container occupi tutta la larghezza disponibile
    flexDirection: 'column',
  },
});
