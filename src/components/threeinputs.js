import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../variables/colors';
import Typography from '../variables/typography';
import Spacing from '../variables/spacing';
import PickerInput from './pickerinput_clean';

// Number-only input
export function ThreeInputs({ value, onChange, width = 56, style }) {
  return (
    <PickerInput
      value={value}
      onValueChange={onChange}
      style={[styles.baseInput, { width }, style]}
      min={0}
      max={99}
      unitText=""
      placeholder="--"
      label={null}
      errorMessage={null}
      textStyle={styles.pickerText}       // centra il numero
      pickerStyle={styles.pickerNoBorder} // rimuove bordo interno
    />
  );
}

// Number + text input
export function NumberWithTextInput({ value, onChange, textLabel, width = 72, style }) {
  return (
    <View style={[styles.container, { width }, style]}>
      <PickerInput
        value={value}
        onValueChange={onChange}
        style={styles.numberPart}
        min={0}
        max={999}
        unitText=""
        placeholder="--"
        label={null}
        errorMessage={null}
        textStyle={styles.pickerText}
        pickerStyle={styles.pickerNoBorder}
      />
      <Text style={styles.textPart}>{textLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  baseInput: {
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  pickerNoBorder: {
    height: "auto",
    border: "none",
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
  },
  textPart: {
    marginLeft: Spacing.xs,
    color: Colors.darkBlue,
    ...Typography.googleSansCode.xsRegular,
  },
});
