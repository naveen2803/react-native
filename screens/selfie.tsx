import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'

const SelfieScreen = () => {
    const [isCameraReady, setIsCameraReady] = useState(false)
    const [type, setType] = useState(Camera.Constants.Type.front);

    const capture = async () => {
        if(isCameraReady && this.camera) {
            const photo = await this.camera.takePictureAsync()
        }
    }
    return (
        <View style={styles.container}>
            <Camera
                ref={ref => {this.camera = ref}}
                style={styles.camera} type={type} onCameraReady={() => setIsCameraReady(true)}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                        setType(
                        type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                        );
                    }}>
                        <Text style={styles.text}> Flip </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => capture()}>
                        <Text style={styles.text}> Capture </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-between'
    },
    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    },
})

export default SelfieScreen
