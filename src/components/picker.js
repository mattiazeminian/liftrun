import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Colors from '../variables/colors';
import Spacing from '../variables/spacing';
import Typography from '../variables/typography';
import Borders from '../variables/borders';
import Shadows from '../variables/shadows';
import AlertIcon from '../icons/alerticon';

export default function PickerInput({
  value,
  onChangeText,
  placeholder = '',
  label = '',
  errorMessage = '',
  disabled = false,
  style,
  statusIconCustom,
  options = [], // <--- array di valori [{label, value}]
  ...rest
}) {
  const [isFocused, setIsFocused] = useState(false);

  const isDisabled = disabled;
  const isError = !!errorMessage;

  // Calcola stato "automatico"
  let computedStatus = 'default';
  if (isDisabled) {
    computedStatus = 'disabled';
  } else if (isError) {
    computedStatus = 'error';
  } else if (isFocused || value) {
    computedStatus = 'active';
  }

  // Colore bordo
  const borderColor =
    computedStatus === 'error'
      ? Colors.error
      : computedStatus === 'active'
      ? Colors.darkBlue
      : Colors.grey200;

  // Colore etichetta
  const labelColor =
    computedStatus === 'disabled'
      ? Colors.grey200
      : computedStatus === 'error'
      ? Colors.error
      : Colors.darkBlue;

  const textColor =
    computedStatus === 'disabled' ? Colors.grey300 : Colors.darkBlue;

  return (
    <View style={[styles.wrapper, style]}>
      {label ? (
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      ) : null}

      <TouchableWithoutFeedback>
        <View
          style={[
            styles.inputContainer,
            {
              borderColor,
              backgroundColor: Colors.white,
              opacity: computedStatus === 'disabled' ? 0.6 : 1,
            },
            Shadows.sm,
          ]}
        >
          <Picker
            enabled={!isDisabled}
            selectedValue={value}
            style={[styles.input, { color: textColor }]}
            dropdownIconColor={textColor}
            onValueChange={(itemValue) => {
              onChangeText(itemValue);
              setIsFocused(true);
            }}
            {...rest}
          >
            {placeholder ? (
              <Picker.Item label={placeholder} value="" color={Colors.grey400} />
            ) : null}
            {options.map((opt) => (
              <Picker.Item
                key={opt.value}
                label={opt.label}
                value={opt.value}
                color={textColor}
              />
            ))}
          </Picker>

          {/* Icona per stato default (grigia) o active (blu) */}
          {(computedStatus === 'default' || computedStatus === 'active') && (
            <View style={styles.iconWrapper}>
              {statusIconCustom
                ? React.cloneElement(statusIconCustom, {
                    width: 16,
                    height: 16,
                    fill:
                      computedStatus === 'active'
                        ? Colors.darkBlue
                        : Colors.grey400,
                  })
                : null}
            </View>
          )}

          {/* Icona errore */}
          {computedStatus === 'error' && (
            <View style={styles.iconWrapper}>
              <AlertIcon width={16} height={16} fill={Colors.error} />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.errorWrapper}>
        {computedStatus === 'error' && errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : (
          <Text style={styles.errorText}> </Text>
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
