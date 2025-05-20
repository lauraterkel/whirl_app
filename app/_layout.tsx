import { Feather } from '@expo/vector-icons';
import { Stack, router } from "expo-router";
import { Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RootLayout() {
  return (
    <LinearGradient
      colors={['#C5E3E3', '#F1E3C5']} // Tilpas farverne efter dit design
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <Stack>
        <Stack.Screen name="index"
          options={{ headerShown: false }} 
        />

        <Stack.Screen name="profile"
          options={{
            headerTitle: "Profil",
            headerLeft: () => (
              <Pressable 
                style={{
                  marginLeft: 0,
                  marginTop: 8,
                  marginBottom: 8,
                  width: 44,
                  height: 44,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={() => router.back()}
              >
                <Feather name="chevron-left" size={24} color="#051B2F" />
              </Pressable>
            ),
          }}
        />
        

        <Stack.Screen name="chat"
          options={{
            headerTitle: "Chat",
            headerLeft: () => (
              <Pressable 
                style={{
                  marginLeft: 0,
                  marginTop: 8,
                  marginBottom: 8,
                  width: 44,
                  height: 44,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={() => router.back()}
              >
                <Feather name="chevron-left" size={24} color="#051B2F" />
              </Pressable>
            ),
          }}
        />

        <Stack.Screen name="ovelser"
          options={{
            headerTitle: "Favoritøvelser",
            headerLeft: () => (
              <Pressable 
                style={{
                  marginLeft: 0,
                  marginTop: 8,
                  marginBottom: 8,
                  width: 44,
                  height: 44,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={() => router.back()}
              >
                <Feather name="chevron-left" size={24} color="#051B2F" />
              </Pressable>
            ),
          }}
        />

        <Stack.Screen name="kalender"
          options={{
            headerTitle: "Kalender",
            headerLeft: () => (
              <Pressable 
                style={{
                  marginLeft: 0,
                  marginTop: 8,
                  marginBottom: 8,
                  width: 44,
                  height: 44,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={() => router.back()}
              >
                <Feather name="chevron-left" size={24} color="#051B2F" />
              </Pressable>
            ),
          }}
        />
      </Stack>
    </LinearGradient>
  );
}
