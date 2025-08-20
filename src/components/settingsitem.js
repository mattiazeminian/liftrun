import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Colors from '../variables/colors';
import Spacing from '../variables/spacing';
import Typography from '../variables/typography';
import Borders from '../variables/borders';
import Shadows from '../variables/shadows';
import ChevronRight from '../icons/chevronright';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function SettingsItem({ label, icon, onPress }) {
  // Trigger 'selection' haptic feedback on press for tactile feedback
  const triggerHaptic = () => {
    ReactNativeHapticFeedback.trigger('selection', hapticOptions);
  };

  // Wrap the onPress to trigger haptic feedback before executing onPress prop
  const handlePress = () => {
    triggerHaptic();
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress} // handle touch with haptic feedback
      activeOpacity={0.7}
    >
      {/* Left icon, if passed */}
      {icon && (
        <View style={styles.iconWrapper}>
          {React.cloneElement(icon, { width: 16, height: 16 })}
        </View>
      )}

      {/* Label text */}
      <Text style={styles.text}>{label}</Text>

      {/* Right chevron icon */}
      <View style={styles.chevron}>
        <ChevronRight width={12} height={12} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: Borders.widths.thin,
    borderColor: Colors.grey300,
    borderRadius: Borders.radius.regular,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    ...Shadows.sm,
    marginBottom: Spacing.md,
  },
  iconWrapper: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  text: {
    flex: 1,
    color: Colors.darkBlue,
    ...Typography.manrope.smRegular,
  },
  chevron: {
    marginLeft: Spacing.sm,
  },
});
