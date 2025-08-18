import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Colors from '../variables/colors';
import Typography from '../variables/typography';
import Spacing from '../variables/spacing';
import Borders from '../variables/borders';
import Radio from './radio';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDE_MARGIN = 16;
const OPTION_WIDTH = SCREEN_WIDTH - SIDE_MARGIN * 2;

const baseContainer = {
  width: OPTION_WIDTH,
  paddingVertical: Spacing.m,
  paddingHorizontal: Spacing.sm,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between', // per avere radio e testo sempre distanti agli estremi
  borderRadius: Borders.radius.regular,
};

export default function InputOptionBottomsheet({
  id,
  label,
  selected = false,
  disabled = false,
  onChange = () => {},
}) {
  return (
    <TouchableOpacity
      style={[
        selected ? styles.selectedContainer : styles.container,
        disabled && { opacity: 0.5 },
      ]}
      activeOpacity={0.7}
      onPress={() => {
        if (!disabled) onChange(!selected);
      }}
      disabled={disabled}
    >
      {/* Testo a sinistra */}
      <Text
        style={[
          styles.label,
          { color: disabled ? Colors.grey200 : Colors.darkBlue },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>

      {/* wrapper fisso a destra */}
      <View style={styles.radioWrapper}>
        {selected ? (
          <Radio
            selected={true}
            disabled={disabled}
            style={styles.radioCustom}
          />
        ) : (
          <View style={{ width: 16, height: 16 }} /> // placeholder fisso
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...baseContainer,
    backgroundColor: 'transparent',
    borderWidth: Borders.widths.thin,
    borderColor: 'transparent',
  },
  selectedContainer: {
    ...baseContainer,
    borderWidth: Borders.widths.thin,
    borderColor: Colors.grey300,
    backgroundColor: Colors.grey100,
  },
  label: {
    ...Typography.manrope.smMedium,
    fontWeight: '600',
    flexShrink: 1,
  },
  radioWrapper: {
    marginLeft: 'auto',
    marginRight: 16,
    width: 16, // fissa la larghezza dello spazio
    height: 16,
    alignItems: 'center',
    justifyContent: 'center', // centra verticalmente il Radio
  },
  radioCustom: {
    borderWidth: 0,
    height: 16,
    width: 16,
    backgroundColor: 'transparent',
  },
});
