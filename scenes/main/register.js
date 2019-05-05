import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import commonStyles from '../common/styles';
import Button from '../components/Button';
import SwitchSelector from "react-native-switch-selector";
import { connect } from 'react-redux';
import { addUser } from '../../reducer/actions';

class Register extends Component {
    static navigationOptions = {
        title: 'Registration',
        headerTitleStyle: { color: '#F76B8A', textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    };
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            user: this.props.user
        }
    }

    handleInput = (attr, value) => {
        var user = this.state.user;
        user[attr] = value
        this.setState({ user: user, error: '' });
    }

    loginUser = () => {
        this.props.navigation.navigate('Login');
    }

    registerUser = () => {
        const user = this.state.user;
        if (!user.name || !user.email || !user.address || !user.password || !user.mobile || !user.confirmPassword) {
            this.setState({ error: 'Fields cannot be empty' })
        }
        else if (user.password != user.confirmPassword) {
            this.setState({ error: 'Passwords donot match' });
        } else {
            this.props.addUser({ user: user });
            this.setState({ error: '' });
        }
        this.props.navigation.navigate('Details');
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.center}>
                    <ScrollView contentContainerStyle={styles.containerStyle}>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Name</Text>
                            <TextInput

                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(name) => this.handleInput('name', name)}
                                value={this.state.user.name} />
                        </View>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Mobile No</Text>
                            <TextInput

                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(mobile) => this.handleInput('mobile', mobile)}
                                value={this.state.user.mobile} />
                        </View>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Password</Text>
                            <TextInput
                                secureTextEntry={true}
                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(password) => this.handleInput('password', password)}
                                value={this.state.user.password} />
                        </View>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Confirm Password</Text>
                            <TextInput
                                secureTextEntry={true}
                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(confirmPassword) => this.handleInput('confirmPassword', confirmPassword)}
                                value={this.state.user.confirmPassword} />
                        </View>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Sex</Text>
                            <SwitchSelector
                                initial={2}
                                onPress={value => this.handleInput('sex', value)}
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
                                onChangeText={(email) => this.handleInput('email', email)}
                                value={this.state.user.email} />
                        </View>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Address</Text>
                            <TextInput

                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(address) => this.handleInput('address', address)}
                                value={this.state.user.address} />
                        </View>
                        {this.state.error ? (
                            <View style={{
                                width: 250, backgroundColor: '#F76B8A', justifyContent: 'center',
                                alignItems: 'center', color: 'white', padding: 10, marginTop: 10, borderRadius: 10
                            }}>
                                <Text style={{ color: 'white' }}>{this.state.error}</Text>
                            </View>) : null}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.plain]} onPress={() => { this.registerUser() }} >
                                <Text style={{ color: '#F76B8A' }}>Register</Text>
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
    addUser: (user) => dispatch(addUser(user)),
});

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

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
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 15,
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
    plain: {
        backgroundColor: '#FFFFFF',
        color: '#F76B8A',
        borderColor: '#F76B8A',
    },

});