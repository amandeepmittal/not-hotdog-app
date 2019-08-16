import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

const UploadingOverlay = () => (
  <View style={[StyleSheet.absoluteFill, styles.overlay]}>
    <ActivityIndicator color='#000' animating size='large' />
  </View>
)

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default UploadingOverlay
