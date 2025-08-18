import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

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

import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export default function PersonalDataForm() {
  const navigation = useNavigation();
  const route = useRoute();

  const { uid } = route.params || {};

  // Stati campo input e altri
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');

  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [chatGptPrompt, setChatGptPrompt] = useState('');
  const [chatGptResponse, setChatGptResponse] = useState(null);
  const [loadingChatGpt, setLoadingChatGpt] = useState(false);

  const openGenderSheet = () => setBottomSheetOpen(true);
  const closeGenderSheet = () => setBottomSheetOpen(false);

  useEffect(() => {
    async function fetchUserData() {
      if (!uid) {
        setLoading(false);
        return;
      }
      try {
        const userDocRef = doc(db, 'users', uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setUserData(data);

          setName(data.name || '');
          setAge(data.age ? data.age.toString() : '');
          setHeight(data.height ? data.height.toString() : '');
          setWeight(data.weight ? data.weight.toString() : '');
          setGender(data.gender || '');

          const prompt = `
Act as a professional fitness coach. Create a personalized workout plan for the user profile below.

Instructions for output:

Show only: Exercise name — sets — reps (single number) — weight in kg

If bodyweight exercise → write BW instead of weight

If the fitness goal is running → format as: Run type — distance (km) — minutes

No explanations, no extra text, no full sentences

Keep it minimal, clear, and structured by days

User Data:
Name: ${data.name || '-'}
Age: ${data.age != null ? data.age : '-'} years
Gender: ${data.gender || '-'}
Height: ${data.height != null ? data.height : '-'} cm
Weight: ${data.weight != null ? data.weight : '-'} kg
Fitness Level: ${data.fitnessLevel || '-'}
Fitness Goal: ${data.fitnessGoal || '-'}
Training Days per Week: ${data.trainingDays != null ? data.trainingDays : '-'}
Session Duration: ${data.trainingMinutes != null ? data.trainingMinutes : '-'} minutes
Preferred Training Type: ${data.trainingType || '-'}
Available Equipment: ${data.equipment ? data.equipment.join(', ') : '-'}
`;
          setChatGptPrompt(prompt);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error('Errore caricando dati utente:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [uid]);

  const allFieldsFilled =
    name.trim() !== '' &&
    age.trim() !== '' &&
    height.trim() !== '' &&
    weight.trim() !== '' &&
    gender.trim() !== '';

  // Funzione per chiamare OpenAI ChatGPT
  async function callPerplexityApi(prompt) {
  setLoadingChatGpt(true);
  setChatGptResponse(null);

  try {
    console.log('Sending prompt to Perplexity API:', prompt);

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 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', // Put your real key here securely
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          { role: 'system', content: 'Be precise and concise.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      // Try to read error message from response
      const errorData = await response.json().catch(() => null);
      const errorMsg = errorData?.error?.message || response.statusText || 'Unknown error';
      throw new Error(`API error ${response.status}: ${errorMsg}`);
    }

    const data = await response.json();
    console.log('Raw API response data:', data);

    const content = data.choices?.[0]?.message?.content || 'No response from Perplexity API';
    setChatGptResponse(content);
  } catch (error) {
    console.error('Error calling Perplexity API:', error);
    setChatGptResponse(`Error calling Perplexity API: ${error.message}`);
  } finally {
    setLoadingChatGpt(false);
  }
}

  async function handleSubmit() {
    if (!uid || !allFieldsFilled) {
      return;
    }

    try {
      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        name,
        age: parseInt(age, 10),
        height: parseInt(height, 10),
        weight: parseInt(weight, 10),
        gender,
      });

      const datiSummary =
        `Name: ${name}\n` +
        `Age: ${age}\n` +
        `Height: ${height} cm\n` +
        `Weight: ${weight} kg\n` +
        `Gender: ${gender}`;

      setSummary(datiSummary);

      // Chiama ChatGPT con il prompt generato
      callPerplexityApi(chatGptPrompt);
    } catch (error) {
      console.error('Errore aggiornando dati personali:', error);
    }
  }

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: 'center' }}
        size="large"
      />
    );
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: Colors.white,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 48 : 32}
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
          style={styles.input}
        />

        <TextInput
          label="Age"
          placeholder="How old are you?"
          value={age}
          onChangeText={text => {
            const numericText = text.replace(/[^0-9]/g, '');
            const numericValue = parseInt(numericText) || 0;
            if (numericValue <= 99) {
              setAge(numericText);
            }
          }}
          keyboardType="numeric"
          style={styles.input}
        />

        <TextInput
          label="Height"
          placeholder="How much tall are you?"
          value={height}
          onChangeText={text => {
            const numericText = text.replace(/[^0-9]/g, '');
            const numericValue = parseInt(numericText) || 0;
            if (numericValue <= 250) {
              setHeight(numericText);
            }
          }}
          keyboardType="numeric"
          statusIconCustom={<CmIcon width={16} height={16} />}
          style={styles.input}
        />

        <TextInput
          label="Weight"
          placeholder="How much do you weight?"
          value={weight}
          onChangeText={text => {
            const numericText = text.replace(/[^0-9]/g, '');
            const numericValue = parseInt(numericText) || 0;
            if (numericValue <= 199) {
              setWeight(numericText);
            }
          }}
          keyboardType="numeric"
          statusIconCustom={<KgIcon width={24} height={24} />}
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
          disabled={!allFieldsFilled || loadingChatGpt}
          onPress={handleSubmit}
        >
          IT'S DONE
        </Button>

        {summary && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ whiteSpace: 'pre-line' }}>{summary}</Text>
          </View>
        )}

        {loadingChatGpt && (
          <ActivityIndicator style={{ marginTop: 20 }} size="small" />
        )}

        {chatGptResponse && (
          <View
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: '#f0f0f0',
              borderRadius: 5,
            }}
          >
            <Text>{chatGptResponse}</Text>
          </View>
        )}
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
