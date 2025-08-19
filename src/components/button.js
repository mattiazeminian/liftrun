// src/components/Button.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import Colors from '../variables/colors';
import Spacing from '../variables/spacing';
import Typography from '../variables/typography';
import Borders from '../variables/borders';

export default function Button({
  children,
  onClick,
  disabled,
  variant = 'primary', // primary, secondary, tertiary
  style,
  ...rest
}) {
  // Colori sfondo in base allo stato/variante
  const backgroundColors = {
    primary: disabled ? Colors.grey200 : Colors.darkBlue,
    secondary: disabled ? Colors.grey200 : Colors.white,
    tertiary: disabled ? Colors.grey200 : Colors.white,
  };

  // Colori testo in base allo stato/variante
  const textColors = {
    primary: disabled ? Colors.grey300 : Colors.white,
    secondary: disabled ? Colors.grey300 : Colors.darkBlue,
    tertiary: disabled ? Colors.grey300 : Colors.darkBlue,
  };

  // Colore bordo
  const borderColors = {
    primary: 'transparent',
    secondary: disabled ? Colors.grey200 : Colors.darkBlue,
    tertiary: disabled ? Colors.grey200 : Colors.darkBlue,
  };

  // Padding per variante
  const contentStylesByVariant = {
    primary: {
      paddingVertical: Spacing.xxs,
      paddingHorizontal: Spacing.lg,
    },
    secondary: {
      paddingVertical: Spacing.xxs,
      paddingHorizontal: Spacing.lg,
    },
    tertiary: {
      paddingVertical: Spacing.none,
      paddingHorizontal: Spacing.lg,
    },
  };

  const mode = 'contained';

  return (
    <PaperButton
      mode={mode}
      onPress={onClick}
      disabled={disabled}
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
