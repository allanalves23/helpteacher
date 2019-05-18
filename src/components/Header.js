import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class TeacherList extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={{borderBottomColor: '#000', borderBottomWidth: 0.8}}>
                <View style={{backgroundColor: '#B42727', padding: 15}}>
                    <Text style={{fontSize: 25, textAlign: 'center', fontWeight: 'bold', color: '#fff'}}>HELP TEACHER</Text>
                </View>
            </View>
        )
    }
}