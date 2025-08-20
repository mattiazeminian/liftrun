import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LogoIcon from '../icons/logoicon'; // Assumo che LogoIcon sia compatibile con RN (SVG o component)
import Spacing from '../variables/spacing';
import Colors from '../variables/colors';
import { shadow } from 'react-native-paper';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Navigation({
  leftContent,
  rightContent,
  onLeftClick,
  onRightClick,
  showCenter = true,
  centerContent = null,
  style = {},
}) {
  return (
    <View style={[styles.nav, style]}>
      {/* Sinistra */}
      <TouchableOpacity
        onPress={onLeftClick}
        style={styles.leftFrame}
        activeOpacity={0.7}
      >
        {leftContent}
      </TouchableOpacity>

      {/* Centro */}
      {showCenter ? centerContent ? centerContent : <LogoIcon /> : null}
      {/* Destra */}
      <TouchableOpacity
        onPress={onRightClick}
        style={styles.rightFrame}
        activeOpacity={0.7}
      >
        {rightContent}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    width: SCREEN_WIDTH, // Occupare tutta la larghezza schermo
    height: 92,
    paddingHorizontal: Spacing.md,
    marginTop: 64,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  leftFrame: {
    paddingVertical: Spacing.m,
    paddingRight: Spacing.lg,
    paddingLeft: Spacing.md,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerFrame: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightFrame: {
    paddingVertical: Spacing.m,
    paddingLeft: Spacing.lg,
    paddingRight: Spacing.md,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
