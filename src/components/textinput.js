import React, { useState, useRef } from 'react';
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

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

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
  const inputRef = useRef(null); // Ref for programmatic focus control

  const isDisabled = disabled;
  const isError = !!errorMessage;

  // Trigger 'selection' haptic feedback when interacting with the input container
  const triggerHaptic = () => {
    ReactNativeHapticFeedback.trigger('selection', hapticOptions);
  };

  // On container press: trigger haptic feedback and focus input
  const handleContainerPress = () => {
    if (inputRef.current) {
      triggerHaptic();
      inputRef.current.focus();
    }
  };

  // Determine input state for styling purposes
  let computedStatus = 'default';
  if (isDisabled) {
    computedStatus = 'disabled';
  } else if (isError) {
    computedStatus = 'error';
  } else if (isFocused || (value && value.length > 0)) {
    computedStatus = 'active';
  }

  // Set colors based on status
  const borderColor =
    computedStatus === 'error'
      ? Colors.error
      : computedStatus === 'active'
      ? Colors.darkBlue
      : Colors.grey200;

  const labelColor =
    computedStatus === 'disabled'
      ? Colors.grey200
      : computedStatus === 'error'
      ? Colors.error
      : Colors.darkBlue;

  const textColor = computedStatus === 'disabled' ? Colors.grey300 : Colors.darkBlue;

  return (
    <View style={[styles.wrapper, style]}>
      {/* Label, visible above the input field if provided */}
      {label ? (
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      ) : null}

      {/* Touchable wrapper to allow focusing input and provide haptic feedback */}
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
            ref={inputRef} // Ref assigned here for focus control
            style={[styles.input, { color: textColor }]}
            value={value}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={Colors.grey400}
            editable={computedStatus !== 'disabled'}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoCorrect={false}
            textContentType="none"
            keyboardAppearance="default"
            autoComplete="off"
            spellCheck={false}
            clearButtonMode="while-editing"
            selectionColor={Colors.darkBlue}
            {...rest}
          />

          {/* Render custom icon when provided in default or active states */}
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

          {/* Show error icon if in error state */}
          {computedStatus === 'error' && (
            <View style={styles.iconWrapper}>
              <AlertIcon width={16} height={16} fill={Colors.error} />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>

      {/* Error message below the input; reserves space for consistent layout */}
      <View style={styles.errorWrapper}>
        {computedStatus === 'error' && errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : (
          <Text style={styles.errorText}> </Text> /* Invisible placeholder */
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
