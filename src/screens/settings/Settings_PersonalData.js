import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Text,
  Dimensions,
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

import ArrowLeftIcon from '../../icons/arrowleft';
import PickerInput from '../../components/pickerinput';

const window = Dimensions.get('window');

export default function PersonalDataSettings() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const initialData = {
    name: 'John Doe',
    age: '30',
    height: '180',
    weight: '75',
    gender: 'Male',
  };

  const [name, setName] = useState(initialData.name);
  const [age, setAge] = useState(initialData.age);
  const [height, setHeight] = useState(initialData.height);
  const [weight, setWeight] = useState(initialData.weight);
  const [gender, setGender] = useState(initialData.gender);

  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const openGenderSheet = () => setBottomSheetOpen(true);
  const closeGenderSheet = () => setBottomSheetOpen(false);

  const [modified, setModified] = useState(false);

  useEffect(() => {
    const isModified =
      name !== initialData.name ||
      age !== initialData.age ||
      height !== initialData.height ||
      weight !== initialData.weight ||
      gender !== initialData.gender;

    setModified(isModified);
  }, [name, age, height, weight, gender]);

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { paddingBottom: insets.bottom, backgroundColor: Colors.white },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 48 : 32}
    >
      <Navigation
        leftContent={<ArrowLeftIcon />}
        onLeftClick={() => navigation.goBack()}
        showCenter={true}
        centerContent={
          <Image
            source={require('../../assets/images/logo_text.png')}
            style={styles.logo}
          />
        }
      />

      <View style={styles.content}>
        {/* Container inputs con flex-start */}
        <View style={styles.inputsContainer}>
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
            defaultIndex={parseInt(initialData.age, 10) - 1}
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
            style={styles.input}
            defaultIndex={parseInt(initialData.height, 10) - 110}
          />

          <PickerInput
            label="Weight"
            value={weight}
            onValueChange={setWeight}
            unitTitle="Weight"
            placeholder="How much do you weigh?"
            min={30}
            max={199}
            unitText="KG"
            style={styles.input}
            defaultIndex={parseInt(initialData.weight, 10) - 30}
          />

          <DropdownInput
            label="Gender"
            placeholder="What's your gender?"
            value={gender}
            onPress={openGenderSheet}
            style={styles.input}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            variant="primary"
            style={styles.button}
            disabled={!modified}
            onPress={() => {
              alert(
                `Name: ${name}\nAge: ${age}\nHeight: ${height}\nWeight: ${weight}\nGender: ${gender}`,
              );
            }}
          >
            SAVE CHANGES
          </Button>
        </View>
      </View>

      <BottomSheet
        open={bottomSheetOpen}
        onClose={closeGenderSheet}
        title="Gender"
      >
        <InputOptionBottomsheet
          id="male"
          label="Male"
          selected={gender === 'Male'}
          onChange={() => setGender('Male')}
        />
        <InputOptionBottomsheet
          id="female"
          label="Female"
          selected={gender === 'Female'}
          onChange={() => setGender('Female')}
        />
        <InputOptionBottomsheet
          id="other"
          label="Other"
          selected={gender === 'Other'}
          onChange={() => setGender('Other')}
        />
        <InputOptionBottomsheet
          id="preferNot"
          label="Prefer not to say"
          selected={gender === 'Prefer not to say'}
          onChange={() => setGender('Prefer not to say')}
        />
      </BottomSheet>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
  },
  logo: {
    width: 270,
    height: 40,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
    justifyContent: 'space-between',
  },
  hero: {
    paddingBottom: Spacing.xxl,
  },
  heroTitle: {
    ...Typography.robotoSerif.mdRegular,
    color: Colors.darkBlue,
  },
  inputsContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  input: {
    width: '100%',
  },
  buttonsContainer: {
    width: '100%',
    marginTop: Spacing.xl,
  },
  button: {
    width: '100%',
  },
});
