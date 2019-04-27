import React from 'react';
import { Platform, TouchableOpacity, View, StyleSheet, Text, Button, TextInput } from 'react-native';

class RoundButton extends React.Component {
    constructor(props) {
        super(props);
    }

    handleOnPress = (route) => {
        this.props.navigation.navigate(route);
    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={[styles.button, this.props.type === 'plain' ? styles.plain : null]} onPress={() => this.handleOnPress(this.props.navigate)} >
                    <Text style={{ color: this.props.type === 'plain' ? '#F76B8A' : 'white' }}>{this.props.text}</Text>
                </TouchableOpacity>
            </View >

        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        margin: 20,
    },
    button: {
        fontWeight: Platform.select({
            ios: '500',
            android: '200',
        }),
        width: 200,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'rgba(157, 163, 180, 0.25)',
        marginLeft: 5,
        marginRight: 5,
        padding: 10,
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#F76B8A',
        color: 'white'
    },
    plain: {
        backgroundColor: '#FFFFFF',
        color: '#F76B8A',
        borderColor: '#F76B8A',
    }
});

export default RoundButton;
