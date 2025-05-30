import { router } from 'expo-router';
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
  ScrollView,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import Med from '../components/font/Med';
import Bold from '../components/font/Bold';
import Reg from '../components/font/Reg';

interface ProfileData {
  username: string;
  email: string;
  password: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

export default function CreateProfileScreen() {
  const [formData, setFormData] = useState<ProfileData>({
    username: '',
    email: '',
    password: '',
    acceptTerms: false,
    acceptPrivacy: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateProfile = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      Alert.alert('Fejl', 'Udfyld venligst alle felter');
      return;
    }

    if (!formData.acceptTerms || !formData.acceptPrivacy) {
      Alert.alert('Fejl', 'Du skal acceptere både vilkår og samtykke for at oprette en profil');
      return;
    }

    setIsLoading(true);
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify({
        username: formData.username,
        email: formData.email,
      }));

      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('../onboarding/step1');
    } catch (error) {
      Alert.alert('Fejl', 'Fejl ved oprettelse af profil. Prøv igen.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar style="light" />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoWrapper}>
          <Image
            source={require('../assets//images/logo.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.content}>
          <Med style={styles.h1}>Opret profil</Med>

          <View style={styles.form}>
            <Bold style={styles.label}>
              Brugernavn
              <Text style={styles.required}> *</Text>
            </Bold>
            <TextInput
              style={styles.input}
              placeholder="Brugernavn"
              placeholderTextColor="#A0A0A0"
              keyboardType="default"
              autoCapitalize="none"
              value={formData.username}
              onChangeText={(text) => setFormData({ ...formData, username: text })}
            />
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
            <Text style={styles.helptext}>Minimum 8 tegn</Text>
            <TextInput
              style={styles.input}
              placeholder="Kodeord"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
            />

            {/* Checkbox: Vilkår og betingelser */}
            <View style={styles.checkboxContainer}>
              <View
                style={[
                  styles.customCheckboxWrapper,
                  {
                    backgroundColor: formData.acceptTerms ? '#051B2F' : '#F8F5F2',
                    borderColor: '#051B2F',
                    transform: [{ scale: 0.6 }],
                  },
                ]}
              >
                <Checkbox
                  status={formData.acceptTerms ? 'checked' : 'unchecked'}
                  onPress={() => setFormData({ ...formData, acceptTerms: !formData.acceptTerms })}
                  color="#F8F5F2"
                  uncheckedColor="#051B2F"
                />
              </View>
              <Reg style={styles.checkboxLabel}>
                Jeg accepterer vilkår og betingelser
              </Reg>
            </View>

            {/* Checkbox: Samtykke til opbevaring */}
            <View style={styles.checkboxContainer}>
              <View
                style={[
                  styles.customCheckboxWrapper,
                  {
                    backgroundColor: formData.acceptPrivacy ? '#051B2F' : '#F8F5F2',
                    borderColor: '#051B2F',
                    transform: [{ scale: 0.6 }]
                  },
                ]}
              >
                <Checkbox
                  status={formData.acceptPrivacy ? 'checked' : 'unchecked'}
                  onPress={() => setFormData({ ...formData, acceptPrivacy: !formData.acceptPrivacy })}
                  color="#F8F5F2"
                  uncheckedColor="#051B2F"
                />
              </View>
              <Reg style={styles.checkboxLabel}>
                Jeg samtykker til, at whirl må gemme mine oplysninger
              </Reg>
            </View>

            <View style={{ marginTop: 16 }}>
              <Reg style={styles.loginText}>
                Har du allerede en profil?{' '}
              </Reg>
              <Link href="/login">
                <Med style={[styles.loginText, { textDecorationLine: 'underline' }]}>
                  Log ind her
                </Med>
              </Link>
            </View>

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleCreateProfile}
              disabled={isLoading}
            >
              <Med style={styles.buttonText}>
                {isLoading ? 'Opretter...' : 'Opret profil'}
              </Med>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F4'
  },
  scrollContent: {
    flexGrow: 1,
  },
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
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  h1: {
    marginBottom: 30,
    fontSize: 34,
    letterSpacing: -1,
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
  button: {
    backgroundColor: '#00192D',
    borderRadius: 32,
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 150,
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FCFBF9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxWrapper: {
    borderRadius: 8,
    padding: 8,
    marginTop: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
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
  helptext:{
    fontSize: 12,
    color: '#797979',
    marginBottom: 6,
  },
});