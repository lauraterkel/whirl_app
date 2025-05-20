import React from 'react';
import { View, StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';

export default function ChatWithBot() {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'https://cdn.botpress.cloud/webchat/v2.4/shareable.html?configUrl=https://files.bpcontent.cloud/2025/04/23/08/20250423082155-S6BW9CHT.json',
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