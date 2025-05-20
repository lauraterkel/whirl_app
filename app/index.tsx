import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { createGradientAnimation } from '../components/Animation'; // adjust the path if needed
import InfoModal from '../components/PopUpModal';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function Index() {

 const animatedValue = useRef(new Animated.Value(0)).current;
const { startX, endY } = createGradientAnimation(animatedValue);
  const IndexPage = () => {
    const [isModalVisible, setModalVisible] = useState(false);
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       
        <InfoModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          infoText="Dette er noget vigtig information!"
        />
      </View>
    );
  };

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        })
      ]).start(() => animate());
    };

    animate();
  }, []);

  const [isInfoVisible, setInfoVisible] = useState(false);
  const [infoText, setInfoText] = useState('');

  return (
    // Her starter container
    <View style={styles.container}>
      <Animated.View style={styles.gradient}>
        <AnimatedLinearGradient
          colors={['#FFA05D', '#A1D8FF', '#F3F4F5']}
          locations={[0, 0.4, 0.8]}
          start={{ x: startX, y: 0 }}
          end={{ x: 0.3, y: endY }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Link href={"/profile"} asChild>
            <Pressable android_ripple={{ color: 'transparent' }}>
              <FontAwesome6 name="user-circle" size={30} color="#051B2F" />
            </Pressable>
          </Link>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.h2}>Hej Sofie</Text>
          <Text style={styles.h3}>Hvordan kan jeg hjælpe i dag?</Text>
        </View>
        <View style={styles.boxesContainer}>
          <View style={styles.boxesHeader}>
            <Text style={styles.boxesTitle}>Planlagte øvelser</Text>
            <Pressable onPress={() => {
              setInfoText('Dette er information om planlagte øvelser.');
              setInfoVisible(true);
            }}>
              <Feather name="info" size={24} color="#051B2F" />
            </Pressable>
          </View>
          <View style={styles.boxRow}>
            <View style={styles.box}>
              <View style={styles.boxContent}>
                <View style={styles.leftContent}>
                  <View style={styles.ellipse} />
                  <Text style={styles.boxText}>2. april</Text>
                </View>
                <Feather name="calendar" size={20} color="#051B2F" />
              </View>
              <Text style={styles.boxTitle}>Eksamen kl. 10</Text>
            </View>
            <View style={styles.box}>
              <View style={styles.boxContent}>
                <View style={styles.leftContent}>
                  <View style={styles.ellipse} />
                  <Text style={styles.boxText}>30. april</Text>
                </View>
                <Feather name="calendar" size={20} color="#051B2F" />
              </View>
              <Text style={styles.boxTitle}>Præsentation kl. 12</Text>
            </View>
          </View>
          <View style={styles.boxRow}>
            <View style={styles.box}>
              <View style={styles.boxContent}>
                <View style={styles.leftContent}>
                  <View style={styles.ellipse} />
                  <Text style={styles.boxText}>5. maj</Text>
                </View>
                <Feather name="calendar" size={20} color="#051B2F" />
              </View>
              <Text style={styles.boxTitle}>Møde kl. 11</Text>
            </View>
            <View style={styles.box}>
              <View style={styles.boxContent}>
                <View style={styles.leftContent}>
                  <View style={styles.ellipse} />
                  <Text style={styles.boxText}>20. maj</Text>
                </View>
                <Feather name="calendar" size={20} color="#051B2F" />
              </View>
              <Text style={styles.boxTitle}>Møde kl. 15 </Text>
            </View>
          </View>

          <View style={styles.captionContainer}>
          <Link href={"/kalender"} asChild>
            <Pressable android_ripple={{ color: 'transparent' }}>
              <Text style={styles.captionText}>Se alle opgaver</Text>
              <Feather name="chevron-right" size={20} color="#797979" />
            </Pressable>
          </Link>
          </View>
        </View>

        <View style={styles.longButtonsContainer}>
          <View style={styles.boxesHeader}>
            <Link href={"/ovelser"} asChild>
              <Pressable android_ripple={{ color: 'transparent' }}>
                <Text style={styles.boxesTitle}>Favoritøvelser</Text>
              </Pressable>
            </Link>
            <Feather name="info" size={24} color="#051B2F" />
          </View>
          <Link href={"/ovelser"} asChild>
            <Pressable android_ripple={{ color: 'transparent' }}>
              <View style={styles.longButton}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather name="heart" size={20} color="#051B2F" style={{ marginRight: 12 }} />
                  <Text style={styles.longButtonText}>Visualisering af ro</Text>
                </View>
              </View>
            </Pressable>
          </Link>
          <Link href={"/ovelser"} asChild>
            <Pressable android_ripple={{ color: 'transparent' }}>
              <View style={styles.longButton}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather name="heart" size={20} color="#051B2F" style={{ marginRight: 12 }} />
                  <Text style={styles.longButtonText}>Visualisering af ro</Text>
                </View>
              </View>
            </Pressable>
          </Link>
         
          <View style={styles.captionContainer}>
            <Text style={styles.captionText}>Se alle opgaver</Text>
            <Feather name="chevron-right" size={20} color="#797979" />
          </View>
        </View>
        <View style={styles.chatContainer}>
          <View style={styles.boxesHeader}>
            <Text style={styles.boxesTitle}>Chat</Text>
              <Feather name="info" size={24} color="#051B2F" />
            </View>
            <Link href={"/chat"} asChild>
              <Pressable android_ripple={{ color: 'transparent' }}>
                <View style={styles.chatField}>
                  <Text style={styles.chatPlaceholder}>Skriv en besked...</Text>
                  <Feather name="send" size={20} color="#051B2F" />
                </View>
              </Pressable>
            </Link>
        </View>

        <View style={styles.horizontalCardsContainer}>
          <View style={styles.boxesHeader}>
            <Text style={styles.boxesTitle}>Artikler</Text>
            <Feather name="info" size={24} color="#051B2F" />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalCardsContent}
          >
            <View style={styles.card}>
              <Text style={styles.cardText}>Klimaangst</Text>
              <Pressable style={styles.cardButton} onPress={() => console.log('Artikel 1 clicked')}>
                <Text style={styles.cardButtonText}>Læs mere</Text>
              </Pressable>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>Artikel 2</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>Artikel 3</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>Artikel 4</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.contactCardsContainer}>
          <View style={styles.boxesHeader}>
            <Text style={styles.boxesTitle}>Kontakter</Text>
            <Feather name="info" size={24} color="#051B2F" />
          </View>
          <View style={styles.contactCard}>
            <View style={styles.contactContent}>
              <View style={styles.contactLeft}>
                <View style={styles.contactAvatar}>
                  <Text style={styles.contactInitial}>S</Text>
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>Sofie Nielsen</Text>
                  <Text style={styles.contactRole}>Studerende</Text>
                </View>
              </View>
              <Feather name="chevron-right" size={24} color="#051B2F" />
            </View>
          </View>
          <View style={styles.contactCard}>
            <View style={styles.contactContent}>
              <View style={styles.contactLeft}>
                <View style={styles.contactAvatar}>
                  <Text style={styles.contactInitial}>M</Text>
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>Maria Jensen</Text>
                  <Text style={styles.contactRole}>Underviser</Text>
                </View>
              </View>
              <Feather name="chevron-right" size={24} color="#051B2F" />
            </View>
          </View>

        </View>
      </ScrollView>
      <View style={styles.chatButtonContainer}>
        <Link href={"/chat"} asChild>
          <Pressable style={styles.chatButton}>
            <FontAwesome6 name="robot" size={24} color="#FFFFFF" />
          </Pressable>
        </Link>
      </View>
      <InfoModal
  visible={isInfoVisible}
  onClose={() => setInfoVisible(false)}
  infoText={infoText}
/>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5F2",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
  },
  header: {
    width: '100%',
    padding: 0,
    alignItems: 'flex-end',
    marginTop: 70,
  },
  textContainer: {
    marginTop: 10,
  },
  h2: {
    fontSize: 40,
    fontWeight: '400',
    color: '#051B2F',
    marginBottom: 8,
  },
  h3: {
    fontSize: 24,
    fontWeight: '400',
    color: '#051B2F',
  },
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
  captionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 1,
    gap: 1,
  },
  captionText: {
    fontSize: 14,
    color: '#797979',
    fontWeight: '400',
  },
  button: {
    fontSize: 40,
    color: "#797979",
  },
  link: {
    textDecorationLine: "none",
  },
  longButtonsContainer: {
    marginTop: 60,
    gap: 14,
  },
  longButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FCFBF9',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 12,
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
  longButtonText: {
    fontSize: 16,
    color: '#051B2F',
    fontWeight: '400',
  },
  chatContainer: {
    marginTop: 60,
    gap: 12,
  },
  chatField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
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
  chatPlaceholder: {
    fontSize: 16,
    color: '#051B2F',
    opacity: 0.5,
  },
  horizontalCardsContainer: {
    marginTop: 60,
    gap: 12,
  },
  horizontalCardsContent: {
    paddingLeft: -24,
    paddingRight: 0, //Her skal der overskrives body margin
    gap: 12,
  },
  card: {
    width: 300,
    height: 400,
    backgroundColor: '#FCFBF9',
    borderRadius: 8,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
  cardText: {
    fontSize: 18,
    color: '#051B2F',
    fontWeight: '500',
  },
  cardButton: {
    marginTop: 10,
    paddingVertical: 14,
    paddingHorizontal: 30,
    backgroundColor: '#051B2F',
    borderRadius: 32,
    alignSelf: 'center',
  },
  cardButtonText: {
    color: '#FCFBF9',
    fontSize: 14,
    fontWeight: 500,
  },
  contactCardsContainer: {
    marginTop: 24,
    marginBottom: 24,
    gap: 12,
  },
  contactCard: {
    backgroundColor: '#FCFBF9',
    borderRadius: 8,
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
  contactContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#A1D8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInitial: {
    fontSize: 20,
    fontWeight: '500',
    color: '#051B2F',
  },
  contactInfo: {
    gap: 4,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#051B2F',
  },
  contactRole: {
    fontSize: 14,
    color: '#051B2F',
    opacity: 0.7,
  },
  chatButtonContainer: {
    position: 'absolute',
    right: 24,
    bottom: 24,
  },
  chatButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#051B2F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});