// ImportantInfoScreen.tsx

import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Med from '../components/font/Med';
import Semi from '../components/font/Semi';
import Reg from '../components/font/Reg';

export default function ImportantInfoScreen() {
    const router = useRouter();

    const handleContinue = () => {
        router.push('/createprofile'); // ← Skift til jeres næste route
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#F8F5F2', '#D9EBF7', '#EAC5A1']}
                locations={[0, 0.7, 1]}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Med style={styles.H1}>Vigtige oplysninger</Med>

                    <View style={styles.card}>
                        <Semi style={styles.cardTitle}>Whirl er ikke en erstatning for professionel hjælp</Semi>
                        <Reg style={styles.p}>
                            Whirl er et AI-baseret støtteredskab og ikke en erstatning for psykologisk behandling
                            eller diagnosticering. Det er skabt til at støtte dig i angstfyldte øjeblikke.
                        </Reg>
                    </View>

                    <View style={styles.card}>
                        <Semi style={styles.cardTitle}>Søg altid professionel rådgivning ved behov</Semi>
                        <Reg style={styles.p}>
                            Whirls svar kan indeholde fejl. Vi anbefaler, at du kontakter en professionel for
                            rådgivning. Du finder kontaktinformation til hjælp og støtte i appen.
                        </Reg>
                    </View>

                    <View style={styles.card}>
                        <Semi style={styles.cardTitle}>Kun for brugere over 18 år</Semi>
                        <Reg style={styles.p}>
                            Whirl er for personer over 18 år. Ved at bruge Whirl accepterer du vores vilkår og
                            forstår, at dine data behandles fortroligt og i overensstemmelse med GDPR.
                        </Reg>
                    </View>


                    <Pressable style={styles.button} onPress={handleContinue}>
                        <Text style={styles.buttonText}>Accepter</Text>
                    </Pressable>
                </ScrollView>
            </LinearGradient>
        </View>
    );
}


const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        padding: 24,
        paddingTop: 100,
    },
    H1: {
        fontSize: 28,
        marginBottom: 24,
        letterSpacing: -1,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        marginBottom: 14,
    },
    p: {
        fontSize: 14,
        lineHeight: 20,
    },
    button: {
        marginTop: 28,
        backgroundColor: '#051B2F',
        borderRadius: 30,
        paddingVertical: 14,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    },
});
