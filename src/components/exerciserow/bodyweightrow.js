import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';
import Borders from '../../variables/borders';
import Typography from '../../variables/typography';

import PickerInput from './pickerinput_clean';

// Haptic feedback configuration
const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const CHECKBOX_SIZE = 16; // Size of the checkbox square
const DOT_SIZE = 8; // Size of the inner dot when checked

export default function BodyweightRow({
  initialNumber = '10', // Default initial value
  disabled = false, // Disable interactions
  showText = true, // Control showing unit text (not used here, but kept for consistency)
}) {
  const [checked, setChecked] = useState(false); // Checkbox state
  const [value1, setValue1] = useState(initialNumber); // Minutes input

  // Toggle checkbox state with haptic feedback
  const handleCheckboxPress = () => {
    if (!disabled) {
      ReactNativeHapticFeedback.trigger('rigid', hapticOptions);
      setChecked(!checked);
    }
  };

  // Handle input value changes with min/max clamping
  const handleValueChange = (setter, min, max) => val => {
    let num = parseInt(val, 10);
    if (isNaN(num)) num = min;
    if (num < min) num = min;
    if (num > max) num = max;
    setter(String(num));
  };

  return (
    <View
      style={[
        styles.container,
        checked && styles.containerChecked,
        disabled && styles.disabledContainer,
      ]}
    >
      {/* Static text for reps/counter */}
      <View style={[styles.reps]}>
        <Text style={[styles.staticText]}>1</Text>
      </View>

      {/* Single PickerInput for minutes */}
      <PickerInput
        unitTitle="Mins"
        value={value1}
        onValueChange={handleValueChange(setValue1, 0, 999)}
        unitText={null} // No unit text shown
        min={0}
        max={999}
        width={48}
        style={[styles.baseInput, checked && styles.baseInputChecked]}
        showUnitText={false} // Hides the unit text space completely
      />

      {/* Checkbox for completion */}
      <TouchableOpacity
        style={styles.checkboxWrapper}
        onPress={handleCheckboxPress}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <View
          style={[
            styles.checkbox,
            checked ? styles.checkboxChecked : styles.checkboxUnchecked,
            disabled && styles.checkboxDisabled,
          ]}
        >
          {checked && <View style={styles.innerDot} />}{' '}
          {/* Inner dot shows only when checked */}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: Spacing.sm,
    borderRadius: Borders.radius.regular,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerChecked: {
    backgroundColor: '#D5D9EB', // Highlight when checked
  },
  disabledContainer: {
    opacity: 0.5, // Dim when disabled
  },
  baseInput: {
    borderColor: Colors.grey300,
    borderWidth: Borders.widths.thin,
    borderRadius: Borders.radius.regular,
  },
  baseInputChecked: {
    borderColor: Colors.darkBlue, // Highlight border if checked
  },
  reps: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  staticText: {
    ...Typography.googleSansCode.input,
  },
  checkboxWrapper: {
    width: 48,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    borderRadius: Borders.radius.regular,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxUnchecked: {
    borderWidth: Borders.widths.thin,
    borderColor: Colors.grey300,
    backgroundColor: Colors.white,
  },
  checkboxChecked: {
    borderWidth: Borders.widths.thin,
    borderColor: Colors.darkBlue,
  },
  checkboxDisabled: {
    opacity: 0.6,
  },
  innerDot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: Colors.darkBlue,
  },
});
