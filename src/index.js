import TeacherList from './TeacherList'
import Profile from './Profile'
import Login from './Login'
import Portfolio from './components/Portfolio'

import React, {Component} from 'react'
import {SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity} from 'react-native'

import {createDrawerNavigator, createSwitchNavigator, DrawerItems, createAppContainer} from 'react-navigation'
import {Icon} from 'native-base'
import System from '../config/system'

export default class HelpTeacherApp extends Component {
    render(){
        return (
            <AppContainer/>
        )
    }
}

const CustomDrawerContentComponent = props => (
    <ScrollView style={{flex: 1}}>
        <View style={styles.header}>
            <Icon type="FontAwesome5" name="graduation-cap" style={{marginRight: 10}}></Icon>
            <Text style={{color: '#FFF', fontWeight: 'bold'}}>{System.nameUpperCase}</Text>
        </View>
        <SafeAreaView style={styles.container}>
            <DrawerItems {...props} />
        </SafeAreaView>
        <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={() => {
                alert('logout')
            }}>
                <Text style={styles.link}>Sair</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center'}}>Versão: {System.version} </Text>
                <Text style={{textAlign: 'center'}}>Build: {System.build}</Text>
                <Text style={{textAlign: 'center'}}>Descrição: {System.description}</Text>
            </View>
        </View>
    </ScrollView>
);


const styles = StyleSheet.create({
    header: {
        flex: 1,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        backgroundColor: System.colorApp
    },
    container: {
        flex: 2,
        height: 470
    },
    footer: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    link:{
        color: '#2A8EC4',
        fontSize: 18
    },
    button: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 8,
    }
});

const Navigator = createDrawerNavigator({
    TeacherList: TeacherList,
    Profile: Profile,
},{
    contentOptions: [{}],
    contentComponent: CustomDrawerContentComponent
})

const switchNavigator = createSwitchNavigator({
    AuthScreen: Login,
    AppDrawer: Navigator,
    Portfolio: Portfolio
},{
    initialRouteName: 'AuthScreen'
})



    const AppContainer = createAppContainer(switchNavigator) 