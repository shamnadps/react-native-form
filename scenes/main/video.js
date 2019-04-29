import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import Video from 'react-native-video';
import CameraRoll from "@react-native-community/cameraroll";
import FlashMessage, { showMessage } from "react-native-flash-message";

export default class VideoScreen extends React.Component {
    static navigationOptions = {
        title: 'Verify Consent Video',
        headerTitleStyle: { color: '#F76B8A', textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    };

    state = {
        isRecording: false,
        processing: false
    };

    onBuffer = () => {

    }

    videoError = () => {

    }

    saveVideoToGallery = async (uri) => {
        try {
            await CameraRoll.saveToCameraRoll(uri, 'video');
            showMessage({
                message: "Video saved to gallery!",
                type: "success",
                icon: "success"
            });
        } catch (error) {
            console.log(error);
        }
    }

    recordAgain = () => {
        this.props.navigation.navigate('Record');
    }

    render() {
        const videoUri = this.props.navigation.getParam('uri', 'URI');
        console.log('videoUri', videoUri);
        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <Video source={{ uri: videoUri }}   // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                    }}                                      // Store reference
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onError={this.videoError}               // Callback when video cannot be loaded
                    style={styles.backgroundVideo} />
                <View style={{ flex: 0, borderColor: '#F76B8A', borderWidth: 1, paddingBottom: 40, flexDirection: "row", justifyContent: "center" }}>
                    <View style={styles.container}>
                        <TouchableOpacity style={[styles.button]} onPress={() => this.recordAgain()}>
                            <Text style={{ color: 'white' }}>Record Again</Text>
                        </TouchableOpacity>
                    </View >
                    <View style={styles.container}>
                        <TouchableOpacity style={[styles.button]} >
                            <Text style={{ color: 'white' }}>Play</Text>
                        </TouchableOpacity>
                    </View >
                    <View style={styles.container}>
                        <TouchableOpacity style={[styles.button]} onPress={() => this.saveVideoToGallery(videoUri)}>
                            <Text style={{ color: 'white' }}>Save</Text>
                        </TouchableOpacity>
                    </View >
                </View>
            </View >);
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 15,
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
        color: 'white',
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
    buttonContainer: {
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
    backgroundVideo: {
        flex: 1,
        justifyContent: 'space-between'
    },
});