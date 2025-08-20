import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThreeInputs, NumberWithTextInput } from './threeinputs'; // Adjust import path
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Colors from '../variables/colors';
import Spacing from '../variables/spacing';
import Borders from '../variables/borders';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function ExerciseRow({
  initialNumber = '5',
  checked,
  onCheckChange,
  disabled = false,
}) {
  // Trigger haptic feedback and toggle checked state only when checkbox pressed
  const handleCheckboxPress = () => {
    if (!disabled) {
      ReactNativeHapticFeedback.trigger('selection', hapticOptions);
      if (onCheckChange) {
        onCheckChange(!checked);
      }
    }
  };

  return (
    <View
      style={[
        styles.container,
        checked && styles.containerChecked, // change background on selected
        disabled && styles.disabledContainer,
      ]}
    >
      <ThreeInputs value={initialNumber} onChange={() => {}} width={32} />
      <NumberWithTextInput
        value={initialNumber}
        onChange={() => {}}
        textLabel="CM"
        width={72}
      />
      <ThreeInputs value={initialNumber} onChange={() => {}} width={48} />

      {/* Checkbox wrapper 24x24, only this toggles selection on press */}
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
          {checked && <View style={styles.innerDot} />}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const CHECKBOX_SIZE = 16;
const DOT_SIZE = 8;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: Spacing.md,
    borderRadius: Borders.radius.regular,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: Borders.widths.thin,
    borderColor: 'transparent',
  },
  containerChecked: {
    backgroundColor: Colors.grey100,
    borderColor: Colors.grey300,
  },
  disabledContainer: {
    opacity: 0.5,
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
    backgroundColor: Colors.darkBlue,
  },
  checkboxDisabled: {
    opacity: 0.6,
  },
  innerDot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: Colors.white,
  },
});
