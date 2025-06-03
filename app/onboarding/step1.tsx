import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import Med from '../../components/font/Med';
import Reg from '../../components/font/Reg';

const methods = [
  'Eksponeringsterapi',
  'Vejrtrækningsøvelser',
  'Visualisering af ro',
  'Ingen af disse metoder',
];

export default function MethodsScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [showInfoBox, setShowInfoBox] = useState(false); // ← NYT

  useEffect(() => {
    const timer = setTimeout(() => {
      setOverlayVisible(true);
      setShowInfoBox(true); // ← Vis infoboksen efter 5 sek
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMethod = (method: string) => {
    setSelected(prev =>
      prev.includes(method)
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  return (
    <LinearGradient
      colors={['#F8F5F2','#C1E7FF','#FFA05D']}
      locations={[0, 0.8, 1]}
      style={styles.container}
    >
      <View style={styles.scroll}>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarFilled} />
        </View>

        <Med style={styles.H1}>Hvilke metoder virker for dig?</Med>
        <Reg style={styles.Cap}>Vælg flere</Reg>

        <View style={styles.optionsContainer}>
          {methods.map(method => (
            <TouchableOpacity
              key={method}
              style={[
                styles.option,
                !selected.includes(method) && styles.optionUnselected,
                selected.includes(method) && styles.optionSelected,
              ]}
              onPress={() => toggleMethod(method)}
            >
              <Reg style={styles.optionText}>{method}</Reg>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info-boks der vises efter 5 sekunder og bliver stående */}
        {showInfoBox && (
          <View style={styles.infoBoxContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.shellIcon}
              resizeMode="contain"
            />
            <View style={styles.infoBox}>
              <Reg style={styles.infoText}>
                Hvis ingen af øvelserne føles helt rigtige endnu, så bare rolig - Whirl støtter dig i at udforske, hvad der føles rigtigt for dig.
              </Reg>
            </View>
          </View>
        )}

        <View style={styles.spacer} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => router.push('../onboarding/step2')} style={styles.button}>
          <Med style={styles.buttonLabel}>Næste</Med>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('../onboarding/step2')}>
          <Reg style={styles.skipText}>Skip</Reg>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingTop: 70,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E6E6E6',
    borderRadius: 2,
    marginBottom: 30,
  },
  progressBarFilled: {
    height: 4,
    width: '33%',
    backgroundColor: '#051B2F',
    borderRadius: 2,
  },
  H1: {
    fontSize: 32,
    marginBottom: 24,
    letterSpacing: -1,
  },
  Cap: {
    fontSize: 14,
    color: '#797979',
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 14,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 26,
    backgroundColor: '#FCFBF9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  optionSelected: {
    borderColor: '#2C2E33',
  },
  optionUnselected: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  spacer: {
    height: 100, // Add space for the button
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingLeft: 20,
  },
  button: {
    backgroundColor: '#051B2F',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#FCFBF9',
    fontSize: 16,
  },
  skipText: {
    marginTop: 8,
    color: '#777',
  },
  // Infoboks-styling
  infoBoxContainer: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#DFEFF9',
    padding: 16,
    borderRadius: 16,
    marginBottom: 28,
    marginTop: 45,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4.5,
      },
    }),
  },
  shellIcon: {
    width: 45,
    height: 45,
  },
  infoBox: {
    flex: 1,
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#4A3F2A',
  },
});