import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Colors from '../variables/colors';
import Spacing from '../variables/spacing';
import Typography from '../variables/typography';
import Borders from '../variables/borders';

export default function SmallButton({
  children,
  onPress,
  disabled = false,
  variant = 'default', // default | active | danger
  style,
  textStyle,
  ...rest
}) {
  // Define background colors for different variants
  const variantStyles = {
    default: {
      backgroundColor: Colors.grey200,
    },
    active: {
      backgroundColor: Colors.darkBlue,
    },
    danger: {
      backgroundColor: Colors.error,
    },
  };

  // Define text color based on variant
  const textColor = (() => {
    if (variant === 'active' || variant === 'danger') return Colors.white;
    return Colors.grey600;
  })();

  // Haptic feedback options for 'selection' type, common for button taps
  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  // Handler triggers haptic feedback on press if not disabled,
  // then calls the provided onPress callback
  const handlePress = (...args) => {
    if (!disabled) {
      try {
        ReactNativeHapticFeedback.trigger('selection', hapticOptions);
      } catch (e) {
        console.warn('Haptic feedback error:', e);
      }
      if (typeof onPress === 'function') {
        onPress(...args);
      }
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles[variant],
        disabled && styles.disabled,
        style,
      ]}
      onPress={handlePress} // Use wrapped handler to add haptic feedback
      activeOpacity={disabled ? 1 : 0.8}
      disabled={disabled}
      {...rest}
    >
      <Text
        style={[
          styles.text,
          { color: textColor },
          disabled && styles.textDisabled,
          textStyle,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    height: 26,
    borderRadius: Borders.radius.small,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  disabled: {
    backgroundColor: Colors.grey200,
    opacity: 0.5,
  },
  text: {
    ...Typography.googleSansCode.xsRegular,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  textDisabled: {
    color: Colors.grey300,
  },
});
