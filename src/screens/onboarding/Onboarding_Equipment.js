import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import HeaderOnboarding from '../../components/headeronboarding';
import CustomCheckbox from '../../components/checkbox';
import Button from '../../components/button';

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';

import EquipmentIcon from '../../icons/equipmenticon';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export default function Onboarding_Equipment() {
  const navigation = useNavigation();
  const route = useRoute();

  const { uid } = route.params || {};

  const [checkboxes, setCheckboxes] = useState([false, false, false, false]);

  const toggleCheckbox = index => {
    setCheckboxes(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  async function handleNext() {
    if (!uid) {
      Alert.alert(
        'Errore',
        'Utente non autenticato. Impossibile salvare i dati.',
      );
      return;
    }
    if (!checkboxes.some(c => c)) {
      Alert.alert('Errore', 'Seleziona almeno un’opzione per continuare.');
      return;
    }

    try {
      const equipmentOptions = [
        'Gym',
        'Home equipment (e.g., dumbbells, bench)',
        'Bodyweight only',
        'Outdoors (e.g., for running)',
      ];
      // Ottengo array con le etichette selezionate
      const selectedEquipment = equipmentOptions.filter(
        (_, i) => checkboxes[i],
      );

      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        equipment: selectedEquipment,
      });

      navigation.navigate('Onboarding_FitnessLevel', { uid });
    } catch (error) {
      Alert.alert(
        'Errore',
        'Non è stato possibile salvare le tue scelte. Riprova.',
      );
      console.error('Errore aggiornando equipaggiamento:', error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <HeaderOnboarding
          iconSource={<EquipmentIcon />}
          title="What equipment do you have access to?"
          description="We only include exercises you can actually do."
        />
      </View>

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
        disabled={!checkboxes.some(c => c)}
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
  checkboxContainer: {
    gap: Spacing.m,
    width: '100%',
    flexDirection: 'column',
  },
});
