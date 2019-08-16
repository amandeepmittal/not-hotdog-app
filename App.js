import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  YellowBox,
  Image
} from 'react-native'
import { Header, Icon, Button } from 'react-native-elements'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import uuid from 'uuid'

import UploadingOverlay from './components/UploadingOverlay'
import firebase from './config/Firebase'

const VISION_API_KEY = 'AIzaSyBIj3L0pxRZYlHgx_CAcakASf7OOhm4Exk'

// YellowBox.ignoreWarnings(['Setting a timer'])

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
    uploading: false,
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

  takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    })

    this.handleImagePicked(pickerResult)
  }

  pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    })

    this.handleImagePicked(pickerResult)
  }

  handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true })

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri)
        this.setState({ image: uploadUrl })
      }
    } catch (error) {
      console.log(error)
      alert('Image Upload failed')
    } finally {
      this.setState({ uploading: false })
    }
  }

  submitToGoogle = async () => {
    try {
      this.setState({ uploading: true })
      let { image } = this.state
      let body = JSON.stringify({
        requests: [
          {
            features: [{ type: 'LABEL_DETECTION', maxResults: 7 }],
            image: {
              source: {
                imageUri: image
              }
            }
          }
        ]
      })
      let response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${VISION_API_KEY}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: body
        }
      )
      let responseJson = await response.json()
      // console.log(responseJson)
      const getLabel = responseJson.responses[0].labelAnnotations.map(
        obj => obj.description
      )

      // console.log('getLabel', getLabel)
      let result =
        getLabel.includes('Hot dog') ||
        getLabel.includes('hot dog') ||
        getLabel.includes('Hot dog bun')
      // console.log(result)

      this.setState({
        googleResponse: result,
        uploading: false
      })
    } catch (error) {
      console.log(error)
    }
  }

  renderImage = () => {
    let { image, googleResponse } = this.state
    if (!image) {
      return (
        <View style={styles.renderImageContainer}>
          <Button
            buttonStyle={styles.button}
            onPress={() => this.submitToGoogle()}
            title='Check'
            titleStyle={styles.buttonTitle}
            disabled
          />
          <View style={styles.imageContainer}>
            <Text style={styles.title}>
              Upload an image to verify a hotdog!
            </Text>
            <Text style={styles.hotdogEmoji}>🌭</Text>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.renderImageContainer}>
        <Button
          buttonStyle={styles.button}
          onPress={() => this.submitToGoogle()}
          title='Check'
          titleStyle={styles.buttonTitle}
        />

        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.imageDisplay} />
        </View>

        {googleResponse ? (
          <Text style={styles.hotdogEmoji}>🌭</Text>
        ) : (
          <Text style={styles.hotdogEmoji}>❌</Text>
        )}
      </View>
    )
  }

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
        <View style={{ flex: 1, marginTop: 100 }}>
          <Text>No access to Camera or Gallery!</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Header
            statusBarProps={{ barStyle: 'light-content' }}
            backgroundColor='#55bcc9'
            leftComponent={
              <TouchableOpacity onPress={this.pickImage}>
                <Icon name='photo-album' color='#fff' />
              </TouchableOpacity>
            }
            centerComponent={{
              text: 'Not Hotdog?',
              style: styles.headerCenter
            }}
            rightComponent={
              <TouchableOpacity onPress={this.takePhoto}>
                <Icon name='camera-alt' color='#fff' />
              </TouchableOpacity>
            }
          />
          {this.renderImage()}
          {uploading ? <UploadingOverlay /> : null}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cafafe'
  },
  headerCenter: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  renderImageContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#97caef',
    borderRadius: 10,
    width: 150,
    height: 50
  },
  buttonTitle: {
    fontWeight: '600'
  },
  imageContainer: {
    margin: 25,
    alignItems: 'center'
  },
  imageDisplay: {
    width: 300,
    height: 300
  },
  title: {
    fontSize: 36
  },
  hotdogEmoji: {
    marginTop: 20,
    fontSize: 90
  }
})

export default App
