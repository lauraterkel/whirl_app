import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
  Image,
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import Med from '../components/font/Med';
import Reg from '../components/font/Reg';

export default function CalendarScreen() {
  const [calendarEvents, setCalendarEvents] = useState([
    { id: 1, date: '2. april kl. 10', title: 'Eksamen', exercise: '', color: '', category: '' },
    { id: 2, date: '10. april kl. 12', title: 'Præsentation', exercise: '', color: '', category: '' },
    { id: 3, date: '18. april kl. 11', title: 'Møde med Ida', exercise: '', color: '', category: '' },
    { id: 4, date: '30. april kl. 9', title: 'Møde med Ras', exercise: '', color: '', category: '' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    id: number;
    date: string;
    title: string;
    exercise?: string;
    color?: string;
    category?: string;
  } | null>(null);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [tempSelectedExercise, setTempSelectedExercise] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [tempSelectedCategory, setTempSelectedCategory] = useState('');

  const handleEdit = (id: number) => {
    const updatedEvents = calendarEvents.map((event) =>
      event.id === id
        ? {
          ...event,
          title: event.id === 1 ? 'Eksamen' : event.title,
          exercise: 'Visualisering af ro',
          color: '#45B1F9',
          category: 'Afslapning',
        }
        : event
    );

    const updatedEvent = updatedEvents.find((e) => e.id === id);
    if (!updatedEvent) return;

    setCalendarEvents(updatedEvents);
    setSelectedEvent(updatedEvent);
    setSelectedExercise(updatedEvent.exercise || '');
    setTempSelectedExercise(updatedEvent.exercise || '');
    setSelectedCategory(updatedEvent.category || '');
    setTempSelectedCategory(updatedEvent.category || '');
    setShowModal(true);
  };

  const handlePickerChange = (itemValue: string) => {
    setTempSelectedExercise(itemValue);
    setSelectedExercise(itemValue);
    
    // Update the event immediately
    if (selectedEvent) {
      const updatedEvents = calendarEvents.map((event) =>
        event.id === selectedEvent.id
          ? {
              ...event,
              exercise: itemValue,
            }
          : event
      );
      setCalendarEvents(updatedEvents);
    }
  };

  const handleSave = () => {
    if (!selectedEvent) return;
    setShowModal(false);
  };

  return (
    <LinearGradient
      colors={['#F8F5F2', '#F8F5F2', '#D9EAF7', '#B3D4EC', '#EAC5A1']}
      locations={[0, 0.5, 0.75, 0.9, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={styles.container}>
          <View style={styles.stickyHeader}>
            <Med style={styles.monthHeading}>April 2025</Med>
          </View>

          {calendarEvents.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventRow}>
                <View style={[styles.dot, { backgroundColor: event.color || '#D2D2D2' }]} />
                <View style={styles.eventContent}>
                  <View style={styles.headerRow}>
                    <Med style={styles.eventTitle}>{event.title}</Med>
                    <Pressable style={styles.icon} onPress={() => handleEdit(event.id)}>
                      <Feather name="edit-2" size={20} color="#051B2F" />
                    </Pressable>
                  </View>
                  <Reg style={styles.eventTime}>{event.date}</Reg>
                  <Reg style={styles.exerciseText}>
                    {event.exercise ? `Øvelse: ${event.exercise}` : 'Ingen øvelse valgt'}
                  </Reg>
                </View>
              </View>
            </View>
          ))}

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

          <Text style={styles.footerNote}>
            Her er nogle kommende datoer, vi har fundet i din kalender, du kan altid tilføje eller redigere events.
          </Text>
        </ScrollView>

        {/* Modal til valg af øvelse + kategori */}
        <Modal visible={showModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.titleTextPop}>Planlæg en Øvelse</Text>

              <Text style={styles.modalLabel}>Dato</Text>
              <View style={styles.longButton}>
                <Text style={styles.longButtonText}>DD/MM/YYYY</Text>
              </View>

              <Text style={styles.modalLabel}>Aktivitet</Text>
              <View style={styles.longButton}>
                <Text style={styles.longButtonText}>Indtast aktivitet</Text>
              </View>

              <Text style={styles.modalLabel}>Vælg en øvelse</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={selectedExercise}
                  onValueChange={handlePickerChange}
                  style={[styles.picker, { color: '#051B2F' }]}
                  dropdownIconColor="#051B2F"
                >
                  <Picker.Item label="Vælg en øvelse..." value="" color="#666" />
                  <Picker.Item label="Visualisering af ro" value="Visualisering af ro" color="#051B2F" />
                  <Picker.Item label="Åndedrætsøvelse" value="Åndedrætsøvelse" color="#051B2F" />
                  <Picker.Item label="Eksponeringsterapi" value="Eksponeringsterapi" color="#051B2F" />
                  <Picker.Item label="Distraktion" value="Distraktion" color="#051B2F" />
                </Picker>
              </View>

              <View style={styles.modalButtonRow}>
                <Pressable style={[styles.modalButton, styles.saveButton]} onPress={handleSave}>
                  <Text style={styles.modalButtonText}>Gem</Text>
                </Pressable>
                <Pressable style={[styles.modalButton, styles.deleteButton]} onPress={() => setShowModal(false)}>
                  <Text style={[styles.modalButtonText, { color: '#fff' }]}>Fortryd</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  stickyHeader: {
    backgroundColor: '#F8F5F2',
    paddingVertical: 2,
    paddingHorizontal: 16,
    zIndex: 10,
  },

  monthHeading: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 10,
    marginRight: 12,
    marginTop: 12,
  },
  eventContent: {
    flex: 1,
  },
  textBlock: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  titleText: {
    fontSize: 16,
  },
  titleTextPop: {
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#051B2F',
  },
  footerNote: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    width: '85%',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#051B2F',
    marginBottom: 8,
    marginTop: 16,
  },
  picker: {
    height: 170,
    width: '100%',
    marginTop: -40,
  },
  modalButton: {
    backgroundColor: '#051B2F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
  },
  categoryText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 6,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    paddingTop: 6,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },

  eventTitle: {
    fontSize: 16,
  },

  eventTime: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: -6,
    marginBottom: 4,
  },

  exerciseText: {
    fontSize: 14,
    color: '#374151',
  },

  editButton: {
    color: '#007BFF',
    fontWeight: '600',
    marginTop: 6,
  },
  longButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'center',
    marginBottom: 8,
  },
  longButtonText: {
    fontSize: 16,
    color: '#A6A7AB',
  },
  closeIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    gap: 12,
  },
  saveButton: {
    backgroundColor: '#051B2F',
    marginRight: 8,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#051B2F',
    marginLeft: 8,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  icon: {
    padding: 8,
  },
  chatButton: {
    marginTop: 90,
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