//WebViewde hem aşağı çekince sayfa yenileme hemde geri gitme kodudur.

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SafeAreaView, RefreshControl, ScrollView, BackHandler, Alert } from 'react-native';
import { WebView } from 'react-native-webview';


const App = () => {
  //Pull To Down Refresh
  const [refreshing, setRefreshing] = useState(false);
  const [refresherEnabled, setEnableRefresher] = useState(true);
  const webViewRef = useRef();
  //CanGoBack
  const [canGoBack, setCanGoBack] = useState(false);

  const handleBack = useCallback(() => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  }, [canGoBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    };
  }, [handleBack]);

  //Pull To Down Refresh
  const handleScroll = (res) => {
    const yOffset = Number(res.nativeEvent.contentOffset.y)
    if (yOffset === 0) {
      setEnableRefresher(true)
    } else {
      setEnableRefresher(false)
    }
  }

  return (
    <SafeAreaView style={{ flex:1 }}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            enabled={refresherEnabled}
            onRefresh={() => { webViewRef.current.reload() }}
          />
        }>
        <WebView
          source={{ uri: 'https://plazadunyasi.com/' }}
          onLoadProgress={(event) => setCanGoBack(event.nativeEvent.canGoBack)}
          ref={webViewRef}
          originWhitelist={['*']}
          allowsInlineMediaPlayback
          javaScriptEnabled
          scalesPageToFit
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabledAndroid
          useWebkit
          startInLoadingState={true}
          cacheEnabled
          onScroll={handleScroll}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
