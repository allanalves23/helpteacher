import TeacherList from './TeacherList'
import Profile from './Profile'
import Login from './Login'

import React, {Component} from 'react'
import {SafeAreaView, ScrollView} from 'react-native'

import {createDrawerNavigator, DrawerItems, createAppContainer} from 'react-navigation'

export default class HelpTeacherApp extends Component {
    render(){
        return (
            <AppContainer/>
        )
    }
}

const Navigator = createDrawerNavigator({
    TeacherList: TeacherList,
    Profile: Profile,
}
// ,
// {
//     contentComponent: (props) => {
//         <ScrollView>
//             <SafeAreaView style={{flex: 1}}>
//                     <DrawerItems {...props} />
//             </SafeAreaView>
//         </ScrollView>
//     }
// }
)

const AppContainer = createAppContainer(Navigator) 

//export default AppContainer