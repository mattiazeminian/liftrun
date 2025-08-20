import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Colors from '../variables/colors';
import Spacing from '../variables/spacing';
import Typography from '../variables/typography';
import Borders from '../variables/borders';
import Shadows from '../variables/shadows';
import ChevronRight from '../icons/chevronright';

export default function SettingsItem({ label, icon, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Icona a sinistra */}
      {icon && (
        <View style={styles.iconWrapper}>
          {React.cloneElement(icon, { width: 16, height: 16 })}
        </View>
      )}

      {/* Testo */}
      <Text style={styles.text}>{label}</Text>

      {/* Chevron a destra */}
      <View style={styles.chevron}>
        <ChevronRight width={12} height={12} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: Borders.widths.thin,
    borderColor: Colors.grey300,
    borderRadius: Borders.radius.regular,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    ...Shadows.sm,
    marginBottom: Spacing.md,
  },
  iconWrapper: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  text: {
    flex: 1,
    color: Colors.darkBlue,
    ...Typography.manrope.mdRegular,
  },
  chevron: {
    marginLeft: Spacing.sm,
  },
});
