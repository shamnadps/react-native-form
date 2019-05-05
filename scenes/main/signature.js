
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import CameraRoll from "@react-native-community/cameraroll";
import Permissions from 'react-native-permissions';
import commonStyles from '../common/styles';
import { connect } from 'react-redux';
import { updateConsent } from '../../reducer/actions';

class Signature extends Component {
    static navigationOptions = {
        title: 'Signature Consent',
        headerTitleStyle: { color: '#F76B8A', textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    };
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            consent: this.props.consent
        }
    }

    handleInput = (attr, value) => {
        var consent = this.state.consent;
        consent[attr] = value
        this.setState({ consent: consent, error: '' });
    }

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
        let [date] = new Date().toLocaleString('en-US').split(', ');
        return (
            <View style={styles.container}>
                <View style={styles.center}>
                    <View style={styles.card}>
                        <Text style={{ color: 'grey' }}>
                            I also give consent for my notes, any data recorded during this operation and tissue discarded during the operation to be used for any current or future trials
                        </Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={{ color: 'grey' }}>First Name</Text>
                        <TextInput
                            style={[commonStyles.input, commonStyles.shadowBox]}
                            onChangeText={(patientName) => this.handleInput('patientName', patientName)}
                            value={this.state.firstName} />
                    </View>
                    <View style={styles.card}>
                        <Text style={{ color: 'grey' }}>Date</Text>
                        <TextInput
                            editable={false} selectTextOnFocus={false}
                            style={[commonStyles.input, commonStyles.shadowBox]}
                            value={date} />
                    </View>
                    <View style={styles.card}>
                        <Text style={{ color: 'grey' }}>Signature</Text>
                        <SignatureCapture
                            style={[styles.signature]}
                            ref="sign"
                            onSaveEvent={this._onSaveEvent}
                            onDragEvent={this._onDragEvent}
                            saveImageFileInExtStorage={true}
                            showNativeButtons={false}
                            showTitleLabel={false}
                            viewMode={"portrait"} />
                    </View>
                    {this.state.error ? (
                        <View style={{
                            width: 250, backgroundColor: '#F76B8A', justifyContent: 'center',
                            alignItems: 'center', color: 'white', padding: 10, marginTop: 10, borderRadius: 10
                        }}>
                            <Text style={{ color: 'white' }}>{this.state.error}</Text>
                        </View>) : null}
                </View>

                <View style={{
                    flex: 3,
                    marginTop: 15,
                    textAlign: 'left',
                    width: 250,
                    flexDirection: "row", justifyContent: "center"
                }}>

                    <View >
                        <TouchableOpacity style={[styles.button, styles.plain]} onPress={() => { this.resetSign() }} >
                            <Text style={{ color: '#F76B8A' }}>Reset</Text>
                        </TouchableOpacity>
                    </View >
                    <View >
                        <TouchableOpacity style={[styles.button]} onPress={() => { this.saveSign() }} >
                            <Text style={{ color: 'white' }}>Complete</Text>
                        </TouchableOpacity>
                    </View >
                </View>

            </View>
        );
    }

    saveSign() {
        const consent = this.state.consent;
        let [date] = new Date().toLocaleString('en-US').split(', ');
        consent.signatureDate = date;
        if (!consent.patientName) {
            this.setState({ error: 'Fields cannot be empty' });
        } else {
            this.refs["sign"].saveImage();
            this.props.updateConsent({ consent: consent });
            this.props.navigation.navigate('Complete');
        }
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

const mapDispatchToProps = dispatch => ({
    updateConsent: (consent) => dispatch(updateConsent(consent)),
});

const mapStateToProps = (state) => ({
    user: state.user,
    consent: state.consent
});

export default connect(mapStateToProps, mapDispatchToProps)(Signature);

const styles = StyleSheet.create({
    signature: {
        height: 100,
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    },
    container: {
        flexGrow: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    center: {
        flexGrow: 2,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
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
    card: {
        marginTop: 15,
        textAlign: 'left',
        width: 250
    },
});