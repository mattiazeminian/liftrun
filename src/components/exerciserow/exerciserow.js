import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';
import Borders from '../../variables/borders';
import Typography from '../../variables/typography';

import PickerInput from './pickerinput_clean';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const CHECKBOX_SIZE = 16;
const DOT_SIZE = 8;

export default function ExerciseRow({
  setNumber = 1,
  weight = '0',
  reps = '0',
  disabled = false,
  showText = true,
  onChangeWeight = () => {},
  onChangeReps = () => {},
}) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxPress = () => {
    if (!disabled) {
      ReactNativeHapticFeedback.trigger('rigid', hapticOptions);
      setChecked(!checked);
    }
  };

  const handleValueChange =
    (setter, min, max, step = 0.25) =>
    val => {
      let num = parseFloat(val);
      if (isNaN(num)) num = min;
      num = Math.round(num / step) * step;
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
      <View style={styles.setNumber}>
        <Text style={styles.Reps}>{setNumber}</Text>
      </View>

      <PickerInput
        unitTitle="Weight"
        value={weight}
        onValueChange={handleValueChange(onChangeWeight, 0, 999, 0.25)}
        unitText="KG"
        min={0}
        max={999}
        step={0.25}
        width={72}
        style={[styles.baseInput, checked && styles.baseInputChecked]}
        showUnitText={showText}
        disabled={disabled}
        keyboardType="decimal-pad"
      />

      <PickerInput
        unitTitle="Reps"
        value={reps}
        onValueChange={handleValueChange(onChangeReps, 0, 999, 1)}
        unitText={null}
        min={0}
        max={999}
        step={1}
        width={48}
        style={[styles.baseInput, checked && styles.baseInputChecked]}
        showUnitText={false}
        disabled={disabled}
        keyboardType="numeric"
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
  },
  containerChecked: {
    backgroundColor: '#D5D9EB',
  },
  disabledContainer: {
    opacity: 0.5,
  },
  Reps: {
    ...Typography.googleSansCode.input,
  },
  baseInput: {
    borderColor: Colors.grey300,
    borderWidth: Borders.widths.thin,
    borderRadius: Borders.radius.regular,
  },
  baseInputChecked: {
    borderColor: Colors.darkBlue,
  },
  setNumber: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
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
