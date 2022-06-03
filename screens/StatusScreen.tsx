import * as React from 'react';
import { StyleSheet, Pressable } from 'react-native';

import { Auth } from 'aws-amplify';

import { Text, View } from '../components/Themed';

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

export default function StatusScreen() {
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={() => signOut()}>
                <Text style={styles.text}>Logout from AWS Amplify</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '80%',
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efefef',
    },
    text: {
        fontSize: 12,
        fontWeight: '500',
        textTransform: 'uppercase',
    },
})