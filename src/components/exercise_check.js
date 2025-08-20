// ExerciseCheck.js
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Colors from '../variables/colors';
import Borders from '../variables/borders';
import Shadows from '../variables/shadows';
import Typography from '../variables/typography';
import Spacing from '../variables/spacing';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function ExerciseCheck({
  checked,
  onChange = () => {},
  disabled = false,
  style,
  label,
  ...rest
}) {
  // Trigger 'selection' haptic feedback on press interaction
  const triggerHaptic = () => {
    ReactNativeHapticFeedback.trigger('selection', hapticOptions);
  };

  // Handle press: toggle checked state (deselect if already checked)
  const handlePress = () => {
    if (!disabled) {
      triggerHaptic();
      onChange(!checked);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.8}
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.container,
        checked && styles.containerChecked,
        style,
        Shadows.sm,
      ]}
      {...rest}
    >
      {/* Circle styled like radio; show inner dot only if checked */}
      <View
        style={[
          styles.radio,
          checked ? styles.radioSelected : styles.radioUnselected,
          disabled && styles.radioDisabled,
        ]}
      >
        {checked && <View style={styles.innerDot} />}
      </View>

      {/* Label text */}
      {label && (
        <Text
          style={[
            styles.label,
            disabled && { color: Colors.grey300, opacity: 0.6 },
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const RADIO_SIZE = 16;
const DOT_SIZE = 8;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: Spacing.md,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: Borders.radius.regular,
    borderWidth: Borders.widths.thin,
    borderColor: Colors.grey300,
    backgroundColor: Colors.white,
  },
  containerChecked: {
    backgroundColor: Colors.grey100,
    borderColor: Colors.darkBlue,
  },
  radio: {
    width: RADIO_SIZE,
    height: RADIO_SIZE,
    borderRadius: Borders.radius.regular,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  radioUnselected: {
    borderWidth: Borders.widths.thin,
    borderColor: Colors.grey300,
  },
  radioSelected: {
    borderWidth: Borders.widths.regular,
    borderColor: Colors.darkBlue,
  },
  radioDisabled: {
    opacity: 0.6,
  },
  innerDot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: Colors.darkBlue,
  },
  label: {
    color: Colors.darkBlue,
    marginLeft: Spacing.sm,
    ...Typography.manrope.smRegular,
  },
});
