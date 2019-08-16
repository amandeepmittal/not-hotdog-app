import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Image
} from 'react-native'
import { Header } from 'react-native-elements'
import * as Permissions from 'expo-permissions'

const VISION_API_KEY = 'AIzaSyBIj3L0pxRZYlHgx_CAcakASf7OOhm4Exk'

class App extends Component {
  state = {
    hasGrantedCameraPermission: false,
    hasGrantedCameraRollPermission: false
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

  render() {
    const {
      hasGrantedCameraPermission,
      hasGrantedCameraRollPermission
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
            leftComponent={{ icon: 'photo-album', color: '#fff' }}
            centerComponent={{
              text: 'Not Hotdog?',
              style: { color: '#fff', fontSize: 20, fontWeight: 'bold' }
            }}
            rightComponent={{
              icon: 'photo-camera',
              color: '#fff'
            }}
          />
          <Text>Not-hotdog app</Text>
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
