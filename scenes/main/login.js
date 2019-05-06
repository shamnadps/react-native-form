import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import commonStyles from '../common/styles';
import CustomButton from '../components/Button';
import { connect } from 'react-redux';
import { addUser } from '../../reducer/actions';

class Login extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            user: this.props.user
        }
    }

    handleLoginId = (username) => {
        this.setState({ username: username, error: '' });
    }

    handlePassword = (password) => {
        this.setState({ password: password, error: '' });
    }

    loginUser = () => {
        const user = this.state.user;
        if (!this.state.username || !this.state.password) {
            this.setState({ error: 'Fields cannot be empty' })
        }
        else if (user.name != this.state.username) {
            this.setState({ error: 'Username doesnt exist' });
        } else if (user.password != this.state.password) {
            this.setState({ error: 'Wrong Password' });
        } else {
            this.setState({ error: '' });
            this.props.navigation.navigate('Details');
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.center}>
                    <ScrollView contentContainerStyle={styles.containerStyle}>
                        <Text style={{ marginBottom: 20, fontSize: 20, color: '#F76B8A', fontWeight: 'bold' }}>Patient Consent 2.0</Text>
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
                                onChangeText={(password) => this.handlePassword(password)}
                                value={this.state.password} />
                        </View>
                        {this.state.error ? (
                            <View style={{
                                width: 250, backgroundColor: '#F76B8A', justifyContent: 'center',
                                alignItems: 'center', color: 'white', padding: 10, marginTop: 10, borderRadius: 10
                            }}>
                                <Text style={{ color: 'white' }}>{this.state.error}</Text>
                            </View>) : null}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button]} onPress={() => { this.loginUser() }} >
                                <Text style={{ color: 'white' }}>Login</Text>
                            </TouchableOpacity>
                        </View >
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

const mapDispatchToProps = dispatch => ({
    addUser: (user) => dispatch(addUser(user)),
});

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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