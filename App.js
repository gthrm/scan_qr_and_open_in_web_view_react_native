import React, {useState} from 'react';
import {
  SafeAreaView,
  Button,
  Linking,
  View,
  ActivityIndicator,
} from 'react-native';
import {WebView} from 'react-native-webview';
import QR from './QR';

let jsCode =
  '!function(){var e=function(e,n,t){if(n=n.replace(/^on/g,""),"addEventListener"in window)e.addEventListener(n,t,!1);else if("attachEvent"in window)e.attachEvent("on"+n,t);else{var o=e["on"+n];e["on"+n]=o?function(e){o(e),t(e)}:t}return e},n=document.querySelectorAll("a[href]");if(n)for(var t in n)n.hasOwnProperty(t)&&e(n[t],"onclick",function(e){new RegExp("^https?://"+location.host,"gi").test(this.href)||(e.preventDefault(),window.postMessage(JSON.stringify({external_url_open:this.href})))})}();';

const renderLoadingView = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  );
};

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
    return <WebView source={{uri: urlToWebView}} style={{marginTop: 20}} />;
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
