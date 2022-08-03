import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { MotiView } from '@motify/components';

interface ILoadScreenProps {
    size: number;
}

export const LoadScreen: React.FC<ILoadScreenProps> = ({ size }) => {
    return (
        <View style={styles.container}>
            <MotiView
                from={{
                    borderRadius: size / 2,
                    borderWidth: 1,
                    shadowOpacity: 0.5,
                }}
                animate={{
                    borderRadius: (size + 5) / 2,
                    borderWidth: size / 12,
                    shadowOpacity: 1,
                }}
                transition={{
                    type: 'timing',
                    duration: 1800,
                    repeat: Infinity,
                }}
                style={{
                    ...styles.icon,
                    width: size,
                    height: size,
                    borderColor: '#fff',
                    shadowColor: '#fff',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 1,
                    shadowRadius: 10,
                    transform: [{ translateX: -50}]
                }}
            />
            <View>
                <Text style={styles.title}>Native</Text>
                <Text style={styles.subTitle}>weather</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        backgroundColor: '#000',
    },
    icon: {
        position: 'absolute',
        top: '25%',
        left: '50%',
    },
    title: {
        marginRight: -15,
        fontSize: 24,
        color: '#fff',
        fontWeight: '700',
        letterSpacing: 15,
        textTransform: 'uppercase',
    },
    subTitle: {
        marginTop: -5,
        textAlign: 'right',
        fontSize: 20,
        color: '#fff',
    }
})