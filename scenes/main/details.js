import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Picker } from 'react-native';
import commonStyles from '../common/styles';
import Button from '../components/Button';
import { CheckBox } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux';
import { addUser } from '../../reducer/actions';

class Details extends Component {
    static navigationOptions = {
        title: 'Patient Detail',
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
            password: this.props.password,
            checked: false,
            ok: 'simple',
            language: 'java',
            date:"2019-05-06",
            disabled: true,
            user: this.props.user
        }
    }

    handleLoginId = (loginId) => {
        this.setState({ loginId: loginId });
    }

    handlePassword = (password) => {
        this.setState({ password: password });
    }

    checkBoxOnChange = () => {
        this.setState({ checked: !this.state.checked });
    }

    onDropDownChange = (value) => {
        this.setState({
            consentText: this.getConsentData(value)
        });
    }

    onRiskChange = (value) => {
        this.setState({ riskText: this.getRuleText(value), disabled: false });
    }

    getRuleText = (value) => {
        switch (value) {
            case 'Common (2-5)%':
                return (<Text style={{ color: 'grey' }}>Anterior Cruciate Ligament (ACL)	Reconstruction (arthroscopic) – using autograft</Text>);
            case 'Less Common (1-2)%':
                return (<Text style={{ color: 'grey' }}>  
                <Text style={{textDecorationLine: 'underline',fontWeight: 'bold'}}>Infection:</Text> the wound sites may become red, painful and hot. There may also be 
                a discharge. These are signs of infection and can usually be treated by 
                  antibiotics. The infection may spread to the knee joint itself (requiring 
                   a washout) and removal of the graft. Infection may also spread to the 
                blood (sepsis) requiring intravenous antibiotics. 
                {"\n"}{"\n"}<Text style={{textDecorationLine: 'underline',fontWeight: 'bold'}}>Graft rupture:</Text> (torn graft) this may occur  after further trauma. Further surgery may 
                be necessary. 
     </Text>)
            case 'Rare (<1)%':
                return (<Text style={{ color: 'grey' }}>
                <Text style={{textDecorationLine: 'underline',fontWeight: 'bold'}}>Damage to structures within the knee:</Text> this is rare, but may cause further damage and
                symptoms. This may need further treatment including operation. These
               include fractured knee cap (patella) if a patellar tendon graft is used.
               {"\n"}{"\n"}<Text style={{textDecorationLine: 'underline',fontWeight: 'bold'}}>Damage to the skin under the tourniquet:</Text> this may require dressing, surgery or skin
               graft. There may also be numbness of the skin under the tourniquet,
              this is usually temporary.
              {"\n"}{"\n"}<Text style={{textDecorationLine: 'underline',fontWeight: 'bold'}}>Damaged instruments:</Text> these may break within the knee and require an opening of the
                joint to remove them.
                {"\n"}{"\n"}<Text style={{textDecorationLine: 'underline',fontWeight: 'bold'}}>Abnormal wound healing:</Text> the scar may become thick, red and painful (keloid scar).
               This is more common in Afro-Caribbeans. There may also be delayed
          wound healing for numerous reasons.
          {"\n"}{"\n"}<Text style={{textDecorationLine: 'underline',fontWeight: 'bold'}}>Compartment syndrome:</Text> this is a build up pressure within the lower leg and can
                  cause nerve damage, blood vessel damage and muscle damage. If this
                occurs, an emergency operation will have to be performed to prevent
                     death of tissue of the lower leg/ foot.
                     {"\n"}{"\n"}<Text style={{textDecorationLine: 'underline',fontWeight: 'bold'}}>Osteoarthritis:</Text> this can be more common after joint operations.
   </Text>);
            default:
                return <Text></Text>
        }
    }

    getConsentData = (value) => {
        let risks = [{
            value: 'Common (2-5)%',
        }, {
            value: 'Less Common (1-2)%',
        }, {
            value: 'Rare (<1)%',
        }];

        switch (value) {
            case 'Operation':
                this.setState({disabled: false});
                return (<Text style={{ color: 'grey' }}>Anterior Cruciate Ligament (ACL)	Reconstruction (arthroscopic) – using autograft</Text>);
            case 'Procedure':
                this.setState({disabled: false});
                return (<Text style={{ color: 'grey' }}>The Anterior cruciate is a ligament that runs inside the knee from the thigh bone to the shin bone giving stability to the knee joint.Loss or damage of the ligament can make the knee more prone to ‘giving way’.Your ACL has torn(ruptured).

                {"\n"}{"\n"}You may have come to a joint decision with your surgeon to attempt a reconstruction.
                {"\n"}{"\n"}After the operation, you will more than likely be introduced to a rehabilitation(physio) program.It is very important you attend this strictly.
    
                {"\n"}{"\n"}*** please be aware that a surgeon other than your consultant but with adequate training or supervision may perform the operation ***</Text>)
            case 'Alternative Procedure':
                this.setState({disabled: false});
                return (<Text style={{ color: 'grey' }}>Some patients simply avoid activities that cause their knees to be unstable.

                    {"\n"}{"\n"}Physiotherapy and increasing strength of hamstrings and quadriceps may be able to compensate for the injury.The knee may still however be prone to ‘giving way’ and instability.

                    {"\n"}{"\n"}The decision to proceed to a reconstruction should be a joint one between yourself and the surgeon.

                    {"\n"}{"\n"}There are also alternative methods of reconstruction and numerous grafts that can be used.You should discuss the options with your surgeon before hand.</Text>);
            case 'Risks':
                this.setState({disabled: true});
                return (<View>
                    <Text style={{ color: 'grey' }}>As with all procedures, this carries some risks and complications.</Text>
                    <Dropdown
                        label='Risk Level'
                        data={risks}
                        onChangeText={(value) => this.onRiskChange(value)}
                    />
                </View>);
            default:
                return <Text></Text>
        }
    }

    render() {
        let data = [{
            value: 'Operation',
        }, {
            value: 'Procedure',
        }, {
            value: 'Alternative Procedure',
        }, {
            value: 'Risks',
        }];
        return (
            <View style={styles.container}>

                <View style={styles.center}>
                    <View style={styles.card}>
                        <Text style={{ color: '#F76B8A', fontWeight : 'bold' }}>Welcome {this.state.user.name}</Text>
                    </View>
                    <ScrollView contentContainerStyle={styles.containerStyle}>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Responsible Surgeon</Text>
                            <TextInput

                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(firstName) => this.handleLoginId(firstName)}
                                value={this.state.firstName} />
                        </View>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>First Name</Text>
                            <TextInput

                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(firstName) => this.handleLoginId(firstName)}
                                value={this.state.firstName} />
                        </View>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Surname</Text>
                            <TextInput

                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(firstName) => this.handleLoginId(firstName)}
                                value={this.state.firstName} />
                        </View>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Hospital No</Text>
                            <TextInput

                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(firstName) => this.handleLoginId(firstName)}
                                value={this.state.firstName} />
                        </View>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>DOB</Text>
                            <DatePicker
                                style={{width:250,borderWidth:1,borderColor: 'lightgrey', borderRadius:10}}
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="1920-01-01"
                                maxDate="2019-05-08"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36,
                                    borderWidth:0,
                                }
                                // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />
                        </View>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>NHS Organization</Text>
                            <TextInput

                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(firstName) => this.handleLoginId(firstName)}
                                value={this.state.firstName} />
                        </View>
                        <View style={styles.card}>
                            <Text style={{ color: 'grey' }}>Job Title</Text>
                            <TextInput

                                style={[commonStyles.input, commonStyles.shadowBox]}
                                onChangeText={(firstName) => this.handleLoginId(firstName)}
                                value={this.state.firstName} />
                        </View>
                        <View style={styles.card}>
                            <CheckBox
                                title='No Special Requirements'
                                containerStyle={{ backgroundColor: 'white' }}
                                checked={this.state.checked}
                                onPress={() => { this.checkBoxOnChange() }}
                            />
                        </View>
                        <View style={styles.card}>
                            <Dropdown
                                label='Consent'
                                data={data}
                                onChangeText={(value) => this.onDropDownChange(value)}
                            />
                        </View>
                        <View style={styles.card}>
                            {this.state.consentText}
                        </View>
                        <View style={styles.card}>
                            {this.state.riskText}
                        </View>
                        <Button navigate='VideoConsent'
                            navigation={this.props.navigation}
                            disabled={this.state.disabled}
                            position='bottom'
                            type='plain'
                            text="Continue" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Details);

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