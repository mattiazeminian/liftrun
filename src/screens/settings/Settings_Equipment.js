import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Navigation from '../../components/navigation';
import CustomCheckbox from '../../components/checkbox';
import Button from '../../components/button';

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';
import Typography from '../../variables/typography';

import EquipmentIcon from '../../icons/equipmenticon';
import ArrowLeftIcon from '../../icons/arrowleft';

export default function Settings_Equipment() {
  const navigation = useNavigation();

  const initialCheckboxes = [true, false, false, false];
  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
  const [modified, setModified] = useState(false);

  const toggleCheckbox = (index) => {
    setCheckboxes((prev) => {
      const updated = [...prev];
      const selectedCount = prev.filter(Boolean).length;
      if (updated[index]) {
        if (selectedCount === 1) {
          // Non deselezionare l’unica opzione selezionata
          return prev;
        }
        updated[index] = false;
      } else {
        updated[index] = true;
      }
      return updated;
    });
  };

  useEffect(() => {
    const isModified = checkboxes.some((val, idx) => val !== initialCheckboxes[idx]);
    setModified(isModified);
  }, [checkboxes]);

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
        <View style={styles.checkboxContainer}>
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Equipment</Text>
          </View>
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

        <View style={styles.buttonsContainer}>
          <Button
            variant="primary"
            style={styles.button}
            disabled={!modified}
            onPress={() => {
              const selectedIndices = checkboxes
                .map((val, idx) => (val ? idx : -1))
                .filter(idx => idx !== -1);
              alert(`Selected equipment indices: ${selectedIndices.join(', ')}`);
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
    alignItems: 'flex-start',
  },
  hero: {
    paddingBottom: Spacing.xxl,
  },
  heroTitle: {
    ...Typography.robotoSerif.mdRegular,
    color: Colors.darkBlue,
  },
  checkboxContainer: {
    gap: Spacing.m,
    width: '100%',
    flexDirection: 'column',
  },
  checkbox: {
    // eventuali personalizzazioni checkbox
  },
  buttonsContainer: {
    width: '100%',
    marginTop: Spacing.xl,
  },
  button: {
    width: '100%',
  },
});
