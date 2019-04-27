import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        margin: 5
    },
    shadowBox: {
        fontWeight: Platform.select({
            ios: '500',
            android: '200',
        }),
        width: 250,
        alignItems: 'center',
        textAlign: 'center',
    },
    input: {
        height: 40,
        width: 250,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: 'grey'
    },
});

export default styles;