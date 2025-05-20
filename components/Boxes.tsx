import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function Boxes() {
  return (
    <View style={styles.boxesContainer}>
      <View style={styles.boxesHeader}>
        <Text style={styles.boxesTitle}>Your Boxes</Text>
      </View>
      <View style={styles.boxRow}>
        <View style={styles.box}>
          <View style={styles.boxContent}>
            <View style={styles.leftContent}>
              <View style={styles.ellipse} />
              <Text style={styles.boxText}>Box Title</Text>
            </View>
          </View>
          <Text style={styles.boxTitle}>More info</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxesContainer: {
    marginTop: 70,
    gap: 10,
  },
  boxesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  boxesTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#051B2F',
  },
  boxRow: {
    flexDirection: 'row',
    gap: 8,
  },
  box: {
    flex: 1,
    height: 120,
    backgroundColor: '#FCFBF9',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 4.5,
      },
    }),
  },
  boxContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ellipse: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: '#A1D8FF',
  },
  boxText: {
    fontSize: 14,
    color: '#797979',
    fontWeight: '400',
  },
  boxTitle: {
    fontSize: 16,
    color: '#051B2F',
    fontWeight: '400',
    marginTop: 40,
  },
});