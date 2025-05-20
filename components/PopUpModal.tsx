// components/Modal.tsx (or wherever you store components)

import React from 'react';
import { Modal, Pressable, View, Text, StyleSheet } from 'react-native';

type InfoModalProps = {
  visible: boolean;
  onClose: () => void;
  infoText: string;
};

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose, infoText }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalBox}>
          <Text style={styles.modalText}>{infoText}</Text>
          <Pressable onPress={onClose}>
            <Text style={styles.modalClose}>Luk</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default InfoModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#051B2F',
  },
  modalClose: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'right',
  },
});
