import React, {useState} from 'react';
import {SafeAreaView, Button} from 'react-native';
import {WebView} from 'react-native-webview';
import QR from './QR';

export default function App() {
  const [qrIsOpewn, setQrIsOpen] = useState(false);
  const [urlToWebView, seturlToWebView] = useState(null);
  console.log('urlToWebView', urlToWebView);

  const closeHandler = () => setQrIsOpen(!qrIsOpewn);
  const onScan = (scan) => {
    console.log('scan', scan);
    seturlToWebView(scan.data);
    closeHandler();
  };
  if (urlToWebView) {
    return <WebView source={{uri: urlToWebView}} />;
  }
  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button
        onPress={closeHandler}
        title="QR"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      {qrIsOpewn && <QR onScan={onScan} onClose={closeHandler} />}
    </SafeAreaView>
  );
}
