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
  'Før en eksamen eller præsentation',
  'Før sociale arrangementer',
  'Om aftenen før jeg går i seng',
  'Før skole/arbejde',
];

export default function MethodsScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [showInfoBox, setShowInfoBox] = useState(false); // ← NYT

  useEffect(() => {
    const timer = setTimeout(() => {
      setOverlayVisible(true);
      setShowInfoBox(true); // ← Vis infoboksen efter 5 sek
    }, 0);

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
      colors={['#F8F5F2', '#D9EBF7', '#EAC5A1']}
      locations={[0, 0.7, 1]}
      style={styles.container}
    >
      <View style={styles.scroll}>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarFilled} />
        </View>

        <Med style={styles.H1}>Synkronisér med din kalender</Med>

        <View style={styles.optionsContainer}>
          <Image style={styles.kalenderpic} source={require('../../assets/images/kalender.png')} />
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
                Synkronisér med din kalender, så hjælper whirl dig med at planlægge øvelser og huske dem til dine begivenheder.
              </Reg>
            </View>
          </View>
        )}

        <View style={styles.spacer} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => router.push('../dashboard')} style={styles.button}>
          <Med style={styles.buttonLabel}>Næste</Med>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('../dashboard')}>
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
    width: '100%',
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
    marginTop: 46,
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
  kalenderpic: {
    width: 'auto',
    height: 330,
    marginTop: 30,
  },
});