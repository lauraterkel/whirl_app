import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Text, View, Modal, Image, Linking } from "react-native";
import { Overlay, Button, Input } from "react-native-elements";
import { createGradientAnimation } from '../components/Animation'; // adjust the path if needed
import InfoModal from '../components/PopUpModal';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Med from '../components/font/Med';
import Semi from '../components/font/Semi';
import Reg from '../components/font/Reg';


const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface UserProfile {
  username: string;
  email: string;
}


export default function Index() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(500)).current;
  const { startX, endY } = createGradientAnimation(animatedValue);
  const [isModalVisible, setModalVisible] = useState(false);
  const [Visible, setVisible] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [isInfoVisible, setInfoVisible] = useState(false);
  const [infoText, setInfoText] = useState('');
  const [infoTitle, setInfoTitle] = useState('');

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const profileData = await AsyncStorage.getItem('userProfile');
      if (profileData) {
        setUserProfile(JSON.parse(profileData));
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const openOverlay = (id: string) => {
    setActiveOverlay(id);
  };

  const closeOverlay = () => {
    setActiveOverlay(null);
  };

  const IndexPage = () => {
    const [isModalVisible, setModalVisible] = useState(false);
  };

  type Artikel = {
    id: string; 
    title: string;
    text: string;
  };

  const [artikler, setArtikler] = useState<Artikel[]>([
    {
      id: 'klimaangst',
      title: 'Titel 1',
      text: 'Tekst 1',
    },
    {
      id: 'terapi',
      title: 'Titel 2',
      text: 'Tekst 2',
    },
    {
      id: 'daemp',
      title: 'Titel 2',
      text: 'Tekst 2',
    },
    {
      id: 'angst',
      title: 'Titel 2',
      text: 'Tekst 2',
    },
  ]);

  useEffect(() => {
    if (Visible) {
      Animated.timing(translateY, {
        toValue: 0, // flyt op
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 500, // flyt ned
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [Visible]);

  const showInfo = (title: string, text: string) => {
    setInfoTitle(title);
    setInfoText(text);
    setInfoVisible(true);
  };

  return (
    // Her starter container
    <View style={styles.container}>
      <Animated.View style={styles.gradient}>
        <AnimatedLinearGradient
          colors={['#FFA05D', '#C1E7FF', '#F8F5F2', '#F8F5F2']}
          locations={[0, 0.4, 0.8, 0.9]}
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
          <Med style={styles.h2}>Hej {userProfile?.username || 'Sofie'}</Med>
          <Med style={styles.h3}>Hvordan kan jeg hjælpe i dag?</Med>
        </View>
        <View style={styles.boxesContainer}>
          <View style={styles.boxesHeader}>
            <Text style={[styles.boxesTitle, { fontFamily: 'Inter_600SemiBold' }]}>Planlagte øvelser</Text>
            <Pressable onPress={() => showInfo('Planlagte øvelser', 'Her kan du se dine kommende øvelser og aktiviteter. Du kan tilføje nye øvelser i kalenderen og se en oversigt over alle dine planlagte aktiviteter.')}>
              <Feather name="info" size={24} color="#051B2F" />
            </Pressable>
          </View>
          <View style={styles.boxRow}>
            <View style={styles.box}>
              <View style={styles.boxContent}>
                <View style={styles.leftContent}>
                  <View style={styles.ellipseOn} />
                  <Reg style={styles.boxText}>2. april</Reg>
                </View>
                <Feather name="calendar" size={20} color="#051B2F" />
              </View>
              <Reg style={styles.boxTitle}>Eksamen kl. 10</Reg>
            </View>

            <View style={styles.box}>
              <View style={styles.boxContent}>
                <View style={styles.leftContent}>
                  <View style={styles.ellipse} />
                  <Reg style={styles.boxText}>10. april</Reg>
                </View>
                <Feather name="calendar" size={20} color="#051B2F" />
              </View>
              <Reg style={styles.boxTitle}>Præsentation kl. 12</Reg>
            </View>

          </View>

          <View style={styles.boxRow}>

            <View style={styles.box}>
              <View style={styles.boxContent}>
                <View style={styles.leftContent}>
                  <View style={styles.ellipse} />
                  <Reg style={styles.boxText}>18. april</Reg>
                </View>
                <Feather name="calendar" size={20} color="#051B2F" />
              </View>
              <Reg style={styles.boxTitle}>Møde med Ida kl. 11</Reg>
            </View>

            <View style={styles.box}>
              <View style={styles.boxContent}>
                <View style={styles.leftContent}>
                  <View style={styles.ellipse} />
                  <Reg style={styles.boxText}>30. april</Reg>
                </View>
                <Feather name="calendar" size={20} color="#051B2F" />
              </View>
              <Reg style={styles.boxTitle}>Møde med Ras kl. 9 </Reg>
            </View>

          </View>

          <View style={styles.captionContainer}>
            <Link href={"/kalender"} asChild>
              <Pressable android_ripple={{ color: 'transparent' }}>
                <View style={styles.captionTextBox}>
                  <Reg style={styles.captionText}>Se kalender</Reg>
                  <Feather name="chevron-right" size={20} color="#797979" style={{ marginLeft: 4 }} />
                </View>
              </Pressable>
            </Link>
          </View>
        </View>

        <View style={styles.longButtonsContainer}>
          <View style={styles.boxesHeader}>
            <Link href={"/ovelser"} asChild>
              <Pressable android_ripple={{ color: 'transparent' }}>
                <Semi style={styles.boxesTitle}>Favoritøvelser</Semi>
              </Pressable>
            </Link>
            <Pressable onPress={() => showInfo('Favoritøvelser', 'Her finder du dine favoritøvelser. Disse øvelser er designet til at hjælpe dig med at håndtere stress og angst i hverdagen.')}>
              <Feather name="info" size={24} color="#051B2F" />
            </Pressable>
          </View>
          <Link href={"/breath"} asChild>
            <Pressable android_ripple={{ color: 'transparent' }}>
              <View style={styles.longButton}>
                {/* Venstre side: ikon + tekst */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome
                    name="heart"
                    size={20}
                    color="#051B2F"
                    style={{ marginRight: 12 }}
                  />
                  <Text style={styles.longButtonText}>Vejrtrækningsøvelser</Text>
                </View>

                {/* Højre side: pil */}
                <Feather name="chevron-right" size={24} color="#051B2F" />
              </View>
            </Pressable>
          </Link>


          <Link href={"/chat"} asChild>
            <Pressable android_ripple={{ color: 'transparent' }}>
              <View style={styles.longButton}>
                {/* Venstre side: ikon + tekst */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome
                    name="heart"
                    size={20}
                    color="#051B2F"
                    style={{ marginRight: 12 }}
                  />
                  <Text style={styles.longButtonText}>Distraktion</Text>
                </View>

                {/* Højre side: pil */}
                <Feather name="chevron-right" size={24} color="#051B2F" />
              </View>
            </Pressable>
          </Link>

          <View style={styles.captionContainer}>
            <Link href={"/ovelser"} asChild>
              <Pressable android_ripple={{ color: 'transparent' }}>
                <View style={styles.captionTextBox}>
                  <Reg style={styles.captionText}>Udforsk flere øvelser</Reg>
                  <Feather name="chevron-right" size={20} color="#797979" style={{ marginLeft: 4 }} />
                </View>
              </Pressable>
            </Link>
          </View>
        </View>

        <View style={styles.chatContainer}>
          <View style={styles.boxesHeader}>
            <Semi style={styles.boxesTitle}>Start en samtale</Semi>
            <Pressable onPress={() => showInfo('Chat', 'I chatten kan du skrive med en AI-assistent, der kan hjælpe dig med at håndtere stress og angst. Du kan stille spørgsmål, få vejledning og support når du har brug for det.')}>
              <Feather name="info" size={24} color="#051B2F" />
            </Pressable>
          </View>
          <Link href={"/chat"} asChild>
            <Pressable android_ripple={{ color: 'transparent' }}>
              <View style={styles.chatField}>
                <Text style={styles.chatPlaceholder}>Skriv en besked...</Text>
              </View>
            </Pressable>
          </Link>
        </View>

        <View style={styles.horizontalCardsContainer}>
          <View style={styles.boxesHeader}>
            <Semi style={styles.boxesTitle}>Artikler</Semi>
            <Pressable onPress={() => showInfo('Artikler', 'Her finder du informative artikler om stress, angst og mentalt velvære. Artiklerne er skrevet af eksperter og indeholder nyttige tips og viden om, hvordan du kan håndtere udfordringer i hverdagen.')}>
              <Feather name="info" size={24} color="#051B2F" />
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalCardsContent}
          >

            <View style={styles.card}>


              <Text style={styles.cardTitle}>Klimaangst</Text>

              <Image source={require('../assets/icons/klimaangst.png')} style={styles.cardImage} />

              <Text style={styles.cardDescription}>
                Når klimaangsten rammer, kan individuel, internetbaseret terapi føre til forbedringer, indikerer forsøg.
              </Text>
              <Pressable onPress={() => openOverlay('klimaangst')} style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Læs mere</Text>
              </Pressable>

              <Overlay overlayStyle={styles.Overlaystyling} isVisible={activeOverlay === 'klimaangst'} onBackdropPress={closeOverlay}>
                <View style={styles.OverlayTopstyling}>
                  <Pressable onPress={closeOverlay}>
                    <View style={styles.Topthing} />
                  </Pressable>

                  <Text>Artikler</Text>
                </View>

                <Text style={styles.cardTitle}>Klimaangst</Text>
                <Image source={require('../assets/icons/klimaangst.png')} style={styles.cardImageartikelopen} />
                <Text style={styles.ArtikelText}>Som klimaforandringerne skrider frem, kan flere komme til at lide af det, så en gruppe forskere har prøvet at undersøge, om terapi via internettet kan hjælpe.
                </Text>
                <Text style={styles.ArtikelText}>I et {' '}<Text style={{ textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://videnskab.dk')}>studie udgivet i tidsskriftet Behaviour Research and Therapy</Text> har forsøgspersoner oplevet forbedringer i deres klimarelaterede stress, -depression og -ubehag sammenlignet med en kontrolgruppe, efter otte ugers onlineterapi.
                </Text>
                <Button
                  title="Åben artikel"
                  onPress={() => Linking.openURL('https://videnskab.dk/krop-sundhed/klimaangst-skraeddersyet-onlineterapi-kan-afhjaelpe-frygt-for-klodens-fremtid/')}
                  buttonStyle={styles.cardButtonArtikel}
                  titleStyle={styles.cardButtonText}
                />
              </Overlay>

            </View>

            <View style={styles.card}>

              <Text style={styles.cardTitle}>Terapi på skærm</Text>

              <Image source={require('../assets/icons/terapipaaskream.png')} style={styles.cardImage} />

              <Text style={styles.cardDescription}>
                Fordelen ved digital terapi er, at den er let tilgængelig og omkostningseffektiv. Men virker den overhovedet?
              </Text>
              <Pressable onPress={() => openOverlay('terapi')} style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Læs mere</Text>
              </Pressable>

              <Overlay overlayStyle={styles.Overlaystyling} isVisible={activeOverlay === 'terapi'} onBackdropPress={closeOverlay}>
                <View style={styles.OverlayTopstyling}>
                <Pressable onPress={closeOverlay}>
                    <View style={styles.Topthing} />
                  </Pressable>

                  <Text>Artikler</Text>
                </View>

                <Text style={styles.cardTitle}>Terapi på skærm</Text>
                <Image source={require('../assets/icons/terapipaaskream.png')} style={styles.cardImageartikelopen} />
                <Text style={styles.ArtikelText}>Inden for de seneste år har udviklingen af digitale terapiformer taget fart. Særligt COVID-19-pandemien har været med til at accelerere udviklingen af digitale løsninger, som kan stå i stedet for det fysiske fremmøde.
                </Text>
                <Text style={styles.ArtikelText}>Men hvad er digital terapi egentlig? Og virker det overhovedet?</Text>
                <Text style={styles.ArtikelText}>Udviklingen af nye digitale hjælpemidler har også fundet vej ind i psykologien, og det bliver mere og mere udbredt at udbyde terapi via skærmen.
                </Text>
                <Button
                  title="Åben artikel"
                  onPress={() => Linking.openURL('https://videnskab.dk/krop-sundhed/terapi-paa-skaerm-kan-man-gaa-til-psykolog-hjemmefra')}
                  buttonStyle={styles.cardButtonArtikel}
                  titleStyle={styles.cardButtonText}
                />
              </Overlay>
            </View>

            <View style={styles.card}>

              <Text style={styles.cardTitle}>Dæmpe stress og angst</Text>

              <Image source={require('../assets/icons/dempstress.png')} style={styles.cardImage} />

              <Text style={styles.cardDescription}>
                Tid i naturen gavner vores mentale helbred – takket være en lille, mandelformet struktur dybt i hjernen.
              </Text>
              <Pressable onPress={() => openOverlay('daemp')} style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Læs mere</Text>
              </Pressable>

              <Overlay overlayStyle={styles.Overlaystyling} isVisible={activeOverlay === 'daemp'} onBackdropPress={closeOverlay}>
                <View style={styles.OverlayTopstyling}>
                <Pressable onPress={closeOverlay}>
                    <View style={styles.Topthing} />
                  </Pressable>

                  <Text>Artikler</Text>
                </View>

                <Text style={styles.cardTitle}>Dæmpe stress og angst</Text>
                <Image source={require('../assets/icons/dempstress.png')} style={styles.cardImageartikelopen} />
                <Text style={styles.ArtikelText}>"Jeg skal på landet i weekend for at koble af."</Text>
                <Text style={styles.ArtikelText}>Det er en almindelig bemærkning blandt folk, som tager et par dage ud i naturen for at undslippe livet i de større byer. Vi ved alle, at det virker – et par dages afslapning på landet.</Text>
                <Text style={styles.ArtikelText}>Befolkningstætheden i byområderne vokser hurtigere, end hvad godt er. I disse år {' '}<Text style={{ textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.un.org/development/desa/en/news/population/2018-revision-of-world-urbanization-prospects.html')}> bor mere end halvdelen af verdens befolkning i byer,</Text> og det forventes, at den andel bare vil fortsætte med at vokse.
                </Text>
                <Button
                  title="Åben artikel"
                  onPress={() => Linking.openURL('https://videnskab.dk/kultur-samfund/hvordan-en-gaatur-i-naturen-kan-taemme-vores-hjerner/')}
                  buttonStyle={styles.cardButtonArtikel}
                  titleStyle={styles.cardButtonText}
                />
              </Overlay>
            </View>

            <View style={styles.card}>

              <Text style={styles.cardTitle}>Hvad er angst?</Text>

              <Image source={require('../assets/icons/hvaderangst.png')} style={styles.cardImage} />

              <Text style={styles.cardDescription}>
                Måske har du selv oplevet angst – eller kender nogen, der har.
                Bliv klogere på emnet her.
              </Text>
              <Pressable onPress={() => openOverlay('angst')} style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Læs mere</Text>
              </Pressable>

              <Overlay overlayStyle={styles.Overlaystyling} isVisible={activeOverlay === 'angst'} onBackdropPress={closeOverlay}>
                <View style={styles.OverlayTopstyling}>
                <Pressable onPress={closeOverlay}>
                    <View style={styles.Topthing} />
                  </Pressable>

                  <Text>Artikler</Text>
                </View>

                <Text style={styles.cardTitle}>Hvad er angst?</Text>
                <Image source={require('../assets/icons/hvaderangst.png')} style={styles.cardImageartikelopen} />
                <Text style={styles.ArtikelText}>Pludseligt, som et lyn fra en klar himmel, bliver du ramt af en intens angst, nærmest rædsel, samtidig med at du får en række meget ubehagelige fysiske symptomer: Hjertet hamrer, som skulle det springe ud af brystet, du ryster over hele kroppen og sveder.
                </Text>
                <Text style={styles.ArtikelText}>Det føles, som om der sidder en elefant på brystkassen, og du frygter, at du er ved enten at dø af et hjerteanfald eller at miste kontrollen over dig selv fuldstændig.
                </Text>
                <Button
                  title="Åben artikel"
                  onPress={() => Linking.openURL('https://videnskab.dk/krop-sundhed/klimaangst-skraeddersyet-onlineterapi-kan-afhjaelpe-frygt-for-klodens-fremtid/')}
                  buttonStyle={styles.cardButtonArtikel}
                  titleStyle={styles.cardButtonText}
                />
              </Overlay>
            </View>

          </ScrollView>
        </View>

        <View style={styles.contactCardsContainer}>
          <View style={styles.boxesHeader}>
            <Semi style={styles.boxesTitle}>Kontakter</Semi>
            <Pressable onPress={() => showInfo('Kontakter', 'Her finder du vigtige kontaktoplysninger til professionel hjælp og støtte. Du kan ringe direkte til dem eller sende en mail.')}>
              <Feather name="info" size={24} color="#051B2F" />
            </Pressable>
          </View>

          <View style={styles.contactCard}>
            <View style={styles.contactContent}>
              <Text style={styles.boxesTitle2}>Angst og stress Foreningen</Text>

              <View style={styles.contactLeft}>
                <Feather name="phone" size={24} color="#051B2F" />
                <Text onPress={() => Linking.openURL('tel:+45 77 66 55 44')} style={styles.contactName}>+45 77 66 55 44</Text>
              </View>

              <View style={styles.contactLeft}>
                <Feather name="mail" size={24} color="#051B2F" />
                <Text
                  onPress={() => Linking.openURL('mailto:aogs@outlook.dk')}
                  style={styles.contactRole}
                >
                  aogs@outlook.dk
                </Text>
              </View>
            </View>
          </View>


          <View style={styles.contactCard}>
            <View style={styles.contactContent}>
              <Text style={styles.boxesTitle2}>Psykiatrifonden</Text>

              <View style={styles.contactLeft}>
                <Feather name="phone" size={24} color="#051B2F" />
                <Text
                  onPress={() => Linking.openURL('tel:+4577665544')}
                  style={styles.contactName}
                >
                  +45 77 66 55 44
                </Text>
              </View>

              <View style={styles.contactLeft}>
                <Feather name="mail" size={24} color="#051B2F" />
                <Text
                  onPress={() => Linking.openURL('mailto:aogs@outlook.dk')}
                  style={styles.contactRole}
                >
                  aogs@outlook.dk
                </Text>
              </View>
            </View>
          </View>


          <View style={styles.contactCard}>
            <View style={styles.contactContent}>
              <Text style={styles.boxesTitle2}>whirl</Text>

              <View style={styles.contactLeft}>
                <Feather name="instagram" size={24} color="#051B2F" />
                <Text
                  onPress={() => Linking.openURL('https://www.instagram.com/whirlbot/')}
                  style={styles.contactName}
                >
                  @whirlbot
                </Text>
              </View>

              <View style={styles.contactLeft}>
                <Feather name="mail" size={24} color="#051B2F" />
                <Text
                  onPress={() => Linking.openURL('mailto:whirlbothelp@gmail.com')}
                  style={styles.contactRole}
                >
                  whirlbothelp@gmail.com
                </Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
      <View style={styles.chatButtonContainer}>
        <Link href={"/chat"} asChild>
          <Pressable style={styles.chatButton}>
            <Image
              source={require('../assets/icons/chat-icon.png')}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          </Pressable>
        </Link>
      </View>



      <InfoModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        infoText="Dette er noget vigtig information!"
      />

      <Modal
        visible={isInfoVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setInfoVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Semi style={styles.modalTitle}>{infoTitle}</Semi>
              <Pressable onPress={() => setInfoVisible(false)}>
                <Feather name="x" size={24} color="#051B2F" />
              </Pressable>
            </View>
            <Reg style={styles.modalText}>{infoText}</Reg>
          </View>
        </View>
      </Modal>

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
    fontSize: 36,
    marginBottom: 8,
    letterSpacing: -1,
  },
  h3: {
    fontSize: 22,
    letterSpacing: -0.2,
  },
  boxesContainer: {
    marginTop: 50,
    gap: 10,
  },
  boxesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  boxesTitle: {
    fontSize: 18,
    color: '#051B2F',
    textDecorationLine: 'none',
  },
  boxesTitle2: {
    fontSize: 20,
    marginBottom: 20,
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
    backgroundColor: '#D2D2D2',
  },
  ellipseOn: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: '#45B1F9',
  },
  boxTitle: {
    fontSize: 16,
    marginTop: 40,
    letterSpacing: -0.2,
  },
  boxText: {
    fontSize: 14,
    color: '#797979',
    fontWeight: '400',
    overflow: 'hidden',
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
    color: '#797979'
  },
  captionTextBox: {
    flexDirection: 'row',
    alignItems: 'center'
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
    borderWidth: 1,
    borderColor: '#051B2F',
  },
  chatPlaceholder: {
    fontSize: 16,
    color: '#051B2F',
    opacity: 0.5,
  },
  horizontalCardsContainer: {
    marginTop: 60,
    gap: 12,
    marginBottom: 40,
  },
  horizontalCardsContent: {
    paddingLeft: -24,
    paddingRight: 0, //Her skal der overskrives body margin
    gap: 12,
  },
  card: {
    width: 300,
    backgroundColor: '#FCFBF9',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
    alignSelf: 'center',
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  cardImageartikel: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 10,
  },
  cardImageartikelopen: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 10,
  },
  
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#051B2F',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#051B2F',
    marginBottom: 16,
    lineHeight: 20,
  },
  cardButton: {
    backgroundColor: '#051B2F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 32,
    alignSelf: 'center',
  },
  cardButtonText: {
    color: '#FCFBF9',
    fontSize: 14,
    fontWeight: '500',
  },
  contactCardsContainer: {
    marginTop: 24,
    marginBottom: 50,
    gap: 12,
  },
  contactCard: {
    marginBottom: 15,
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
    flexDirection: 'column',  // ændret fra 'row' til 'column' for vertikal stacking
    justifyContent: 'flex-start', // start øverst
    alignItems: 'flex-start',     // align til venstre
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 8, // giver lidt vertikal afstand mellem elementer
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
    marginBottom: 10, // lidt margin under telefon-info for afstand til mail
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
  },
  scrollContainer: {
    alignItems: 'center',
  },
  linkText: {
    color: '#2f6fe4',
    textDecorationLine: 'underline',
  },
  Overlaystyling: {
    width: '100%',
    height: 900,
    padding: 35,
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 70,
    backgroundColor: '#F8F5F2',
    alignItems: 'center',
    marginTop: 300,
    overflow: 'hidden',
  },
  OverlayTopstyling: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E0DFDE',
    width: 400,
    height: 73,
    marginTop: -33,
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  ArtikelText: {
    marginBottom: 20,
    fontSize: 15,
  },
  Topthing: {
    width: 37,
    height: 5,
    backgroundColor: '#A6A7AB',
    borderRadius: 100,
    marginTop: 6,
    marginBottom: 18,
  },
  cardButtonArtikel: {
    backgroundColor: '#051B2F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 32,
    alignSelf: 'center',
    marginTop: 45,
  },
  themeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#F8F5F2',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    color: '#051B2F',
  },
  modalText: {
    fontSize: 16,
    color: '#051B2F',
    lineHeight: 24,
  },
  infofont: {
    fontFamily: 'Inter_400Regular',
    color: '#051B2F',
    textDecorationLine: 'none',
  },
});