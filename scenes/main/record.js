import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, ActivityIndicator, PermissionsAndroid, CameraRoll } from 'react-native';
import commonStyles from '../common/styles';
import Button from '../components/Button';
import SwitchSelector from "react-native-switch-selector";
import { RNCamera, FaceDetector } from 'react-native-camera';

export default class Record extends Component {
    static navigationOptions = {
        title: 'Record Consent Video',
        headerTitleStyle: { color: '#F76B8A', textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    };
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            recordOptions: {
                mute: false,
                maxDuration: 5,
                quality: RNCamera.Constants.VideoQuality['288p'],
            },
            recording: false,
            processing: false,
            error: ''
        }
    }
    async componentDidMount() {
        await this.checkPermission()
    };

    async checkPermission() {
        if (Platform.OS !== 'android') {
            return Promise.resolve(true);
        }

        let result;
        try {
            result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, { title: 'Microphone Permission', message: 'App needs access to your microphone' });
            result2 = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, { title: 'Storage Permission', message: 'App needs access to your storage' });
        } catch (error) {
            this.setState({ error: error.message });
        }
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED && result2 === true || result2 === PermissionsAndroid.RESULTS.GRANTED);
    }

    async startRecording() {
        try {
            this.setState({ recording: true });
            // default to mp4 for android as codec is not set
            const { uri, codec = "mp4" } = await this.camera.recordAsync();
            this.setState({ recording: false, processing: true });
            await CameraRoll.saveToCameraRoll(uri, 'video');
            this.setState({ recording: false, processing: false });
        } catch (error) {
            this.setState({ error: error.message });
        }

    }

    stopRecording() {
        try {
            this.camera.stopRecording();
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    render() {
        const { recording, processing } = this.state;

        let button = (
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button]} onPress={this.startRecording.bind(this)} >
                    <Text style={{ color: 'white' }}>RECORD</Text>
                </TouchableOpacity>
            </View >
        );

        if (recording) {
            button = (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button]} onPress={this.stopRecording.bind(this)} >
                        <Text style={{ color: 'white' }}>STOP</Text>
                    </TouchableOpacity>
                </View >

            );
        }

        if (processing) {
            button = (
                <View style={styles.capture}>
                    <ActivityIndicator animating size={18} />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={{ marginBottom: 20, fontSize: 20, color: '#F76B8A', fontWeight: 'bold' }}>{this.state.error}</Text>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                    }}
                />
                <View
                    style={{ flex: 0, marginBottom: 40, width: 200, flexDirection: "row", justifyContent: "center" }}
                >
                    {button}
                    <Button navigate='Main'
                        navigation={this.props.navigation}
                        position='bottom'
                        type='plain'
                        width={120}
                        text="Cancel" />
                </View>
            </View >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    center: {
        flexGrow: 4,
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
        width: 250
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
        flexGrow: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 15,
    },
    button: {
        fontWeight: Platform.select({
            ios: '500',
            android: '200',
        }),
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
    }
});