import React, {useState, useEffect, useCallback} from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Camera } from 'expo-camera'

interface Dividend {
    division: number
    amount: number
}

interface DrawResult {
    productId: string
    displayName: string
    drawNumber : string
    drawDate: string
    drawLogoUrl: string
    dividends: Dividend[]
}

const HomeScreen = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null)

    const route = useRoute()
    const navigation = useNavigation()
    const [result, setResult] = useState<DrawResult>([])

    const fetchResults = useCallback(
        async () => {
            const myHeaders = new Headers()
            myHeaders.append("Content-Type", "text/plain")
            const raw = {
                CompanyId: "GoldenCasket",
                MaxDrawCountPerProduct: 1,
                OptionalProductFilter: ["OzLotto", "Powerball", "TattsLotto"]
            }
            const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: JSON.stringify(raw)
            };
            const response = await fetch('https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults', requestOptions)
            const results = await response.json()
            if(response.ok) {
                const updatedResult = results.DrawResults.map(item => {
                    const drawResult: DrawResult = {
                        productId: item.ProductId,
                        drawNumber : item.DrawNumber,
                        drawDate: item.DrawDate,
                        drawLogoUrl: item.DrawLogoUrl,
                        displayName: item.DrawDisplayName,
                        dividends:
                            item.Dividends.filter(d => (d.Division === 1)).map(div => {
                                const dividend: Dividend = {
                                    division: div.Division,
                                    amount: div.BlocDividend
                                }

                                return dividend
                            })
                    }

                    return drawResult
                })
                setResult(updatedResult)
            }
        }
    )

    const onItemSelect = (productId: string) => {
        navigation.navigate('DetailScreen', {...result.filter(item => item.productId === productId)[0], hasCameraPermission: hasCameraPermission})
    }

    const requestCameraPermission = async () => {
        const { status } = await Camera.requestPermissionsAsync()
        setHasCameraPermission(status === 'granted')
    }

    useEffect(() => {
        fetchResults()
        requestCameraPermission()
    }, [])

    return (
        <SafeAreaView>
        <FlatList
            data={result}
            keyExtractor={item => item.productId}
            numColumns="2"
            renderItem={({item}) => {
                return (
                    <TouchableOpacity style={styles.box} onPress={() => onItemSelect(item.productId)}>
                        <Text style={styles.text}>
                            {item.productId}
                        </Text>
                    </TouchableOpacity>
                )}
            } />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        color: "#000000"
    },
    box: {
        padding: 10,
        margin: 1,
        height: 100,
        flexGrow: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    text: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default HomeScreen
