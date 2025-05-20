// ... dine imports forbliver de samme
import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';

export default function CalendarScreen() {
  const [calendarEvents, setCalendarEvents] = useState([
    { id: 1, date: '2. april kl. 12', title: 'Møde med Karen' },
    { id: 2, date: '2. april kl. 12', title: 'Møde med Karen' },
    { id: 3, date: '2. april kl. 12', title: 'Møde med Karen' },
    { id: 4, date: '2. april kl. 12', title: 'Møde med Karen' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [tempSelectedExercise, setTempSelectedExercise] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleEdit = (id) => {
    const updatedEvents = calendarEvents.map((event) =>
      event.id === id
        ? {
            ...event,
            title: event.id === 1 ? 'Eksamen' : event.title,
            exercise: 'Visualisering af ro',
            color: '#45B1F9',
          }
        : event
    );
    const updatedEvent = updatedEvents.find((e) => e.id === id);
    setCalendarEvents(updatedEvents);
    setSelectedEvent(updatedEvent);
    setSelectedExercise(updatedEvent.exercise || '');
    setTempSelectedExercise(updatedEvent.exercise || '');
    setShowModal(true);
  };

  const handlePickerChange = (itemValue) => {
    if (itemValue !== tempSelectedExercise) {
      setTempSelectedExercise(itemValue);
      setShowConfirmModal(true);
    }
  };

  const confirmExerciseChange = () => {
    setSelectedExercise(tempSelectedExercise);
    setShowConfirmModal(false);
  };

  const cancelExerciseChange = () => {
    setTempSelectedExercise(selectedExercise);
    setShowConfirmModal(false);
  };

  const handleSave = () => {
    const updatedEvents = calendarEvents.map((event) =>
      event.id === selectedEvent.id
        ? { ...event, exercise: selectedExercise }
        : event
    );
    setCalendarEvents(updatedEvents);
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
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.monthHeading}>April 2025</Text>

          {calendarEvents.map((event) => (
            <View key={event.id} style={styles.card}>
              <View
                style={[styles.dot, { backgroundColor: event.color || '#D2D2D2' }]}
              />
              <View style={styles.textBlock}>
                <Text style={styles.dateText}>{event.date}</Text>
                <Text style={[styles.titleText, { fontWeight: event.id === 1 ? '700' : '500' }]}> {event.title} </Text>
                {event.exercise && (
                  <Text style={{ fontSize: 14 }}>
                    Planlagt øvelse: <Text style={{ fontWeight: '500' }}>{event.exercise}</Text>
                  </Text>
                )}
              </View>
              <Pressable onPress={() => handleEdit(event.id)}>
                <Feather name="edit-2" size={18} color="#444" />
              </Pressable>
            </View>
          ))}

          <Link href="/chat" asChild>
            <Pressable style={styles.planButton}>
              <Text style={styles.planButtonText}>Planlæg med Whirl</Text>
              <FontAwesome name="external-link" size={16} color="white" style={{ marginLeft: 6 }} />
            </Pressable>
          </Link>

          <Text style={styles.footerNote}>
            Her er nogle kommende datoer, vi har fundet i din kalender – du kan altid tilføje eller redigere events.
          </Text>
        </ScrollView>

        {/* Modal til valg af øvelse */}
        <Modal visible={showModal} transparent={true} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalLabel}>Vælg en øvelse</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={tempSelectedExercise}
                  onValueChange={handlePickerChange}
                  style={styles.picker}
                >
                  <Picker.Item label="Vælg en øvelse..." value="" />
                  <Picker.Item label="Visualisering af ro" value="Visualisering af ro" />
                  <Picker.Item label="Åndedrætsøvelse" value="Åndedrætsøvelse" />
                  <Picker.Item label="Kropsscanning" value="Kropsscanning" />
                  <Picker.Item label="Progressiv muskelafspænding" value="Progressiv muskelafspænding" />
                </Picker>
              </View>
              <Pressable style={styles.modalButton} onPress={handleSave}>
                <Text style={styles.modalButtonText}>Gem</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Bekræftelses-popup */}
        <Modal visible={showConfirmModal} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalLabel}>Bekræft valg</Text>
              <Text style={{ marginBottom: 20 }}>
                Vil du vælge øvelsen: <Text style={{ fontWeight: 'bold' }}>{tempSelectedExercise}</Text>?
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Pressable
                  style={[styles.modalButton, { flex: 1, marginRight: 8 }]}
                  onPress={confirmExerciseChange}
                >
                  <Text style={styles.modalButtonText}>Bekræft</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, { flex: 1, backgroundColor: '#ccc' }]}
                  onPress={cancelExerciseChange}
                >
                  <Text style={[styles.modalButtonText, { color: '#000' }]}>Fortryd</Text>
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
  monthHeading: {
    fontSize: 22,
    fontWeight: '700',
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
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 12,
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
  planButton: {
    marginTop: 40,
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
    padding: 20,
    width: '85%',
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#051B2F',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});