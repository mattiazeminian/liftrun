import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
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

  const textColor = (() => {
    if (variant === 'active' || variant === 'danger') return Colors.white;
    return Colors.grey600;
  })();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles[variant],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
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
