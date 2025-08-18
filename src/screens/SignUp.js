import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform } from 'react-native';

import Spacing from '../variables/spacing';
import Typography from '../variables/typography';
import Colors from '../variables/colors';

import Button from '../components/button';
import TextInput from '../components/textinput';

// Import Firebase
import { auth, db } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const window = Dimensions.get('window');

export default function SignUpScreen() {
  const navigation = useNavigation();

  // Stati
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Handler validazione email
  function isEmailValid(email) {
    // Controlla presenza di una @ e qualcosa dopo (es. dominio)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function validateEmail(text) {
    const lowerText = text.toLowerCase();
    setEmail(lowerText);

    if (lowerText.length === 0) {
      setEmailError('');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lowerText)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  }

  // Handler validazione password
  function validatePassword(text) {
    setPassword(text);
    if (text.length === 0) {
      setPasswordError('');
    } else if (text.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError('');
    }
  }

  // Funzioni pure di validità (NON fanno setState)
  function isEmailValid(email) {
    return email.length > 0 && email.includes('@');
  }

  function isPasswordValid(password) {
    return password.length >= 8;
  }

  const isButtonDisabled = !(isEmailValid(email) && isPasswordValid(password));
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignUp() {
    console.log('handleSignUp called');
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log('User created:', userCredential.user.uid);

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        createdAt: new Date(),
      });

      navigation.navigate('IntroOnboarding', { uid: userCredential.user.uid });
    } catch (error) {
      console.error('Sign up error:', error.code, error.message);
      Alert.alert('Error signing up', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10} // o altro valore per margine sotto tastiera
    >
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Container logo + hero */}
          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <View style={styles.hero}>
              <Text style={styles.heroTitle}>
                Let’s get {'\n'}
                started.
              </Text>
            </View>
          </View>

          {/* InputText and Button */}
          <View style={styles.inputContainer}>
            <TextInput
              label="Email"
              placeholder="What's your email?"
              value={email}
              onChangeText={validateEmail}
              autoComplete="on"
              keyboardType="email-address"
              errorMessage={emailError}
            />
            <TextInput
              label="Password"
              placeholder="Choose a password"
              value={password}
              onChangeText={validatePassword}
              secureTextEntry={true}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              errorMessage={passwordError}
            />

            <Button
              variant="primary"
              onPress={handleSignUp}
              disabled={isButtonDisabled || isLoading}
              loading={isLoading}
              style={[styles.button, { marginTop: Spacing.md }]}
            >
              SIGN UP
            </Button>
          </View>

          <Text style={styles.disclaimer}>
            By creating an account, you agree to our{' '}
            <Text
              style={styles.linkText}
              onPress={() => {
                /* apri Terms */
              }}
            >
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text
              style={styles.linkText}
              onPress={() => {
                /* apri Privacy */
              }}
            >
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingTop: 92,
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.md,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: Spacing.xxl,
  },
  logo: {
    width: 210,
    height: 60,
  },
  hero: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  heroTitle: {
    textAlign: 'center',
    ...Typography.robotoSerif.displayMdRegular,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: Spacing.m,
  },
  disclaimer: {
    ...Typography.manrope.xsRegular,
    textAlign: 'center',
  },
  linkText: {
    textDecorationLine: 'underline',
  },
});
