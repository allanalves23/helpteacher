import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Header, Left, Body, Button, Icon, Title} from 'native-base'
import System from '../config/system'

export default class TeacherList extends Component {
    constructor(props){
        super(props)
    }

    static navigationOptions = {
        drawerLabel: 'MEU PERFIL',
        drawerIcon: ({tintColor}) => (<Icon type="FontAwesome5" name="user" size={18} color={tintColor}></Icon>)
    }


    render(){
        return(
            <View style={{flex: 1}}>
                <View>
                    <Header style={{backgroundColor: System.colorApp}}>
                        <Left>
                            <Button style={{backgroundColor: System.colorApp}} onPress={() => {
                                this.props.navigation.openDrawer()
                            }}>
                                <Icon name="menu"></Icon>
                            </Button>
                        </Left>
                        <Body>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('TeacherList')}>
                                <Title style={{justifyContent: 'center',alignItems: 'center'}}><Icon style={{marginRight: 10}} type="FontAwesome5" name="graduation-cap"></Icon><Text>{System.nameUpperCase}</Text></Title>
                            </TouchableOpacity>
                        </Body>
                    </Header>
                </View>
                <View style={styles.content}>
                    <Text>My Profile</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }
})