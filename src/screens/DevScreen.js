import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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
import PickerInput from '../components/pickerinput';
import ExerciseRow from '../components/exerciserow'; // Add this import
import RunningRow from '../components/runningrow'; // Add this import
import BodyweightRow from '../components/bodyweightrow'; // Add this import
import WarmUpRow from '../components/warmuprow'; // Add this import




import Colors from '../variables/colors';

import ArrowLeft from '../icons/arrowleft';
import SettingsIcon from '../icons/settingsicon';

export default function DevScreen() {
  const [progress, setProgress] = React.useState(0.2);
  const [selectedHeight, setSelectedHeight] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [checkboxes, setCheckboxes] = useState([false, false, false, false]);
  const [selectedRadio, setSelectedRadio] = useState(null);
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
      <Navigation
        leftContent={<ArrowLeft />}
        rightContent={<SettingsIcon />}
        onLeftClick={() => alert('Left premuto')}
        onRightClick={() => alert('Right premuto')}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={24}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={[styles.contentContainer]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Replace NumberInputs group with ExerciseRow */}
          <Text style={styles.sectionTitle}>Exercise Row Example</Text>
          <ExerciseRow
            initialNumber="1"
            radioSelected={selectedRadio === 0}
            onRadioChange={() => setSelectedRadio(0)}
          />

          <RunningRow
            initialNumber="1"
            radioSelected={selectedRadio === 0}
            onRadioChange={() => setSelectedRadio(0)}
          />

           <BodyweightRow
            initialNumber="1"
            radioSelected={selectedRadio === 0}
            onRadioChange={() => setSelectedRadio(0)}
          />

          <WarmUpRow
            initialNumber="50"
            radioSelected={selectedRadio === 0}
            onRadioChange={() => setSelectedRadio(0)}
          />


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

          <Text style={styles.sectionTitle}>Picker Input</Text>
          <PickerInput
            label="Altezza"
            placeholder="Seleziona altezza"
            value={selectedHeight}
            onValueChange={setSelectedHeight}
            min={110}
            max={220}
          />

          <Text style={styles.sectionTitle}>Dropdown Input</Text>
          <DropdownInput
            label="Paese"
            placeholder="Seleziona paese"
            value={selectedCountry}
            onPress={() => setBottomSheetOpen(true)}
          />

          <Text style={styles.sectionTitle}>Text Inputs</Text>
          <TextInput
            label="Username"
            placeholder="Inserisci il tuo nome"
            value={username}
            onChangeText={setUsername}
            keyboardType="default"
            statusIconCustom={<ArrowLeft />}
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

      <BottomSheet
        open={bottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        title="Seleziona un paese"
      >
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
  exerciseRowContainer: {
    flexDirection: 'row',
    width: 315,
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radioContainer: {
    width: 48,
    paddingVertical: 4,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    marginVertical: 4,
  },
  radio: {
    marginVertical: 4,
  },
});
