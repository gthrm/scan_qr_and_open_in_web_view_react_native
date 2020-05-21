/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Constants, Permissions} from 'react-native-unimodules';

import {BarCodeScanner} from 'expo-barcode-scanner';

export default class BarcodeScannerExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: false,
      close: true,
    };
  }

  componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  };

  close = () => {
    this.setState({close: false});
  };

  render() {
    const {close, hasCameraPermission} = this.state;
    const {onClose, onScan, scanned} = this.props;

    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <Modal animationType="fade" visible={close}>
        <View style={{flex: 1}}>
          <BarCodeScanner
            onBarCodeScanned={!scanned ? onScan : undefined}
            style={StyleSheet.absoluteFillObject}
          />
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 200,
                height: 200,
                borderColor: 'yellow',
                borderWidth: 3,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 20,
                  opacity: 0.3,
                }}>
                <Image
                  style={{borderRadius: 20}}
                  // eslint-disable-next-line global-require
                  source={require('./assets/images/QR_example.png')}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={onClose}
            style={{
              alignItems: 'center',
              width: 20,
              marginTop: Constants.statusBarHeight,
              marginRight: 20,
              marginLeft: 'auto',
            }}>
            <Text style={{color: '#fff', fontSize: 30}}>X</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
