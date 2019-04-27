import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import commonStyles from '../common/styles';
import Button from '../components/Button';
import SwitchSelector from "react-native-switch-selector";

export default class Register extends Component {
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
                        <Text style={{ marginBottom: 20, fontSize: 20, color: '#F76B8A', fontWeight: 'bold' }}>Registration</Text>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Name</Text>
                            <TextInput

                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(firstName) => this.handleLoginId(firstName)}
                                value={this.state.firstName} />
                        </View>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Mobile No</Text>
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
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Confirm Password</Text>
                            <TextInput
                                secureTextEntry={true}
                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(firstName) => this.handlePassword(firstName)}
                                value={this.state.firstName} />
                        </View>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Sex</Text>
                            <SwitchSelector
                                initial={2}
                                onPress={value => this.setState({ gender: value })}
                                textColor={'#F76B8A'} //'#7a44cf'
                                selectedColor={'#FFFFFF'}
                                buttonColor={'#F76B8A'}
                                borderColor={'lightgrey'}
                                hasPadding
                                borderRadius={5}
                                options={[
                                    { label: "Female", value: "f" }, //images.feminino = require('./path_to/assets/img/feminino.png')
                                    { label: "Male", value: "m" },
                                    { label: "Other", value: "n" }
                                ]}
                            />
                        </View>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Email</Text>
                            <TextInput

                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(firstName) => this.handleLoginId(firstName)}
                                value={this.state.firstName} />
                        </View>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Address</Text>
                            <TextInput

                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(firstName) => this.handleLoginId(firstName)}
                                value={this.state.firstName} />
                        </View>
                        <Button navigate='Login'
                            navigation={this.props.navigation}
                            position='bottom'
                            text="Register" />
                        <Button navigate='Login'
                            navigation={this.props.navigation}
                            position='bottom'
                            type='plain'
                            text="Cancel" />
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
    }

});