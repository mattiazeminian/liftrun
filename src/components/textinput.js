import React, { useState, useRef } from 'react';
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

export default function TextInput({
  value,
  onChangeText,
  placeholder = '',
  label = '',
  errorMessage = '',
  keyboardType = 'default',
  disabled = false,
  style,
  statusIconCustom,
  ...rest
}) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null); // <--- crea ref

  const isDisabled = disabled;
  const isError = !!errorMessage;

  // Funzione per gestire il tocco sul contenitore
  const handleContainerPress = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // focus input e apre tastiera
    }
  };

  // Calcola stato "automatico"
  let computedStatus = 'default';
  if (isDisabled) {
    computedStatus = 'disabled';
  } else if (isError) {
    computedStatus = 'error';
  } else if (isFocused || (value && value.length > 0)) {
    computedStatus = 'active';
  }

  // Colore bordo
  const borderColor =
    computedStatus === 'error'
      ? Colors.error
      : computedStatus === 'active'
      ? Colors.darkBlue // o Colors.darkBlue se vuoi più evidenza
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

      {/* Wrappa il contenitore input con touchabile */}
      <TouchableWithoutFeedback onPress={handleContainerPress}>
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
          <RNTextInput
            ref={inputRef} // <--- assegna ref qui
            style={[styles.input, { color: textColor }]}
            value={value}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={Colors.grey400}
            editable={computedStatus !== 'disabled'}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoCorrect={false} // disabilita correzione
            textContentType="none" // (iOS) disabilita autofill
            keyboardAppearance="default" // opzionale, se vuoi tastiera scura su iOS
            autoComplete="off" // disabilita completamento automatico (Android/iOS)
            spellCheck={false} // disabilita controllo ortografico
            clearButtonMode="while-editing"
            selectionColor={Colors.darkBlue}
            {...rest}
          />

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
          <Text style={styles.errorText}> </Text> // spazio invisibile
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
    minHeight: 18, // o altezza stimata del messaggio errore
    marginLeft: Spacing.md,
  },
});
