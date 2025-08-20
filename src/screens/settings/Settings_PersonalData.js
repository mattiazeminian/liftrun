import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Text,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TextInput from '../../components/textinput';
import DropdownInput from '../../components/dropdowninput';
import BottomSheet from '../../components/bottomsheet';
import InputOptionBottomsheet from '../../components/inputbottomsheet';
import Button from '../../components/button';
import Navigation from '../../components/navigation';

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';
import Typography from '../../variables/typography';

import ArrowLeftIcon from '../../icons/arrowleft';  // Cambiato import icona
import PickerInput from '../../components/picker';

export default function PersonalDataSettings() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');

  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const openGenderSheet = () => setBottomSheetOpen(true);
  const closeGenderSheet = () => setBottomSheetOpen(false);

  const allFieldsFilled =
    name.trim() !== '' &&
    age.trim() !== '' &&
    height.trim() !== '' &&
    weight.trim() !== '' &&
    gender.trim() !== '';

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
        backgroundColor: Colors.white,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 48 : 32}
    >
      {/* Navigation con ArrowLeft */}
      <Navigation
        leftContent={<ArrowLeftIcon />}
        onLeftClick={() => navigation.goBack()}
        showCenter={true}
        centerContent={
          <Image
            source={require('../../assets/images/logo_text.png')}
            style={{ width: 270, height: 40, resizeMode: 'contain' }}
          />
        }
      />

      <ScrollView
        contentContainerStyle={[styles.content, { flexGrow: 1 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Hero testo allineato a sinistra */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Personal Data</Text>
        </View>

        <TextInput
          label="Name"
          placeholder="What's your name?"
          value={name}
          onChangeText={setName}
          keyboardType="default"
          style={styles.input}
        />

        <PickerInput
          label="Age"
          value={age}
          onValueChange={setAge}
          unitTitle="Age"
          placeholder="How old are you?"
          min={1}
          max={99}
          unitText="YRS"
          style={styles.input}
          defaultIndex={19}
        />

        <PickerInput
          label="Height"
          value={height}
          onValueChange={setHeight}
          unitTitle="Height"
          placeholder="How tall are you?"
          min={110}
          max={250}
          unitText="CM"
          defaultIndex={50}
          style={styles.input}
        />

        <PickerInput
          label="Weight"
          value={weight}
          onValueChange={setWeight}
          unitTitle="Weight"
          placeholder="How much do you weigh?"
          min={30}
          max={199}
          defaultIndex={40}
          unitText="KG"
          style={styles.input}
        />

        <DropdownInput
          label="Gender"
          placeholder="What's your gender?"
          value={gender}
          onPress={openGenderSheet}
          style={styles.input}
        />

        <Button
          variant="primary"
          style={styles.button}
          disabled={!allFieldsFilled}
          onPress={() => {
            alert(
              `Name: ${name}\nAge: ${age}\nHeight: ${height}\nWeight: ${weight}\nGender: ${gender}`,
            );
          }}
        >
          SAVE
        </Button>
      </ScrollView>

      <BottomSheet open={bottomSheetOpen} onClose={closeGenderSheet} title="Gender">
        <InputOptionBottomsheet
          id="male"
          label="Male"
          selected={gender === 'Male'}
          onChange={() => {
            setGender('Male');
          }}
        />
        <InputOptionBottomsheet
          id="female"
          label="Female"
          selected={gender === 'Female'}
          onChange={() => {
            setGender('Female');
          }}
        />
        <InputOptionBottomsheet
          id="other"
          label="Other"
          selected={gender === 'Other'}
          onChange={() => {
            setGender('Other');
          }}
        />
        <InputOptionBottomsheet
          id="preferNot"
          label="Prefer not to say"
          selected={gender === 'Prefer not to say'}
          onChange={() => {
            setGender('Prefer not to say');
          }}
        />
      </BottomSheet>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  hero: {
    flexDirection: 'column',
    justifyContent: 'flex-start', // allineato a sinistra verticalmente
    alignItems: 'flex-start', // allineato a sinistra orizzontalmente
    marginBottom: Spacing.xl,
  },
  heroTitle: {
    color: Colors.darkBlue,
    ...Typography.robotoSerif.mdRegular,
  },
  input: {
    width: '100%',
    marginBottom: Spacing.none,
  },
  button: {
    marginTop: Spacing.xxl,
  },
});
