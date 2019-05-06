import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, WebView, Dimensions } from 'react-native';
import commonStyles from '../common/styles';
import Button from '../components/Button';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { updateConsent } from '../../reducer/actions';

class VideoConsent extends Component {
    static navigationOptions = {
        title: 'Video Consent',
        headerTitleStyle: { color: '#F76B8A', textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    };
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            user: this.props.user,
            consent: this.props.consent
        }
    }

    takeVideo = async function () {
        console.log('inside take video method');
        if (this.camera) {
            try {
                const promise = this.camera.recordAsync(this.state.recordOptions);

                if (promise) {
                    this.setState({ isRecording: true });
                    const { uri } = await promise;
                    this.setState({ isRecording: false, processing: false, error: '' });
                    const consent = this.state.consent;
                    consent.uri = uri;
                    this.props.updateConsent({ consent: consent });
                    this.props.navigation.navigate('Video', {
                        uri: uri,
                    });
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    stopVideoRecording = async function () {
        this.setState({ processing: true });
        if (this.camera && this.state.isRecording) {
            try {
                await this.camera.stopRecording();
            } catch (e) {
                console.error(e);
            }
        }
    };

    renderCamera() {
        const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;

        return (
            <View style={{
                flex: 1, justifyContent: 'center', margin: 10,
                alignItems: 'center',
            }}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={{
                        width: 200,
                        height: 200
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
                </RNCamera>
            </View>

        );
    }


    render() {
        return (
            <View style={styles.container}>

                <View style={styles.center}>
                    <ScrollView contentContainerStyle={styles.containerStyle}>
                        {this.renderCamera()}
                        <View style={{ width: 250, justifyContent: 'space-between' }}>
                            <Text>
                                I have read/ understand the procedure, risks and complications. I have asked questions and raised any immediate concerns I might have. I understand another surgeon other than my consultant may perform the operation.(although they will have adequate training/ supervision).
                                {"\n"}{"\n"}<Text style={{ fontWeight: 'bold' }}>I understand</Text> that I will have the opportunity to discuss the details of anaesthesia with an anaesthetist before the procedure
                                {"\n"}{"\n"}<Text style={{ fontWeight: 'bold' }}>I understand</Text> that any procedure in addition to those described on this form will only be carried out if it is necessary to save my life or to prevent serious harm to my health.
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button]} onPress={this.state.isRecording ? this.stopVideoRecording.bind(this) : this.takeVideo.bind(this)} >
                                {this.state.isRecording && !this.state.processing ? (
                                    <Text style={styles.stopText}> STOP </Text>
                                ) : (this.state.processing ? (<Text style={styles.stopText}> PROCESSING </Text>) :
                                    (<Text style={styles.flipText}> RECORD </Text>)
                                    )}
                            </TouchableOpacity>
                        </View >
                        <View style={{ margin: 20 }}>

                        </View>
                    </ScrollView>

                </View >

            </View >

        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateConsent: (consent) => dispatch(updateConsent(consent)),
});

const mapStateToProps = (state) => ({
    user: state.user,
    consent: state.consent
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoConsent);

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'white', flexDirection: "column"
    },
    center: {
        flexGrow: 4,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    containerStyle: {
        flexGrow: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
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
    buttonContainer: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 40,
    },
    flipText: {
        color: 'white',
        fontSize: 15,
    },
    stopText: {
        color: 'white',
        fontSize: 15,
    },
});