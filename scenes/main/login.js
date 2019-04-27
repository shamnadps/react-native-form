import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import commonStyles from '../common/styles';
import CustomButton from '../components/Button';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
    static navigationOptions = { header: null };
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
                        <Text style={{ marginBottom: 20, fontSize: 20, color: '#F76B8A', fontWeight: 'bold' }}>Welcome</Text>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Login ID</Text>
                            <TextInput

                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(firstName) => this.handleLoginId(firstName)}
                                value={this.state.firstName} />
                        </View>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Password</Text>
                            <TextInput
                                secureTextEntry={true}
                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(firstName) => this.handlePassword(firstName)}
                                value={this.state.firstName} />
                        </View>
                        <CustomButton navigate='Main'
                            navigation={this.props.navigation}
                            position='bottom'
                            text="Login" />
                        <CustomButton navigate='Register'
                            navigation={this.props.navigation}
                            position='bottom'
                            type='plain'
                            text="Register" />
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
        width: 250,
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
    }

});