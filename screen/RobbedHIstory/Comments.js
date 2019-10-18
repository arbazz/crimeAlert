import React, { Component } from 'react';
import { View, Text, TouchableHighlight, ScrollView, Alert } from 'react-native';
import styles from './style'
import NewComment from './NewComment'
import { saveComment, getComment } from '../../Firebase/database'

export default class Comments extends Component {
    constructor(props) {
        super();
        this.state = {
            comments: []
        }
    }

    async componentDidMount() {
        const id = this.props.navigation.state.params.docId
        const comments = await getComment(id);
        this.setState({ comments })
        console.log(comments)
    }

    getData = (e) => {
        const id = this.props.navigation.state.params.docId
        saveComment(id, e).then(() => {
            console.log("true")
            Alert.alert(
                'Succes',
                'comment added',
            );

        });


    }

    render() {
        const { comments } = this.state;
        return (
            <ScrollView>
                <View>
                    {!!comments.length && comments.map((e) => {
                        return (
                            <View style={styles.commentsContainer} key={e.docId}>
                                <Text>{e.docData.comment}</Text>
                                <View style={styles.seprator}></View>
                            </View>
                        )
                    })
                    }
                    <TouchableHighlight style={styles.NewComment}>
                        <NewComment parent={this.getData} />
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
}