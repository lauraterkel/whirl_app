import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import Med from '../components/font/Med';
import Bold from '../components/font/Bold';
import Reg from '../components/font/Reg';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginScreen() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Fejl', 'Udfyld venligst alle felter');
      return;
    }

    setIsLoading(true);
    try {
      // Here you would typically verify credentials with a backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      // If remember me is checked, save the email
      if (formData.rememberMe) {
        await AsyncStorage.setItem('rememberedEmail', formData.email);
      } else {
        await AsyncStorage.removeItem('rememberedEmail');
      }

      router.push('../dashboard');
    } catch (error) {
      Alert.alert('Fejl', 'Fejl ved login forsøg. Prøv igen.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const loadRememberedEmail = async () => {
      try {
        const rememberedEmail = await AsyncStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
          setFormData(prev => ({ ...prev, email: rememberedEmail, rememberMe: true }));
        }
      } catch (error) {
        console.error('Error loading remembered email:', error);
      }
    };
    loadRememberedEmail();
  }, []);



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.logoWrapper}>
        <Image
          source={require('../assets//images/logo.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.content}>
        <Med style={styles.h1}>Log ind</Med>

        <View style={styles.form}>
          <Bold style={styles.label}>
            E-mail
            <Text style={styles.required}> *</Text>
          </Bold>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#A0A0A0"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />

          <Bold style={styles.label}>Kodeord
            <Text style={styles.required}> *</Text>
          </Bold>

          <TextInput
            style={styles.input}
            placeholder="Kodeord"
            placeholderTextColor="#A0A0A0"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
          />

          <View style={styles.checkboxContainer}>
            <View
              style={[
                styles.customCheckboxWrapper,
                {
                  backgroundColor: formData.rememberMe ? '#051B2F' : '#F8F5F2',
                  borderColor: formData.rememberMe ? '#051B2F' : '#051B2F',
                  borderWidth: 2,
                },
              ]}
            >
              <Checkbox
                status={formData.rememberMe ? 'checked' : 'unchecked'}
                onPress={() =>
                  setFormData({ ...formData, rememberMe: !formData.rememberMe })
                }
                color="#F8F5F2" // checkmark color when checked
                uncheckedColor="#051B2F" // checkmark color when unchecked
              />
            </View>
            <Reg style={styles.checkboxLabel}>Husk mig</Reg>
          </View>





          <View style={{ marginTop: 16 }}>
            <Reg style={styles.loginText}>
              Har du ikke en profil?{' '}</Reg>
            <Link href="/createprofile">
              <Med style={[styles.loginText, { textDecorationLine: 'underline' }]}>
                Opret profil her
              </Med>
            </Link>
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Med style={styles.buttonText}>
              {isLoading ? 'Logger ind...' : 'Log ind'}
            </Med>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  logoWrapper: {
    alignItems: 'flex-start',
    marginLeft: 24,
    marginTop: 70,
    marginBottom: 8,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAF7F4'
  },
  content: {
    flex: 1,
    padding: 24,
  },
  label: {
    marginBottom: 6,
    marginTop: 12,
    fontSize: 16,
  },

  required: {
    color: '#FF5454',
  },
  form: {
    width: '100%',

  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#A6A7AB'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
  },
  button: {
    backgroundColor: '#00192D',
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 150,
    marginTop: 185,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FCFBF9',
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 16,
    alignItems: 'flex-start',
  },
  forgotPasswordText: {
    color: '#00192D',
    fontSize: 14,
  },

  createProfileText: {
    color: '#00192D',
    fontSize: 14,
  },

  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  h1: {
    marginBottom: 30,
    fontSize: 34,
    letterSpacing: -1,
  },
  checkboxWrapper: {
    borderRadius: 8,
    padding: 8,
    marginTop: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: -8,
  },
  checkboxBackground: {
    borderRadius: 4,
    padding: 0, // juster padding hvis du vil have mere "ramme" om checkboxen
  },
  checkboxLabel: {
    marginLeft: 4,
    fontSize: 14,
  },
  customCheckboxWrapper: {
    borderWidth: 1.5,
    borderRadius: 4,
    padding: 2,
    transform: [{ scale: 0.6 }]
  },  
  loginText: {
    fontSize: 14,
  },
  checkmark: {
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
  },
}); 