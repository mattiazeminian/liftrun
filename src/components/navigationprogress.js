import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../variables/colors';
import Spacing from '../variables/spacing';
import Borders from '../variables/borders';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function NavigationProgress({
  leftContent,
  centerContent,
  rightContent,
  progress = 0,
  style = {},
  onLeftClick,
  onRightClick,
}) {
  const navigation = useNavigation();
  const progressClamped = Math.min(Math.max(progress, 0), 1);
  const horizontalPadding = 0;
  const progressWidth = Math.max(
    progressClamped * (SCREEN_WIDTH - horizontalPadding - Spacing.xl * 2),
    2,
  ); // min 2px

  return (
    <View style={[styles.nav, { width: SCREEN_WIDTH }, style]}>
      {/* Barra di progresso */}
      <View
        style={[
          styles.progressBarWrapper,
          { left: Spacing.xxl, right: Spacing.xxl },
        ]}
        accessible
        accessibilityLabel="Progress bar"
      >
        <View style={[styles.progressBarFill, { width: progressWidth }]} />
      </View>

      {/* Frame sinistro */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.leftFrame}
        activeOpacity={0.7}
      >
        {leftContent}
      </TouchableOpacity>

      {/* Frame centro */}
      <View style={[styles.centerFrame, { opacity: 1 }]}>{centerContent}</View>

      {/* Frame destro */}
      <TouchableOpacity
        onPress={onRightClick}
        style={[styles.rightFrame, { opacity: rightContent ? 1 : 0 }]}
        activeOpacity={0.7}
      >
        {rightContent}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    height: 92,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 48,
    alignItems: 'center',
    position: 'relative',
  },
  progressBarWrapper: {
    position: 'absolute',
    top: Spacing.lg,
    height: 2,
    borderRadius: Borders.radius.round,
    backgroundColor: Colors.grey200,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.darkBlue,
    borderRadius: Borders.radius.round,
  },
  leftFrame: {
    width: 40,
    height: 40,
    paddingVertical: Spacing.m,
    paddingRight: Spacing.lg,
    paddingLeft: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerFrame: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightFrame: {
    width: 40,
    height: 40,
    paddingVertical: Spacing.m,
    paddingLeft: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});
