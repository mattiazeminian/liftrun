import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Colors from '../variables/colors';
import Spacing from '../variables/spacing';
import Typography from '../variables/typography';
import Borders from '../variables/borders';
import Shadows from '../variables/shadows';
import AlertIcon from '../icons/alerticon';
import ChevronDown from '../icons/chevrondown';
import ChevronUp from '../icons/chevronup';

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
  // stato per cambiare la freccia
  const [isOpen, setIsOpen] = useState(false);

  const isError = !!errorMessage;
  const isDisabled = disabled;
  const isActive = isOpen || (!!value && value.length > 0);

  // Colori dinamici
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

  // Gestore apertura: toggle freccia e chiama onPress
  const handlePress = () => {
    if (isDisabled) return;
    setIsOpen(prev => !prev);
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
            editable={false} // NON editabile!
            pointerEvents="none" // evita focus accidentali
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
          <Text style={styles.errorText}> </Text> // spazio invisibile per mantenere altezza
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
    paddingVertical: Spacing.m,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'transparent',
    ...Typography.manrope.smRegular,
    height: 24,
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
