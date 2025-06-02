import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // til ikoner
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Med from '../components/font/Med';
import Bold from '../components/font/Bold';

interface UserProfile {
  username: string;
  email: string;
}

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    email: '',
  });
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profileData = await AsyncStorage.getItem('userProfile');
      if (profileData) {
        setProfile(JSON.parse(profileData));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      Alert.alert('Fejl', 'Kunne ikke indlæse profil');
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = async () => {
    if (!profile.username.trim()) {
      Alert.alert('Fejl', 'Brugernavn kan ikke være tomt');
      return;
    }

    if (!validateEmail(profile.email)) {
      Alert.alert('Fejl', 'Indtast venligst en gyldig e-mail adresse');
      return;
    }

    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      setIsEditing(false);
      Alert.alert('Succes', 'Profil opdateret');
    } catch (error) {
      Alert.alert('Fejl', 'Kunne ikke gemme profil');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Log ud',
      'Er du sikker på, at du vil logge ud?',
      [
        {
          text: 'Annuller',
          style: 'cancel',
        },
        {
          text: 'Log ud',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userProfile');
              navigation.navigate('login' as never);
            } catch (error) {
              Alert.alert('Fejl', 'Kunne ikke logge ud');
            }
          },
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#F8F5F2', '#C1E7FF', '#FFA05D']}
      locations={[0, 0.8, 1]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.content}>
              <Med style={styles.h1}>Rediger oplysninger</Med>

              <Bold style={styles.label}>Kaldenavn</Bold>
              <TextInput
                style={styles.input}
                value={profile.username}
                onChangeText={(text) => {
                  setProfile({ ...profile, username: text });
                  setIsEditing(true);
                }}
                placeholder="Indtast kaldenavn"
                editable={true}
              />

              <Bold style={styles.label}>E-mail</Bold>
              <TextInput
                style={styles.input}
                value={profile.email}
                onChangeText={(text) => {
                  setProfile({ ...profile, email: text });
                  setIsEditing(true);
                }}
                placeholder="Indtast e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={true}
              />

              <Bold style={styles.label}>Kodeord</Bold>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="**********"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#777"
                  />
                </Pressable>
              </View>

              <Pressable
                style={[styles.editButton, !isEditing && styles.buttonDisabled]}
                onPress={handleSave}
                disabled={!isEditing}
              >
                <Bold style={styles.buttonText}>Gem ændringer</Bold>
              </Pressable>

              <Pressable style={styles.logoutButton} onPress={handleLogout}>
                <Bold style={styles.buttonText}>Log ud</Bold>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  h1: {
    marginTop: 24,
    fontSize: 24,
    marginBottom: 24,
    letterSpacing: -1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 22,
    color: '#1A1A1A',
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
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 3.5,
    borderWidth: 1,
    borderColor: '#A6A7AB',

  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#051B2F',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    alignSelf: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  logoutButton: {
    backgroundColor: '#051B2F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 120,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});