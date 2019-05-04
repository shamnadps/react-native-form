import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

export default consentdata = (value) => {
    let risks = [{
        value: 'COMMON (2-5)%',
    }, {
        value: 'LESS COMMON (1-2)%',
    }, {
        value: 'RARE (<1)%',
    }];

    switch (value) {
        case 'Operation':
            return (<Text>Anterior Cruciate Ligament (ACL)	Reconstruction (arthroscopic) – using autograft</Text>);
        case 'Procedure':
            return (<Text>The Anterior cruciate is a ligament that runs inside the knee from the thigh bone to the shin bone giving stability to the knee joint.Loss or damage of the ligament can make the knee more prone to ‘giving way’.Your ACL has torn(ruptured).

            You may have come to a joint decision with your surgeon to attempt a reconstruction.
            After the operation, you will more than likely be introduced to a rehabilitation(physio) program.It is very important you attend this strictly.

            *** please be aware that a surgeon other than your consultant but with adequate training or supervision may perform the operation ***</Text>)
        case 'Alternative Procedure':
            return (<Text>Some patients simply avoid activities that cause their knees to be unstable.

                Physiotherapy and increasing strength of hamstrings and quadriceps may be able to compensate for the injury.The knee may still however be prone to ‘giving way’ and instability.

                The decision to proceed to a reconstruction should be a joint one between yourself and the surgeon.

                There are also alternative methods of reconstruction and numerous grafts that can be used.You should discuss the options with your surgeon before hand.</Text>);
        case 'Risks':
            return (<View>
                <Text>As with all procedures, this carries some risks and complications.</Text>
                <Dropdown
                    label='Risk Level'
                    data={risks}
                    onChangeText={(value) => this.onRiskChange(value)}
                />
                <Text>{this.state.selectedRisk}</Text>
            </View>);
        default:
            return <Text></Text>

    }
}
