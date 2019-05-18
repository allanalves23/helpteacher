import React, {Component} from 'react'
import {View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class TeacherList extends Component {
    constructor(props){
        super(props)
    }

    static navigationOptions = {
        drawerLabel: 'MEU PERFIL',
        drawerIcon: ({tintColor}) => (<Icon name="user" size={18} color={tintColor}></Icon>)
    }

    render(){
        return(
            <View>
                <Text>Profile </Text>
            </View>
        )
    }
}