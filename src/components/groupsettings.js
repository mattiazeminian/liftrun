import React from 'react';
import { View, StyleSheet } from 'react-native';
import SettingsItem from './settingsitem';
import Spacing from '../variables/spacing';
import Colors from '../variables/colors';
import Borders from '../variables/borders';
import Shadows from '../variables/shadows';

export default function GroupSettings({ items }) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View
          key={index}
          style={[
            styles.itemWrapper,
            index < items.length - 1 && styles.itemBorder, // bordino solo sugli item non ultimi
          ]}
        >
          <SettingsItem
            label={item.label}
            icon={item.icon}
            onPress={item.onPress}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: Borders.radius.regular,
    ...Shadows.sm,
    overflow: 'hidden', // così anche i bordi bottom rispettano il radius
  },
  itemWrapper: {
    backgroundColor: Colors.white,
    padding: Spacing.sm,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight, // Scegli il colore che preferisci
  },
});
