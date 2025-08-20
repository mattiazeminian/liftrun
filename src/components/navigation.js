import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import LogoIcon from '../icons/logoicon'; // Assumed to be React Native compatible (SVG or component)
import Spacing from '../variables/spacing';
import Colors from '../variables/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function Navigation({
  leftContent,
  rightContent,
  onLeftClick,
  onRightClick,
  showCenter = true,
  centerContent = null,
  style = {},
}) {
  // Trigger 'selection' haptic feedback on left button press
  const triggerHaptic = () => {
    ReactNativeHapticFeedback.trigger('soft', hapticOptions);
  };

  // Wrap left click to provide haptic feedback before invoking passed handler
  const handleLeftClick = () => {
    triggerHaptic();
    if (onLeftClick) {
      onLeftClick();
    }
  };

  // Right click handler without haptic (or add if needed)
  const handleRightClick = () => {
    if (onRightClick) {
      onRightClick();
    }
  };

  return (
    <View style={[styles.nav, style]}>
      {/* Left touchable area with haptic feedback */}
      <TouchableOpacity
        onPress={handleLeftClick} // Haptic triggered here on left click
        style={styles.leftFrame}
        activeOpacity={0.7}
      >
        {leftContent}
      </TouchableOpacity>

      {/* Center content or Logo */}
      {showCenter ? (centerContent ? centerContent : <LogoIcon />) : null}

      {/* Right touchable area without haptic */}
      <TouchableOpacity
        onPress={handleRightClick}
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
    width: SCREEN_WIDTH, // Occupies full screen width
    height: 92,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.xxl,
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
