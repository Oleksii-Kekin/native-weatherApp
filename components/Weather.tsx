import React, { useCallback } from 'react';
import { Text, StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { MotiView} from '@motify/components';
import IconThunderstorm from '../assets/icons/thunderstorm.svg'
import IconSun from '../assets/icons/sun.svg'
import IconMoon from '../assets/icons/moon.svg'
import IconClouds from '../assets/icons/cloudly.svg'
import IconSnow from '../assets/icons/snow.svg'
import IconRain from '../assets/icons/rain.svg'
import IconMoonRain from '../assets/icons/moonRain.svg'

interface IWeatherData {
    isLoading: boolean;
    name: string;
    main: any;
    weather: any;
    onRefresh: () => void;
}

export const Weather: React.FC<IWeatherData> = (props) => {
    const { isLoading, name, main, weather, onRefresh } = props;
    const weatherID = weather[0]['id'];
    const weatherDescription = weather[0]['description'];

    const hours = new Date().getHours()
    const isDayTime = hours > 4 && hours < 20

    const renderCurrentWeatherIcon = useCallback((id: number) => {
        switch (true) {
            case (199 < id && id < 233):
                return <IconThunderstorm />
            case (499 < id && id < 532 && isDayTime):
                return <IconRain />
            case (499 < id && id < 532 && !isDayTime):
                return <IconMoonRain />
            case (599 < id && id < 623):
                return <IconSnow />
            case (id == 800 && isDayTime):
                return <IconSun />
            case (id == 800 && !isDayTime):
                return <IconMoon />
            case (799 < id && id < 805):
               return <IconClouds />
        }
    }, [weatherID])

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
            contentContainerStyle={{flexGrow: 1}}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                { (name !== undefined && main !== undefined)
                    ?  <View style={styles.content}>
                         <View><Text style={{...styles.text, ...styles.city}}>{ name }</Text></View>
                         <MotiView
                             from={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             transition={{ delay: 300, type: 'timing', duration: 800 }}
                             style={{ alignItems: 'center' }}
                         >
                             { renderCurrentWeatherIcon(weatherID) }
                             <Text style={styles.text}>{ Math.floor(main.temp) }&#8451;</Text>
                             <Text style={{...styles.text, ...styles.conditionText}}>{ weatherDescription }</Text>
                         </MotiView>
                         <MotiView
                             from={{ bottom: -100 }}
                             animate={{ bottom: 0 }}
                             transition={{ delay: 300, type: 'timing', duration: 800 }}
                         >
                             <Text style={{...styles.text, ...styles.country}}>Все буде Україна 🇺🇦</Text>
                         </MotiView>
                    </View>
                    : <Text style={styles.text}>Data not found, please reload the page 😏</Text> }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        width: '100%',
    },
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000',
        paddingVertical: 60,
        paddingHorizontal: 30,
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
    },
    city: {
        fontSize: 38,
    },
    country: {
        fontSize: 26,
    },
    text: {
        textAlign: "center",
        fontSize: 48,
        fontWeight: '700',
        color: '#fff',
    },
    conditionText: {
        fontSize: 18,
        color: '#f0f8ff',
    }
});