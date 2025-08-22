import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
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

export default function BodyweightRow({
  setNumber = 1,
  initialNumber = '10',
  disabled = false,
  showText = true,
  onChangeValue = () => {},
}) {
  const [checked, setChecked] = useState(false);
  const [value1, setValue1] = useState(initialNumber);

  // Toggle checkbox with haptic feedback
  const handleCheckboxPress = () => {
    if (!disabled) {
      ReactNativeHapticFeedback.trigger('rigid', hapticOptions);
      setChecked(!checked);
    }
  };

  // Handle value changes with min/max clamp
  const handleValueChange = val => {
    let num = parseInt(val, 10);
    if (isNaN(num)) num = 0;
    if (num < 0) num = 0;
    if (num > 999) num = 999;
    setValue1(String(num));
    onChangeValue(String(num));
  };

  return (
    <View
      style={[
        styles.container,
        checked && styles.containerChecked,
        disabled && styles.disabledContainer,
      ]}
    >
      {/* Dynamic set number */}
      <View style={styles.sets}>
        <Text style={styles.staticText}>{setNumber}</Text>
      </View>

      {/* Single PickerInput for minutes */}
      <PickerInput
        unitTitle="Reps"
        value={value1}
        onValueChange={handleValueChange}
        unitText={null}
        min={0}
        max={999}
        width={48}
        style={[styles.baseInput, checked && styles.baseInputChecked]}
        showUnitText={false}
        disabled={disabled}
      />

      {/* Checkbox */}
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
  baseInput: {
    borderColor: Colors.grey300,
    borderWidth: Borders.widths.thin,
    borderRadius: Borders.radius.regular,
  },
  baseInputChecked: {
    borderColor: Colors.darkBlue,
  },
  sets: {
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
