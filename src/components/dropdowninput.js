import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  TouchableOpacity,
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
  onPress, // <-- callback per aprire la tua bottomsheet esterna (opzionale)
  placeholder = '',
  label = '',
  errorMessage = '',
  disabled = false,
  style,
  ...rest
}) {
  // stato solo per cambiare la freccia
  const [isOpen, setIsOpen] = useState(false);

  const isError = !!errorMessage;
  const isActive = isOpen || (!!value && value.length > 0);
  const isDisabled = disabled;

  // Colori
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

  const textColor = isDisabled ? Colors.grey200 : Colors.darkBlue;

  // Gestore di apertura: cambia solo la freccia e chiama l'eventuale onPress (per bottomsheet)
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

      <TouchableOpacity
        style={[
          styles.inputContainer,
          { borderColor, opacity: isDisabled ? 0.6 : 1 },
          Shadows.sm,
        ]}
        activeOpacity={0.7}
        onPress={handlePress}
        disabled={isDisabled}
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
      </TouchableOpacity>

      {isError && errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    display: 'flex',
    height: '60px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    zIndex: 1,
    marginLeft: 16,
    marginRight: 16,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 0, // esplicito
    position: 'relative',
    top: 9, // verrà applicato visto che c'è position relative
    textTransform: 'uppercase',
    backgroundColor: Colors.white,
    ...Typography.googleSansCode.xsRegular,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Borders.widths.thin,
    borderRadius: Borders.radius.regular,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.m,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
    ...Typography.manrope.smRegular,
    height: 20,
  },
  iconWrapper: {
    marginLeft: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    marginTop: 2,
    marginLeft: Spacing.md,
    color: Colors.error,
    ...Typography.manrope.xsMedium,
  },
});
