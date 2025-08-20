import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Colors from '../variables/colors';
import Spacing from '../variables/spacing';
import Typography from '../variables/typography';
import Borders from '../variables/borders';
import Shadows from '../variables/shadows';
import AlertIcon from '../icons/alerticon';
import ChevronDown from '../icons/chevrondown';
import ChevronUp from '../icons/chevronup';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function DropdownInput({
  value,
  onPress, // callback per aprire bottomsheet esterna (opzionale)
  placeholder = '',
  label = '',
  errorMessage = '',
  disabled = false,
  style,
  ...rest
}) {
  // State to toggle arrow icon direction
  const [isOpen, setIsOpen] = useState(false);

  const isError = !!errorMessage;
  const isDisabled = disabled;
  const isActive = isOpen || (!!value && value.length > 0);

  // Dynamic colors based on state
  const borderColor = isError
    ? Colors.error
    : isActive
    ? Colors.darkBlue
    : Colors.grey200;

  const labelColor = isDisabled
    ? Colors.grey200
    : isError
    ? Colors.error
    : Colors.darkBlue;

  const textColor = isDisabled ? Colors.grey300 : Colors.darkBlue;

  // Handle press: toggle arrow and call onPress external callback
  // Also trigger haptic feedback on press
  const handlePress = () => {
    if (isDisabled) return;
    setIsOpen(prev => !prev);
    ReactNativeHapticFeedback.trigger('selection', hapticOptions); // haptic feedback here
    if (typeof onPress === 'function') onPress();
  };

  return (
    <View style={[styles.wrapper, style]}>
      {label ? (
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      ) : null}

      <TouchableWithoutFeedback onPress={handlePress}>
        <View
          style={[
            styles.inputContainer,
            { borderColor, backgroundColor: Colors.white, opacity: isDisabled ? 0.6 : 1 },
            Shadows.sm,
          ]}
        >
          <RNTextInput
            style={[styles.input, { color: textColor }]}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={Colors.grey400}
            editable={false} // NOT editable!
            pointerEvents="none" // prevent accidental focus
            {...rest}
          />

          {isError ? (
            <View style={styles.iconWrapper}>
              <AlertIcon width={16} height={16} fill={Colors.error} />
            </View>
          ) : (
            <View style={styles.iconWrapper}>
              {isOpen ? (
                <ChevronUp color={Colors.darkBlue} />
              ) : (
                <ChevronDown color={Colors.darkBlue} />
              )}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.errorWrapper}>
        {isError && errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : (
          <Text style={styles.errorText}> </Text> // invisible space to maintain height
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    display: 'flex',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    zIndex: 1,
    marginLeft: 16,
    marginRight: 16,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 0,
    position: 'relative',
    top: 9,
    textTransform: 'uppercase',
    backgroundColor: Colors.white,
    ...Typography.googleSansCode.xsRegular,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: Borders.widths.thin,
    borderRadius: Borders.radius.regular,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'transparent',
    ...Typography.manrope.smRegular,
  },
  iconWrapper: {
    marginLeft: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: Colors.error,
    ...Typography.manrope.xsMedium,
  },
  errorWrapper: {
    minHeight: 18,
    marginLeft: Spacing.md,
  },
});
