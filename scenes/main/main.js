import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, WebView, Dimensions } from 'react-native';
import commonStyles from '../common/styles';
import Button from '../components/Button';
import Pdf from 'react-native-pdf';

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
        const source = Platform.select({
            ios: require('./test.pdf'),
            android: { uri: 'bundle-assets://test.pdf' },
        });
        return (
            <View style={styles.container}>

                <View style={styles.center}>
                    <ScrollView contentContainerStyle={styles.containerStyle}>
                        <Pdf
                            source={source}
                            onLoadComplete={(numberOfPages, filePath) => {
                                console.log(`number of pages: ${numberOfPages}`);
                            }}
                            onPageChanged={(page, numberOfPages) => {
                                console.log(`current page: ${page}`);
                            }}
                            onError={(error) => {
                                console.log(error);
                            }}
                            style={styles.pdf} />
                        <View
                            style={{ flex: 0, backgroundColor: 'white', paddingBottom: 40, width: 200, flexDirection: "row", justifyContent: "center" }}
                        >
                            <Button navigate='Record'
                                navigation={this.props.navigation}
                                position='bottom'
                                width={120}
                                text="Accept" />
                            <Button navigate='Login'
                                navigation={this.props.navigation}
                                position='bottom'
                                type='plain'
                                width={120}
                                text="Log out" />
                        </View>
                    </ScrollView>
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
        flexGrow: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    }

});