import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
const DetailScreen = () => {
    const route = useRoute()
    const navigation = useNavigation()

    const startCamera = () => {
        navigation.navigate('SelfieScreen')
    }

    return (
        <View style={styles.container}>
            <View style={styles.line}>
                <Text style={styles.title}>Product Id:</Text>
                <Text style={styles.text}>{route.params.productId}</Text>
            </View>
            <View style={styles.line}>
                <Text style={styles.title}>Draw Number:</Text>
                <Text style={styles.text}>{route.params.drawNumber}</Text>
            </View>
            <View style={styles.line}>
                <Text style={styles.title}>Draw Date:</Text>
                <Text style={styles.text}>{route.params.drawDate}</Text>
            </View>
            <View style={styles.line}>
                <Text style={styles.title}>division 1:</Text>
                <Text style={styles.text}>{route.params.dividends[0].amount}</Text>
            </View>
            {route.params.hasCameraPermission &&
            <View style={styles.cameraLink}>
                <TouchableOpacity onPress={startCamera}>
                    <Text style={styles.cameraText}>Take Photo</Text>
                </TouchableOpacity>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#ffffff'
    },
    line: {
        flexDirection: 'row',
        marginBottom: 7
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 15,
        marginLeft: 10,
    },
    cameraLink: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
    cameraText: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default DetailScreen
