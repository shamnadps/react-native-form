import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";
import FlashMessage, { showMessage } from "react-native-flash-message";

export default class CameraScreen extends React.Component {
    static navigationOptions = {
        title: 'Record Consent Video',
        headerTitleStyle: { color: '#F76B8A', textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    };

    state = {
        flash: 'off',
        zoom: 0,
        depth: 0,
        type: 'front',
        whiteBalance: 'auto',
        ratio: '16:9',
        recordOptions: {
            mute: false,
            maxDuration: 30,
            quality: RNCamera.Constants.VideoQuality['288p'],
        },
        isRecording: false,
        canDetectFaces: false,
        canDetectText: false,
        canDetectBarcode: false,
        faces: [],
        textBlocks: [],
        barcodes: [],
        processing: false
    };

    takeVideo = async function () {
        if (this.camera) {
            try {
                const promise = this.camera.recordAsync(this.state.recordOptions);

                if (promise) {
                    this.setState({ isRecording: true });
                    const { uri } = await promise;
                    this.setState({ isRecording: false, processing: false });
                    await CameraRoll.saveToCameraRoll(uri, 'video');
                    showMessage({
                        message: "Video saved to gallery!",
                        type: "success",
                        icon: "success"
                    });
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    renderCamera() {
        const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;

        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
                type={this.state.type}
                flashMode={this.state.flash}
                zoom={this.state.zoom}
                whiteBalance={this.state.whiteBalance}
                ratio={this.state.ratio}
                focusDepth={this.state.depth}
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
                faceDetectionLandmarks={
                    RNCamera.Constants.FaceDetection.Landmarks
                        ? RNCamera.Constants.FaceDetection.Landmarks.all
                        : undefined
                }
                onFacesDetected={canDetectFaces ? this.facesDetected : null}
                onTextRecognized={canDetectText ? this.textRecognized : null}
                onGoogleVisionBarcodesDetected={canDetectBarcode ? this.barcodeRecognized : null}
            >
                <View style={{ bottom: 0 }}>
                    <View
                        style={{
                            height: 56,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                        }}
                    >
                        <TouchableOpacity
                            style={[
                                styles.flipButton,
                                {
                                    flex: 0.3,
                                    alignSelf: 'flex-end',
                                    backgroundColor: this.state.isRecording ? 'white' : 'darkred',
                                },
                            ]}
                            onPress={this.state.isRecording ? () => { this.setState({ processing: true }) } : this.takeVideo.bind(this)}
                        >
                            {this.state.isRecording && !this.state.processing ? (
                                <Text style={styles.stopText}> STOP </Text>
                            ) : (this.state.processing ? (<Text style={styles.stopText}> PROCESSING </Text>) :
                                (<Text style={styles.flipText}> REC </Text>)
                                )}
                        </TouchableOpacity>
                    </View>
                    <FlashMessage position="top" />
                </View>
            </RNCamera>
        );
    }

    render() {
        return <View style={styles.container}>{this.renderCamera()}</View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#000',
    },
    flipButton: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipText: {
        color: 'white',
        fontSize: 15,
    },
    stopText: {
        color: 'red',
        fontSize: 15,
    },
    text: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#F00',
        justifyContent: 'center',
    },
    textBlock: {
        color: '#F00',
        position: 'absolute',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
});