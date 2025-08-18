import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform } from 'react-native';

import Spacing from '../variables/spacing';
import Typography from '../variables/typography';
import Colors from '../variables/colors';

import Button from '../components/button';
import TextInput from '../components/textinput';
import PickerInput from '../components/picker';

import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const window = Dimensions.get('window');

export default function Login() {
  const navigation = useNavigation();
  const [age, setAge] = useState(''); // <-- qui dichiari age

  const [showSignUpButton, setShowSignUpButton] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateEmail(text) {
    const lowerText = text.toLowerCase();
    setEmail(lowerText);

    if (lowerText.length === 0) {
      setEmailError('');
    } else if (!isEmailValid(lowerText)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  }

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

  function isPasswordValid(password) {
    return password.length >= 8;
  }

  const isButtonDisabled = !(isEmailValid(email) && isPasswordValid(password));

  async function handleLogin() {
    setIsLoading(true);
    setShowSignUpButton(false); // resetto il pulsante
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('IntroOnboarding');
    } catch (error) {
      console.log('Login error code:', error.code);
      if (error.code === 'auth/user-not-found') {
        navigation.navigate('SignUp', { prefilledEmail: email });
      } else if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-credential'
      ) {
        // Mostro il pulsante sign up invece di alert
        setShowSignUpButton(true);
        Alert.alert(
          'Login Error',
          'Please check your credentials or create a new account',
        );
      } else {
        Alert.alert('Errore Login', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.hero}>
              <Text style={styles.heroTitle}>
                Let’s get {'\n'}
                started. {'\n'}
                We missed you.
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              label="Email"
              placeholder="What's your email?"
              value={email}
              autoComplete="on"
              onChangeText={validateEmail}
              keyboardType="email-address"
              errorMessage={emailError}
            />
            <TextInput
              label="Password"
              placeholder="What's your password?"
              value={password}
              onChangeText={validatePassword}
              secureTextEntry
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              errorMessage={passwordError}
            />
            <PickerInput
              label="Età"
              value={age}
              onChangeText={setAge}
              placeholder="Seleziona età"
              options={[...Array(100).keys()].map(n => ({
                label: String(n),
                value: String(n),
              }))}
            />

            <Button
              variant="primary"
              onPress={handleLogin}
              disabled={isButtonDisabled || isLoading}
              loading={isLoading}
              style={[styles.button, { marginTop: Spacing.md }]}
            >
              SIGN IN
            </Button>
            {showSignUpButton && (
              <Button
                variant="secondary"
                onPress={() =>
                  navigation.navigate('SignUp', { prefilledEmail: email })
                }
                style={[styles.button, { marginTop: Spacing.sm }]}
              >
                SIGN UP
              </Button>
            )}
          </View>

          <Text style={styles.disclaimer}>
            By signin into our app, you agree to our{' '}
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
