import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

import Colors from '../variables/colors';
import Typography from '../variables/typography';
import Spacing from '../variables/spacing';
import Borders from '../variables/borders';

// Number only input with customizable width
export function ThreeInputs({ value, onChange, width, style }) {
  return (
    <TextInput
      style={[styles.inputBase, { width }, style]}
      value={value}
      onChangeText={onChange}
      keyboardType="numeric"
      maxLength={2}
      returnKeyType="done"
      textContentType="none"
      underlineColorAndroid="transparent"
      selectionColor={Colors.darkBlue}
    />
  );
}

// Number + text input with fixed width 72px
export function NumberWithTextInput({
  value,
  onChange,
  textLabel,
  width,
  style,
}) {
  return (
    <View style={[styles.numberWithTextContainer, { width }, style]}>
      <TextInput
        style={styles.numberPart}
        value={value}
        onChangeText={onChange}
        keyboardType="numeric"
        maxLength={3}
        returnKeyType="done"
        textContentType="none"
        underlineColorAndroid="transparent"
        selectionColor={Colors.darkBlue}
      />
      <Text style={styles.textPart}>{textLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBase: {
    color: Colors.darkBlue,
    ...Typography.googleSansCode.input,
    textAlign: 'center',
    paddingVertical: Spacing.m,
    borderRadius: Borders.radius.regular,
    borderWidth: Borders.widths.thin,
    borderColor: Colors.grey200,
  },
  numberWithTextContainer: {
    flexDirection: 'row',
    paddingVertical: Spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Borders.radius.regular,
    borderWidth: Borders.widths.thin,
    borderColor: Colors.grey200,
  },
  numberPart: {
    color: Colors.darkBlue,
    ...Typography.googleSansCode.input,
    textAlign: 'center',
    marginRight: Spacing.sm,
    lineHeight: 0,
  },
  textPart: {
    color: Colors.darkBlue,
    ...Typography.googleSansCode.xsRegular,
  },
});
