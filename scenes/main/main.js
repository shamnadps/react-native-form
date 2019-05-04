import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, WebView, Dimensions } from 'react-native';
import commonStyles from '../common/styles';
import Button from '../components/Button';

export default class Main extends Component {
    static navigationOptions = {
        title: 'Consent Form',
        headerTitleStyle: { color: '#F76B8A', textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    };
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            loginId: this.props.loginId,
            password: this.props.password
        }
    }

    handleLoginId = (loginId) => {
        this.setState({ loginId: loginId });
    }

    handlePassword = (password) => {
        this.setState({ password: password });
    }

    render() {

        return (
            <View style={styles.container}>

                <View style={styles.center}>
                    <ScrollView contentContainerStyle={styles.containerStyle}>

                    </ScrollView>
                    <View
                        style={{ flex: 0, width: Dimensions.get('window').width, borderColor: '#F76B8A', borderWidth: 1, backgroundColor: 'white', paddingBottom: 40, flexDirection: "row", justifyContent: "center" }}
                    >
                        <Button navigate='Signature'
                            navigation={this.props.navigation}
                            position='bottom'
                            width={120}
                            text="Accept" />
                    </View>
                </View >

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
    containerStyle: {
        flexGrow: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    }

});