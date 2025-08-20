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

const CHECKBOX_SIZE = 16;
const DOT_SIZE = 8;

export default function ExerciseRow({
  initialNumber = '5',
  disabled = false,
}) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxPress = () => {
    if (!disabled) {
      ReactNativeHapticFeedback.trigger('selection', hapticOptions);
      setChecked(!checked);
    }
  };

  // Define dynamic style for inputs’ borders based on checked state
  const inputBorderStyle = checked ? styles.inputBorderChecked : styles.inputBorderDefault;

  return (
    <View
      style={[
        styles.container,
        checked && styles.containerChecked,
        disabled && styles.disabledContainer,
      ]}
    >
      <ThreeInputs
        value={initialNumber}
        onChange={() => {}}
        width={32}
        style={inputBorderStyle}
      />
      <NumberWithTextInput
        value={initialNumber}
        onChange={() => {}}
        textLabel="CM"
        width={72}
        style={inputBorderStyle}
      />
      <ThreeInputs
        value={initialNumber}
        onChange={() => {}}
        width={48}
        style={inputBorderStyle}
      />

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: Spacing.sm,
    borderRadius: Borders.radius.regular,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: Borders.widths.thin,
    borderColor: 'transparent',
  },
  containerChecked: {
    backgroundColor: '#D5D9EB',
  },
  disabledContainer: {
    opacity: 0.5,
  },
  // Border style applied to inputs when checkbox is selected
  inputBorderDefault: {
    borderColor: Colors.grey300,
    borderWidth: Borders.widths.thin,
    borderRadius: Borders.radius.regular,
  },
  inputBorderChecked: {
    borderColor: Colors.darkBlue,
  },
  checkboxWrapper: {
    width: 48,
    height: 48,
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
    backgroundColor: Colors.darkBlue,
  },
});
