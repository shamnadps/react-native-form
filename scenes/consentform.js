import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import commonStyles from './common/styles';

export default class ConsentForm extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            firstName: this.props.firstName
        }
    }

    handlePress = (firstName) => {
        this.setState({ firstName: firstName });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.center}>
                    <ScrollView contentContainerStyle={styles.containerStyle}>
                        <TouchableOpacity onPress={this.handlPress}>
                            <View style={styles.profile}>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Login ID</Text>
                            <TextInput
                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(firstName) => this.handlePress(firstName)}
                                value={this.state.firstName} />
                        </View>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Password</Text>
                            <TextInput
                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(firstName) => this.handlePress(firstName)}
                                value={this.state.firstName} />
                        </View>
                    </ScrollView>
                </View >

            </View >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    center: {
        flexGrow: 8,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    profile: {
        marginTop: 20,
        borderColor: '#f76b8a',
        borderWidth: 1,
        borderRadius: 100,

    },
    card: {
        marginTop: 15,
        textAlign: 'left',
        width: 300,
        padding: 10
    },
    cardTop: {
        textAlign: 'left',
        width: 300,
        padding: 10,
        borderColor: 'lightgrey',
        borderStyle: 'solid',
        borderTopWidth: 1,
    },
    containerStyle: {
        flexGrow: 8,
        justifyContent: 'center',
        alignItems: 'center',
    }

});