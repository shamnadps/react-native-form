import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, WebView, Dimensions, Image } from 'react-native';
import commonStyles from '../common/styles';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { updateConsent } from '../../reducer/actions';

class Complete extends Component {
    static navigationOptions = {
        title: 'Completed',
        headerTitleStyle: { color: '#F76B8A', textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
        headerLeft: null
    };
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            user: this.props.user,
            consent: this.props.consent
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.center}>
                    <ScrollView contentContainerStyle={styles.containerStyle}>
                        <Text style={{ marginBottom: 20, fontSize: 20, color: '#F76B8A', fontWeight: 'bold' }}>All Done! Here is a pony for you!</Text>
                        <Image style={{ width: 200, height: 200 }} source={require('../images/horse.png')} />
                    </ScrollView>
                    <View
                        style={{ flex: 0, width: Dimensions.get('window').width, borderColor: 'lightgrey', borderWidth: 1, backgroundColor: 'white', paddingBottom: 40, flexDirection: "row", justifyContent: "center" }}
                    >
                        <Button navigate='Login'
                            navigation={this.props.navigation}
                            position='bottom'
                            width={120}
                            text="Start Again" />
                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Complete);

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
});