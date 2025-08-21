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

export default function ExerciseRow({
  initialNumber = '10', // Default initial number for inputs
  disabled = false, // Disable interaction
  showText = true, // Show unit text next to PickerInput
}) {
  const [checked, setChecked] = useState(false); // Track checkbox state
  const [value1, setValue1] = useState(initialNumber); // First input value (e.g., weight)
  const [value2, setValue2] = useState(initialNumber); // Second input value (e.g., reps)

  // Handle checkbox press
  const handleCheckboxPress = () => {
    if (!disabled) {
      ReactNativeHapticFeedback.trigger('rigid', hapticOptions); // Haptic feedback
      setChecked(!checked); // Toggle checkbox state
    }
  };

  // Handle PickerInput value change with min/max clamping
  const handleValueChange = (setter, min, max) => val => {
    let num = parseInt(val, 10);
    if (isNaN(num)) num = min; // Default to min if input is invalid
    if (num < min) num = min; // Clamp to minimum
    if (num > max) num = max; // Clamp to maximum
    setter(String(num)); // Update state
  };

  return (
    <View
      style={[
        styles.container,
        checked && styles.containerChecked, // Highlight when checked
        disabled && styles.disabledContainer, // Dim when disabled
      ]}
    >
      {/* Static text for reps counter */}
      <View style={[styles.reps]}>
        <Text style={[styles.staticText]}>1</Text>
      </View>

      {/* First PickerInput for weight */}
      <PickerInput
        unitTitle="Weight"
        value={value1}
        onValueChange={handleValueChange(setValue1, 0, 999)}
        unitText="KG"
        min={0}
        max={999}
        width={72}
        style={[styles.baseInput, checked && styles.baseInputChecked]}
        showUnitText={showText} // Only show unit text if showText is true
      />

      {/* Second PickerInput for reps */}
      <PickerInput
        unitTitle="Reps"
        value={value2}
        onValueChange={handleValueChange(setValue2, 0, 999)}
        unitText={null}
        min={0}
        max={999}
        width={48}
        style={[styles.baseInput, checked && styles.baseInputChecked]}
        showUnitText={false} // Remove unit text completely
      />

      {/* Checkbox for marking completion */}
      <TouchableOpacity
        style={styles.checkboxWrapper}
        onPress={handleCheckboxPress}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <View
          style={[
            styles.checkbox,
            checked ? styles.checkboxChecked : styles.checkboxUnchecked, // Change style when checked
            disabled && styles.checkboxDisabled, // Dim when disabled
          ]}
        >
          {checked && <View style={styles.innerDot} />}{' '}
          {/* Inner dot appears only when checked */}
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
    backgroundColor: '#D5D9EB', // Light highlight for checked state
  },
  disabledContainer: {
    opacity: 0.5, // Reduce opacity when disabled
  },
  baseInput: {
    borderColor: Colors.grey300,
    borderWidth: Borders.widths.thin,
    borderRadius: Borders.radius.regular,
  },
  baseInputChecked: {
    borderColor: Colors.darkBlue, // Highlight input border when checked
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
    borderWidth: Borders.widths.regular,
    borderColor: Colors.darkBlue,
  },
  checkboxDisabled: {
    opacity: 0.6,
  },
  innerDot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: Colors.darkBlue, // Small dot inside checkbox when checked
  },
});
