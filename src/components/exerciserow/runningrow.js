import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';
import Borders from '../../variables/borders';

import PickerInput from './pickerinput_clean';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const CHECKBOX_SIZE = 16;
const DOT_SIZE = 8;

export default function RunningRow({
  initialNumber = '10.0',
  disabled = false,
  showText = true,
}) {
  const [checked, setChecked] = useState(false);
  const [distance, setDistance] = useState(initialNumber); // distance uses decimals
  const [mins, setMins] = useState('0'); // minutes stay integer

  // Toggle checkbox with haptic feedback
  const handleCheckboxPress = () => {
    if (!disabled) {
      ReactNativeHapticFeedback.trigger('rigid', hapticOptions);
      setChecked(!checked);
    }
  };

  // Distance -> float with 1 decimal (e.g. 0.0, 1.2, 5.0)
  const handleDistanceChange = val => {
    let num = parseFloat(val);
    if (isNaN(num)) num = 0.0;
    if (num < 0) num = 0.0;
    if (num > 999) num = 999.0;
    setDistance(num.toFixed(1));
  };

  // Minutes -> integer only
  const handleMinsChange = val => {
    let num = parseInt(val, 10);
    if (isNaN(num)) num = 0;
    if (num < 0) num = 0;
    if (num > 999) num = 999;
    setMins(String(num));
  };

  return (
    <View
      style={[
        styles.container,
        checked && styles.containerChecked,
        disabled && styles.disabledContainer,
      ]}
    >
      <PickerInput
        unitTitle="Distance"
        value={distance}
        onValueChange={handleDistanceChange}
        unitText="KM"
        min={0.0}
        max={999.0}
        step={0.1} // 👈 important: allow decimal increments inside picker
        width={72}
        style={[styles.baseInput, checked && styles.baseInputChecked]}
        showUnitText={showText} // Show unit only if `showText` is true
      />

      <PickerInput
        unitTitle="Mins"
        value={mins}
        onValueChange={handleMinsChange}
        unitText={null}
        min={0}
        max={999}
        step={1} 
        width={48}
        style={[styles.baseInput, checked && styles.baseInputChecked]}
        showUnitText={false} // Always hide unit for minutes
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
  baseInput: {
    borderColor: Colors.grey300,
    borderWidth: Borders.widths.thin,
    borderRadius: Borders.radius.regular,
  },
  baseInputChecked: {
    borderColor: Colors.darkBlue,
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
