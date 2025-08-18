import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Dimensions,
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

  const handleInputChange = text => {
    let sanitized = text.replace(/[^0-9.]/g, '');
    let numeric = parseFloat(sanitized);
    if (isNaN(numeric)) {
      setInputValue('');
      return;
    }
    if (numeric < min) numeric = min;
    if (numeric > max) numeric = max;
    setInputValue(String(numeric));
    onValueChange(numeric);
  };

  const handleInputEndEditing = () => {
    let numeric = parseFloat(inputValue);
    if (isNaN(numeric)) {
      setInputValue(String(value)); // resetto valore corretto
      return;
    }
    numeric = Math.round(numeric / step) * step;
    if (numeric < min) numeric = min;
    if (numeric > max) numeric = max;
    setInputValue(String(numeric));
    if (numeric !== value) onValueChange(numeric);
  };

  // Calcolo larghezza slider dinamica: tutta la larghezza - padding orizzontale container
  // container ha padding orizzontale pari a Spacing.md (assunto)
  const horizontalPadding = Spacing.md * 2;
  const sliderWidth = SCREEN_WIDTH - horizontalPadding;

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.header, headerStyle]}>
        <Text style={styles.label}>{label.toUpperCase()}</Text>
        <TextInput
          style={[styles.input, inputStyle]}
          keyboardType="number-pad"
          value={inputValue}
          onChangeText={handleInputChange}
          onEndEditing={handleInputEndEditing}
          returnKeyType="done"
          underlineColorAndroid="transparent"
          editable={true} // assicurati sia editabile
          autoCorrect={false} // disabilita correzione
          textContentType="none" // (iOS) disabilita autofill
          keyboardAppearance="dark" // opzionale, se vuoi tastiera scura su iOS
          autoComplete="off" // disabilita completamento automatico (Android/iOS)
          spellCheck={false} // disabilita controllo ortografico
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
        // thumbStyle e trackStyle NON sono props ufficiali di react-native-community/slider
        // Per personalizzare il thumb e track occorre styling tramite style e uso componenti custom oppure
        // su iOS puoi solo personalizzare colore con thumbTintColor.
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
