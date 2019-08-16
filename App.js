import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from 'react-native'
import { Header, Icon } from 'react-native-elements'
import * as Permissions from 'expo-permissions'
import UploadingOverlay from './components/UploadingOverlay'

const VISION_API_KEY = 'AIzaSyBIj3L0pxRZYlHgx_CAcakASf7OOhm4Exk'

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function() {
      resolve(xhr.response)
    }
    xhr.onerror = function(e) {
      console.log(e)
      reject(new TypeError('Network request failed'))
    }
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send(null)
  })

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4())
  const snapshot = await ref.put(blob)

  blob.close()

  return await snapshot.ref.getDownloadURL()
}

class App extends Component {
  state = {
    hasGrantedCameraPermission: false,
    hasGrantedCameraRollPermission: false,
    image: null,
    uploading: true,
    googleResponse: false
  }

  async componentDidMount() {
    this.cameraRollAccess()
    this.cameraAccess()
  }

  cameraRollAccess = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    // console.log('camera roll status', status)
    if (status === 'granted') {
      this.setState({ hasGrantedCameraRollPermission: true })
    }
  }

  cameraAccess = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    // console.log('camera status', status)
    if (status === 'granted') {
      this.setState({ hasGrantedCameraPermission: true })
    }
  }

  // renderUploadingOverlay = () => {
  //   if (this.state.uploading) {
  //     return (
  //       <View
  //         style={[
  //           StyleSheet.absoluteFill,
  //           {
  //             backgroundColor: 'rgba(255,255,255,0.8)',
  //             alignItems: 'center',
  //             justifyContent: 'center'
  //           }
  //         ]}>
  //         <ActivityIndicator color='#000' animating size='large' />
  //       </View>
  //     )
  //   }
  // }

  render() {
    const {
      hasGrantedCameraPermission,
      hasGrantedCameraRollPermission,
      uploading
    } = this.state

    if (
      hasGrantedCameraPermission === false &&
      hasGrantedCameraRollPermission === false
    ) {
      return (
        <View style={styles.container}>
          <Text>No access to Camera or Gallery!</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Header
            statusBarProps={{ barStyle: 'light-content' }}
            backgroundColor='black'
            leftComponent={
              <TouchableOpacity onPress={() => alert('soon')}>
                <Icon name='photo-album' color='#fff' />
              </TouchableOpacity>
            }
            centerComponent={{
              text: 'Not Hotdog?',
              style: { color: '#fff', fontSize: 20, fontWeight: 'bold' }
            }}
            rightComponent={
              <TouchableOpacity onPress={() => alert('soon')}>
                <Icon name='camera-alt' color='#fff' />
              </TouchableOpacity>
            }
          />
          {uploading ? <UploadingOverlay /> : null}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default App
