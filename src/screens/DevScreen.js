import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../components/button';
import SmallButton from '../components/buttonsmall';
import CustomCheckbox from '../components/checkbox';
import CustomRadio from '../components/radio';
import TextInput from '../components/textinput';
import DropdownInput from '../components/dropdowninput';
import BottomSheet from '../components/bottomsheet';
import InputOptionBottomsheet from '../components/inputbottomsheet';
import Navigation from '../components/navigation';
import NavigationProgress from '../components/navigationprogress';
import CustomSlider from '../components/slider';
import { KeyboardAvoidingView, Platform } from 'react-native';

import Colors from '../variables/colors';

import ArrowLeft from '../icons/arrowleft';
import SettingsIcon from '../icons/settingsicon';

export default function DevScreen() {
  // Stato di esempio per progress (da 0 a 1)
  const [progress, setProgress] = React.useState(0.2);

  // Stati dei text input
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // Stato dropdown
  const [selectedCountry, setSelectedCountry] = useState('');

  // Stato apertura BottomSheet
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  // Stati per 4 checkbox (array o singoli stati)
  const [checkboxes, setCheckboxes] = useState([false, false, false, false]);

  // Stato per gruppo radio (stringa / numero / valore univoco)
  const [selectedRadio, setSelectedRadio] = useState(null);

  // Nuovo stato per slider
  const [sliderValue, setSliderValue] = useState(50);

  const toggleCheckbox = index => {
    setCheckboxes(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <>
      {/* Navigation fixa in alto */}
      <Navigation
        leftContent={<ArrowLeft></ArrowLeft>}
        rightContent={<SettingsIcon></SettingsIcon>}
        onLeftClick={() => {
          alert('Left premuto');
        }}
        onRightClick={() => {
          alert('Right premuto');
        }}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={24} // <--- margine extra sopra la tastiera
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={[styles.contentContainer]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Esempi di bottoni con varianti e stato disabled */}
          <Text style={styles.sectionTitle}>Button Regular</Text>
          <Button variant="primary" onClick={() => alert('Primario premuto')}>
            SIGN IN
          </Button>

          <Button
            variant="secondary"
            style={styles.button}
            onClick={() => alert('Secondario premuto')}
          >
            SIGN UP
          </Button>

          <Button
            variant="tertiary"
            style={styles.button}
            onClick={() => alert('Terziario premuto')}
          >
            Terziario
          </Button>

          {/* Small buttons */}
          <Text style={styles.sectionTitle}>Small Buttons</Text>

          <SmallButton variant="default" onPress={() => alert('Small Default')}>
            EDIT
          </SmallButton>

          <SmallButton variant="active" onPress={() => alert('Small Active')}>
            DONE
          </SmallButton>

          <SmallButton variant="danger" onPress={() => alert('Small Danger')}>
            REMOVE
          </SmallButton>

          {/* DROPDOWN */}
          <Text style={styles.sectionTitle}>Dropdown Input</Text>
          <DropdownInput
            label="Paese"
            placeholder="Seleziona paese"
            value={selectedCountry}
            // Qui in futuro aprirai la BottomSheet
            onPress={() => setBottomSheetOpen(true)}
          />

          {/* TEXTINPUT */}
          <Text style={styles.sectionTitle}>Text Inputs</Text>
          <TextInput
            label="Username"
            placeholder="Inserisci il tuo nome"
            value={username}
            onChangeText={setUsername}
            keyboardType="default"
            statusIconCustom={<ArrowLeft></ArrowLeft>}
          />

          <TextInput
            label="Email"
            placeholder="Inserisci email"
            value={email}
            onChangeText={setEmail}
            errorMessage={
              email.length > 0 && !email.includes('@') ? 'Email non valida' : ''
            }
          />

          <TextInput
            label="Disabilitato"
            value="Non modificabile"
            onChangeText={() => {}}
            disabled
          />

          {/* ===== CUSTOM SLIDER ===== */}
          <Text style={styles.sectionTitle}>Custom Slider</Text>
          <CustomSlider
            label="Volume"
            value={sliderValue}
            onValueChange={setSliderValue}
            min={0}
            max={7}
            step={1}
            style={{ width: '100%' }}
          />

          <Text>Valore slider: {sliderValue}</Text>

          {/* CHECKBOX GROUP */}
          <Text style={styles.sectionTitle}>Checkbox Group</Text>

          {['Opzione A', 'Opzione B', 'Opzione C', 'Opzione D'].map(
            (label, index) => (
              <CustomCheckbox
                key={index}
                label={label}
                checked={checkboxes[index]}
                onChange={() => toggleCheckbox(index)}
                style={styles.checkbox}
              />
            ),
          )}

          {/* RADIO GROUP */}
          <Text style={styles.sectionTitle}>Radio Group</Text>

          {['Scelta 1', 'Scelta 2', 'Scelta 3', 'Scelta 4'].map(
            (label, index) => (
              <CustomRadio
                key={index}
                label={label}
                selected={selectedRadio === index}
                onChange={() => setSelectedRadio(index)}
                style={styles.radio}
              />
            ),
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* BottomSheet */}
      <BottomSheet
        open={bottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        title="Seleziona un paese"
      >
        {/* Qui puoi mettere il contenuto della bottom sheet,
                ad esempio una lista di paesi cliccabili */}
        <InputOptionBottomsheet
          id="it"
          label="Italia"
          selected={selectedCountry === 'Italia'}
          onChange={() => setSelectedCountry('Italia')}
        />
        <InputOptionBottomsheet
          id="fr"
          label="Francia"
          selected={selectedCountry === 'Francia'}
          onChange={() => setSelectedCountry('Francia')}
        />
        <InputOptionBottomsheet
          id="es"
          label="Spagna"
          selected={selectedCountry === 'Spagna'}
          onChange={() => setSelectedCountry('Spagna')}
        />
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 48,
    alignItems: 'center',
    backgroundColor: Colors.white,
    gap: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 20,
  },
  checkbox: {
    marginVertical: 4,
  },
  radio: {
    marginVertical: 4,
  },
});
