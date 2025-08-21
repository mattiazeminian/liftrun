import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard } from 'react-native';

import Colors from '../../variables/colors';
import Typography from '../../variables/typography';
import Borders from '../../variables/borders';
import Shadows from '../../variables/shadows';
import Spacing from '../../variables/spacing';

import SmallButton from '../../components/buttonsmall';

export default function Warmup() {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('Warmup Exercise');
  const [tempTitle, setTempTitle] = useState(title);
  const inputRef = useRef(null);

  const startEditing = () => {
    setTempTitle(title);
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleCloseOrSave = () => {
    if (tempTitle !== title) {
      setTitle(tempTitle); // salva modifiche
    }
    setEditing(false);
    Keyboard.dismiss();
  };

  const handleRemove = () => console.log('Remove pressed');

  return (
    <View style={[styles.container, Shadows.lg]}>
      <View style={styles.exerciseTitle}>
        {editing ? (
          <View style={styles.inputWrapper}>
            <TextInput
              ref={inputRef}
              value={tempTitle}
              onChangeText={setTempTitle}
              style={styles.input}
              maxLength={80}
              cursorColor={Colors.darkBlue}
              selectionColor={Colors.darkBlue}
            />
          </View>
        ) : (
          <Text style={styles.titleText}>{title}</Text>
        )}

        <View style={styles.buttonsRow}>
          {editing && (
            <SmallButton
              onPress={handleRemove}
              variant="danger"
              style={{ marginRight: 8 }}
            >
              Remove
            </SmallButton>
          )}

          <SmallButton
            onPress={editing ? handleCloseOrSave : startEditing}
            variant={editing && tempTitle !== title ? 'active' : 'default'}
          >
            {editing ? (tempTitle !== title ? 'SAVE' : 'CLOSE') : 'Edit'}
          </SmallButton>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.legend}>
        <View style={styles.mins}>
          <Text style={styles.legendText}>Mins</Text>
        </View>
        <View style={styles.weight}>
          <Text style={styles.legendText}>Weight</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: Borders.radius.xl,
    borderWidth: Borders.widths.thin,
    borderColor: Colors.grey200,
    backgroundColor: Colors.white,
  },
  exerciseTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  titleText: {
    ...Typography.googleSansCode.smRegular,
    fontSize: 14,
    lineHeight: 20,
    padding: 0,
  },
  inputWrapper: {
    height: 20, // stessa altezza del Text normale
    justifyContent: 'center', // centra verticalmente il TextInput
    flexShrink: 1,
  },
  input: {
    ...Typography.googleSansCode.smRegular,
    fontSize: 14,
    lineHeight: 20,
    textTransform: 'uppercase',
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginVertical: 0,
    textAlignVertical: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.grey200,
    alignSelf: 'stretch',
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  legend: {
    display: 'flex',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  legendText: {
    ...Typography.googleSansCode.xsRegular,
    color: Colors.grey600,
    textAlign: 'center',
    fontWeight: '500',
  },
  mins: {
    display: 'flex',
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weight: {
    display: 'flex',
    width: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
