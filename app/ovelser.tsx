import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SectionList,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Med from '../components/font/Med';
import Bold from '../components/font/Bold';
import Reg from '../components/font/Reg';

type ExerciseTitle =
  | 'Visualisering af ro'
  | 'Vejrtrækningsøvelser'
  | 'Eksponeringsterapi'
  | 'Distraktion'
  | 'Sig angsten imod';

const allExercises: ExerciseTitle[] = [
  'Visualisering af ro',
  'Vejrtrækningsøvelser',
  'Eksponeringsterapi',
  'Distraktion',
  'Sig angsten imod',
];

export default function FavoritesScreen() {
  const navigation = useNavigation();

  const [favorites, setFavorites] = useState<Record<ExerciseTitle, boolean>>({
    'Visualisering af ro': false,
    'Vejrtrækningsøvelser': true,
    'Eksponeringsterapi': false,
    'Distraktion': true,
    'Sig angsten imod': false,
  });

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupStep, setPopupStep] = useState<1 | 2>(1);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseTitle | null>(null);
  const [actionType, setActionType] = useState<'add' | 'remove' | null>(null);

  const handleFavoritePress = (exercise: ExerciseTitle) => {
    setSelectedExercise(exercise);
    const currentFavorite = favorites[exercise];
    setActionType(currentFavorite ? 'remove' : 'add');
    setPopupStep(1);
    setPopupVisible(true);
  };

  const confirmAction = () => {
    if (selectedExercise) {
      toggleFavorite(selectedExercise);
      setPopupStep(2);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedExercise(null);
    setActionType(null);
  };

  const toggleFavorite = (exercise: ExerciseTitle) => {
    setFavorites((prev) => ({
      ...prev,
      [exercise]: !prev[exercise],
    }));
  };

  const favoriteExercises = allExercises.filter((title) => favorites[title]);
  const otherExercises = allExercises.filter((title) => !favorites[title]);

  const sections = [
    {
      title: 'Dine favoritøvelser',
      data: favoriteExercises,
    },
    {
      title: 'Øvelser du før har prøvet',
      data: otherExercises,
    },
  ];

  const renderExercise = (title: ExerciseTitle) => (
    <View style={styles.card} key={title}>
      <Reg style={styles.cardText}>{title}</Reg>
      <Pressable onPress={() => handleFavoritePress(title)}>
        <FontAwesome
          name={favorites[title] ? 'heart' : 'heart-o'}
          size={24}
          color="#051B2F"
        />
      </Pressable>
    </View>
  );

  const getPopupText = () => {
    if (actionType === 'remove') {
      return `Du er ved at fjerne "${selectedExercise}" fra dine favoritter.`;
    } else {
      return `Vil du tilføje "${selectedExercise}" til dine favoritter?`;
    }
  };

  const getConfirmationTitle = () => {
    return actionType === 'remove' ? 'Favorit fjernet' : 'Favorit tilføjet';
  };

  return (
    <LinearGradient
      colors={['#F8F5F2', '#F8F5F2', '#D9EAF7', '#B3D4EC', '#EAC5A1']}
      locations={[0, 0.5, 0.75, 0.9, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <SectionList
        sections={sections}
        keyExtractor={(item) => item}
        renderItem={({ item }) => renderExercise(item as ExerciseTitle)}
        renderSectionHeader={({ section }) => (
          <Med style={styles.sectionTitle}>{section.title}</Med>
        )}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.content}
        ListFooterComponent={
          <Link href={"/chat"} asChild>
            <Pressable style={styles.chatButton}>
              <Med style={styles.planButtonText}>Planlæg med whirl</Med>
              <Image
                source={require('../assets/icons/chat-icon.png')}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            </Pressable>
          </Link>
        }
      />

      {popupVisible && (
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <Pressable style={styles.closeButton} onPress={closePopup}>
              <Feather name="x" size={24} color="#000" />
            </Pressable>

            {popupStep === 1 ? (
              <>
                <Text style={styles.popupTitle}>Er du sikker?</Text>
                <Text style={styles.popupText}>{getPopupText()}</Text>
                <View style={styles.buttonRow}>
                  <Pressable style={styles.confirmButton} onPress={confirmAction}>
                    <Text style={styles.buttonText}>
                      {actionType === 'remove' ? 'Fjern' : 'Tilføj'}
                    </Text>
                  </Pressable>

                  <Pressable style={styles.cancelButton} onPress={closePopup}>
                    <Text style={styles.buttonText}>Fortryd</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.popupTitle}>{getConfirmationTitle()}</Text>
                <Text style={styles.popupText}>
                  Du har {actionType === 'remove' ? 'fjernet' : 'tilføjet'} "{selectedExercise}" {actionType === 'remove' ? 'fra' : 'til'} dine favoritter.
                </Text>
              </>
            )}
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    paddingVertical: 20,
    paddingHorizontal: 8,
    paddingTop: 40,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  cardText: {
    fontSize: 16,
  },
  footerButton: {
    marginTop: 70,
    marginBottom: 80,
    marginHorizontal: 50,
    backgroundColor: '#051B2F',
    paddingVertical: 16,
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popupBox: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    paddingBottom: 20, // eller det der føles passende
  },
  closeButton: {
    alignSelf: 'flex-end',
    
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  popupText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: '#051B2F',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginHorizontal: 4,
    flex: 1,
    alignItems: 'center',
  },
  LukButton: {
    backgroundColor: '#051B2F',
    paddingVertical: 50,
    paddingHorizontal: 5,
    borderRadius: 24,
    marginHorizontal: 4,
    flex: 1,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#122A3F',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    flex: 1,
    alignItems: 'center',
  },
  LukbuttonText: {
    color: 'pink',
    fontWeight: '600',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  chatButton: {
    marginTop: 110,
    backgroundColor: '#051B2F',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  planButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    paddingRight: 6,
  },
});
