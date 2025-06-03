import React from 'react';
import { View, StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';

export default function ChatWithBot() {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'https://fluffy-chaja-fb1270.netlify.app/',
        }}
        style={{ flex: 1 }}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});