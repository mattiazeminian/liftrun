import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Slider from '@react-native-community/slider';

import Colors from '../variables/colors';
import Spacing from '../variables/spacing';
import Typography from '../variables/typography';
import Borders from '../variables/borders';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function CustomSlider({
  label = '',
  value,
  onValueChange,
  min = 0,
  max = 7,
  step = 1,
  style,
  inputStyle,
  sliderStyle,
  headerStyle,
}) {
  const [inputValue, setInputValue] = useState(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  // Consenti solo input numerico valido (intero o decimale se step<1)
  const handleInputChange = (text) => {
    const regex = step < 1 ? /^[0-9]*\.?[0-9]*$/ : /^[0-9]*$/;
    if (regex.test(text)) {
      setInputValue(text);
    }
  };

  const handleInputEndEditing = () => {
    let numeric = parseFloat(inputValue);

    if (isNaN(numeric)) {
      setInputValue(String(value));
      return;
    }

    numeric = Math.round(numeric / step) * step;
    if (numeric < min) numeric = min;
    if (numeric > max) numeric = max;

    setInputValue(String(numeric));

    if (numeric !== value) {
      onValueChange(numeric);
    }
  };

  const horizontalPadding = Spacing.md * 2;
  const sliderWidth = SCREEN_WIDTH - horizontalPadding;

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.header, headerStyle]}>
        <Text style={styles.label}>{label.toUpperCase()}</Text>
        <TextInput
          style={[styles.input, inputStyle]}
          keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'numeric'}
          value={inputValue}
          onChangeText={handleInputChange}
          onEndEditing={handleInputEndEditing}
          returnKeyType="done"
          underlineColorAndroid="transparent"
          editable={true}
          autoCorrect={false}
          textContentType="none"
          keyboardAppearance="dark"
          autoComplete="off"
          spellCheck={false}
          selectionColor={Colors.darkBlue}
        />
      </View>

      <Slider
        style={[styles.slider, { width: sliderWidth }, sliderStyle]}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        minimumTrackTintColor={Colors.darkBlue}
        maximumTrackTintColor={Colors.grey200}
        thumbTintColor={Colors.darkBlue}
        onValueChange={onValueChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: Spacing.m,
    alignSelf: 'stretch',
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  label: {
    color: Colors.darkBlue,
    ...Typography.googleSansCode.smRegular,
    textTransform: 'uppercase',
  },
  input: {
    display: 'flex',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Borders.radius.regular,
    borderWidth: Borders.widths.thin,
    borderColor: Colors.grey200,
    ...Typography.googleSansCode.smRegular,
    lineHeight: 0,
    color: Colors.darkBlue,
    textAlign: 'center',
  },
  slider: {
    alignSelf: 'stretch',
  },
});
