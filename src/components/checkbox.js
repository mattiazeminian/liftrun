import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Colors from '../variables/colors';
import Borders from '../variables/borders';
import Shadows from '../variables/shadows';
import CheckIcon from '../icons/checkicon';
import Typography from '../variables/typography';
import Spacing from '../variables/spacing';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function CustomCheckbox({
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

  // Handle press: trigger haptic feedback, then toggle checked state if not disabled
  const handlePress = () => {
    if (!disabled) {
      triggerHaptic();
      onChange(!checked);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.8}
      onPress={handlePress} // handle touch with haptic feedback
      disabled={disabled}
      style={[
        styles.container,
        checked && styles.containerChecked,
        style,
        Shadows.sm,
      ]}
      {...rest}
    >
      {/* Checkbox square visible at all times */}
      <View
        style={[
          styles.box,
          checked ? styles.boxChecked : styles.boxUnchecked,
          disabled && styles.boxDisabled,
        ]}
      >
        {/* Check icon shown only when checked */}
        {checked && <CheckIcon width={12} height={12} fill={Colors.white} />}
      </View>

      {/* Label text displayed beside checkbox */}
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
    fontWeight: 600,
  },
  box: {
    width: 16,
    height: 16,
    borderRadius: Borders.radius.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxUnchecked: {
    backgroundColor: Colors.white,
    borderRadius: Borders.radius.small,
    borderWidth: Borders.widths.thin,
    borderColor: Colors.grey300,
  },
  boxChecked: {
    backgroundColor: Colors.darkBlue,
    borderWidth: Borders.widths.regular,
    borderColor: Colors.darkBlue,
  },
  boxDisabled: {
    opacity: 0.6,
  },
  label: {
    color: Colors.darkBlue,
    marginLeft: Spacing.sm,
    ...Typography.manrope.smRegular,
  },
});
