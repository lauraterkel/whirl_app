import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SectionList,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

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
    'Visualisering af ro': true,
    'Vejrtrækningsøvelser': true,
    'Eksponeringsterapi': false,
    'Distraktion': false,
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
      <Text style={styles.cardText}>{title}</Text>
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
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.content}
        ListFooterComponent={
          <Link href="/chat" asChild>
            <Pressable style={styles.footerButton}>
              <Text style={styles.footerButtonText}>Udforsk med Whirl</Text>
              <FontAwesome
                name="external-link"
                size={18}
                color="white"
                style={{ marginLeft: 6 }}
              />
            </Pressable>
          </Link>
        }
      />

      {popupVisible && (
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <Pressable style={styles.closeButton} onPress={closePopup}>
              <FontAwesome name="close" size={20} color="#051B2F" />
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
                <Pressable style={styles.confirmButton} onPress={closePopup}>
                  <Text style={styles.buttonText}>Luk</Text>
                </Pressable>
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
    fontSize: 20,
    fontWeight: '700',
    backgroundColor: '#F8F5F2',
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
    fontWeight: '500',
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
    marginBottom: 80,
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
  cancelButton: {
    backgroundColor: '#122A3F',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginHorizontal: 4,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
