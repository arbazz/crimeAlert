import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';

class NewComment extends Component {
    constructor(props){
        super(props);
        this.state={
            text: ''
        }
    }

    sendData =()=>{
        const {text} = this.state;
        this.props.parent(text);
        this.props.navigation.goBack()
       
    }

    render() {
        const {text} =this.state;
        return (
            <View>
                <Text>Write your own Comment:</Text>
                <TextInput
                    style={styles.commnetsTextInput}
                    onChangeText={text => this.setState({text})}
                    value={text}
                    placeholder={"Write your commnets"}
                    multiline
                />
                <TouchableOpacity onPress={this.sendData} style={styles.submit}>
                    <Text style={styles.text}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default withNavigation(NewComment)