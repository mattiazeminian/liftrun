import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../variables/colors';
import Typography from '../variables/typography';
import Spacing from '../variables/spacing';

export default function HeaderOnboarding({
  iconSource,
  title,
  description,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      {iconSource && (
        <View style={styles.icon}>
          {React.isValidElement(iconSource) ? (
            iconSource
          ) : (
            <Image
              source={iconSource}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          )}
        </View>
      )}

      {/* Text container */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Spacing.md,
    flexDirection: 'column',
    alignItems: 'center',
    gap: Spacing.md,
  },
  icon: {
    width: 24,
    height: 24,
  },
  textContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: Spacing.md,
  },
  title: {
    color: Colors.darkBlue,
    ...Typography.robotoSerif.displayMdRegular,
    textAlign: 'center',
  },
  description: {
    color: Colors.grey600,
    ...Typography.manrope.smRegular,
    textAlign: 'center',
  },
});
