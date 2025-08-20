import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Colors from '../variables/colors';
import Typography from '../variables/typography';
import Spacing from '../variables/spacing';
import Borders from '../variables/borders';
import Radio from './radio';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDE_MARGIN = 16;
const OPTION_WIDTH = SCREEN_WIDTH - SIDE_MARGIN * 2;

// Haptic feedback options
const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const baseContainer = {
  width: OPTION_WIDTH,
  paddingVertical: Spacing.m,
  paddingHorizontal: Spacing.sm,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between', // keeps radio and text spaced apart
  borderRadius: Borders.radius.regular,
};

export default function InputOptionBottomsheet({
  id,
  label,
  selected = false,
  disabled = false,
  onChange = () => {},
}) {
  // Function to trigger selection haptic feedback on press
  const triggerHaptic = () => {
    ReactNativeHapticFeedback.trigger('selection', hapticOptions);
  };

  // Handler for press: triggers haptic feedback then calls onChange if not disabled
  const handlePress = () => {
    if (!disabled) {
      triggerHaptic();
      onChange(!selected);
    }
  };

  return (
    <TouchableOpacity
      style={[
        selected ? styles.selectedContainer : styles.container,
        disabled && { opacity: 0.5 },
      ]}
      activeOpacity={0.7}
      onPress={handlePress} // press triggers haptic feedback
      disabled={disabled}
    >
      {/* Left text label */}
      <Text
        style={[
          styles.label,
          { color: disabled ? Colors.grey200 : Colors.darkBlue },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>

      {/* Fixed width wrapper on right for Radio */}
      <View style={styles.radioWrapper}>
        {selected ? (
          <Radio
            selected={true}
            disabled={disabled}
            style={styles.radioCustom}
          />
        ) : (
          <View style={{ width: 16, height: 16 }} /> // fixed placeholder space
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...baseContainer,
    backgroundColor: 'transparent',
    borderWidth: Borders.widths.thin,
    borderColor: 'transparent',
  },
  selectedContainer: {
    ...baseContainer,
    borderWidth: Borders.widths.thin,
    borderColor: Colors.grey300,
    backgroundColor: Colors.grey100,
  },
  label: {
    ...Typography.manrope.smMedium,
    fontWeight: '600',
    flexShrink: 1,
  },
  radioWrapper: {
    marginLeft: 'auto',
    marginRight: 16,
    width: 16, // fixed width space
    height: 16,
    alignItems: 'center',
    justifyContent: 'center', // vertically center the Radio
  },
  radioCustom: {
    borderWidth: 0,
    height: 16,
    width: 16,
    backgroundColor: 'transparent',
  },
});
