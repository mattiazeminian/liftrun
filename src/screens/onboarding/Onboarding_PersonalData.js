import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TextInput from '../../components/textinput';
import DropdownInput from '../../components/dropdowninput';
import BottomSheet from '../../components/bottomsheet';
import InputOptionBottomsheet from '../../components/inputbottomsheet';
import Button from '../../components/button';
import HeaderOnboarding from '../../components/headeronboarding';

import Colors from '../../variables/colors';
import Spacing from '../../variables/spacing';

import IdIcon from '../../icons/idicon';
import CmIcon from '../../icons/cmicon';
import KgIcon from '../../icons/kgicon';

import PickerInput from '../../components/pickerinput'; // import tuo picker

export default function PersonalDataForm() {
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
        paddingTop: 0,
        paddingBottom: insets.bottom,
        backgroundColor: Colors.white,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 48 : 32}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerText}>
          <HeaderOnboarding
            iconSource={<IdIcon />}
            title="Just a few personal details"
            description="For accurate recommendations and tracking."
          />
        </View>

        <TextInput
          label="Name"
          placeholder="What's your name?"
          value={name}
          onChangeText={setName}
          keyboardType="default"
          statusIconCustom={null}
          style={styles.input}
        />

        {/*Age con PickerInput */}
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

        {/*Height con PickerInput */}
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

        {/*Weight con PickerInput */}
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
          IT'S DONE
        </Button>
      </ScrollView>

      <BottomSheet
        open={bottomSheetOpen}
        onClose={closeGenderSheet}
        title="Gender"
      >
        <InputOptionBottomsheet
          id="male"
          label="Male"
          selected={gender === 'Male'}
          onChange={() => {
            setGender('Male');
            //closeGenderSheet();
          }}
        />
        <InputOptionBottomsheet
          id="female"
          label="Female"
          selected={gender === 'Female'}
          onChange={() => {
            setGender('Female');
            //closeGenderSheet();
          }}
        />
        <InputOptionBottomsheet
          id="other"
          label="Other"
          selected={gender === 'Other'}
          onChange={() => {
            setGender('Other');
            //closeGenderSheet();
          }}
        />
        <InputOptionBottomsheet
          id="preferNot"
          label="Prefer not to say"
          selected={gender === 'Prefer not to say'}
          onChange={() => {
            setGender('Prefer not to say');
            //closeGenderSheet();
          }}
        />
      </BottomSheet>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.md,
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  input: {
    width: '100%',
    marginBottom: 0,
  },
  button: {
    width: '100%',
    marginTop: Spacing.xxl,
  },
});
