import { Feather } from '@expo/vector-icons';
import { Stack, router } from "expo-router";
import { Pressable, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PaperProvider } from 'react-native-paper';
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_500Medium, Inter_600SemiBold, } from '@expo-google-fonts/inter';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null; // Vis evt. en loader her, hvis ønsket
  }

  return (
    <PaperProvider>
      <LinearGradient
        colors={['#C5E3E3', '#F1E3C5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="dashboard" options={{ headerShown: false }} />
          <Stack.Screen name="createprofile" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding/step1" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding/step2" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding/step3" options={{ headerShown: false }} />

          {[
            { name: "profile", title: "Profil" },
            { name: "chat", title: "Chat" },
            { name: "ovelser", title: "Favoritøvelser" },
            { name: "kalender", title: "Kalender" },
            { name: "breath", title: "Øvelse" },
          ].map(({ name, title }) => (
            <Stack.Screen
              key={name}
              name={name}
              options={{
                headerTitle: title,
                headerTitleStyle: { fontFamily: 'Inter_700Bold' },
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
          ))}
        </Stack>
      </LinearGradient>
    </PaperProvider>
  );
}