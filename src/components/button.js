import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Colors from '../variables/colors';
import Spacing from '../variables/spacing';
import Typography from '../variables/typography';
import Borders from '../variables/borders';

export default function Button({
  children,
  onClick,
  disabled,
  variant = 'primary',
  style,
  ...rest
}) {
  const backgroundColors = {
    primary: disabled ? Colors.grey200 : Colors.darkBlue,
    secondary: disabled ? Colors.grey200 : Colors.white,
    tertiary: disabled ? Colors.grey200 : Colors.white,
  };
  const textColors = {
    primary: disabled ? Colors.grey300 : Colors.white,
    secondary: disabled ? Colors.grey300 : Colors.darkBlue,
    tertiary: disabled ? Colors.grey300 : Colors.darkBlue,
  };
  const borderColors = {
    primary: 'transparent',
    secondary: disabled ? Colors.grey200 : Colors.darkBlue,
    tertiary: disabled ? Colors.grey200 : Colors.darkBlue,
  };
  const contentStylesByVariant = {
    primary: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.lg },
    secondary: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.lg },
    tertiary: { paddingVertical: Spacing.xxs, paddingHorizontal: Spacing.lg },
  };

  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  // Trigger haptic feedback on press-in (touch down)
  const handlePressIn = () => {
    if (!disabled) {
      try {
        ReactNativeHapticFeedback.trigger('soft', hapticOptions);
      } catch (e) {
        console.warn('Haptic feedback error:', e);
      }
    }
  };

  return (
    <PaperButton
      mode="contained"
      disabled={disabled}
      onPress={onClick}
      onPressIn={handlePressIn} // Haptics trigger on press down
      contentStyle={contentStylesByVariant[variant]}
      style={[
        styles.button,
        {
          backgroundColor: backgroundColors[variant],
          borderColor: borderColors[variant],
          borderRadius: variant === 'tertiary' ? Borders.radius.large : 50,
          borderWidth: variant === 'primary' ? 0 : Borders.widths.thin,
        },
        style,
      ]}
      labelStyle={{
        color: textColors[variant],
        ...Typography.googleSansCode.smRegular,
        textTransform: 'uppercase',
      }}
      {...rest}
    >
      {children}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
  },
});
