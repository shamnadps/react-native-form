
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import CameraRoll from "@react-native-community/cameraroll";
import Permissions from 'react-native-permissions';

export default class Signature extends Component {
    static navigationOptions = {
        title: 'Signature Form',
        headerTitleStyle: { color: '#F76B8A', textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    };
    async componentDidMount() {
        const currentStatus = await Permissions.check('storage');
        if (currentStatus !== 'authorized') {
            const status = await Permissions.request('storage');

            if (status !== 'authorized') {
                return false;
            }
        }
    }

    render() {

        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <SignatureCapture
                    style={[{ flex: 1 }, styles.signature]}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent}
                    onDragEvent={this._onDragEvent}
                    saveImageFileInExtStorage={true}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"} />

                <View style={{ flex: 0, borderColor: '#F76B8A', borderWidth: 1, paddingBottom: 40, flexDirection: "row", justifyContent: "center" }}>
                    <View style={styles.container}>
                        <TouchableOpacity style={[styles.button, styles.plain]} onPress={() => { this.resetSign() }} >
                            <Text style={{ color: '#F76B8A' }}>Reset</Text>
                        </TouchableOpacity>
                    </View >
                    <View style={styles.container}>
                        <TouchableOpacity style={[styles.button]} onPress={() => { this.saveSign() }} >
                            <Text style={{ color: 'white' }}>Save</Text>
                        </TouchableOpacity>
                    </View >
                </View>

            </View>
        );
    }

    saveSign() {
        this.refs["sign"].saveImage();
        this.props.navigation.navigate('Record');
    }

    resetSign() {
        this.refs["sign"].resetImage();
    }

    async _onSaveEvent(result) {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        const currentStatus = await Permissions.check('storage');
        if (currentStatus !== 'authorized') {
            const status = await Permissions.request('storage');

            if (status !== 'authorized') {
                return false;
            }
        }
        await CameraRoll.saveToCameraRoll(result.pathName, 'photo');


    }
    _onDragEvent() {
        // This callback will be called when the user enters signature
        console.log("dragged");
    }
}

const styles = StyleSheet.create({
    signature: {
        flex: 1,

    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 15,
    },
    button: {
        width: 120,
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
    },
});