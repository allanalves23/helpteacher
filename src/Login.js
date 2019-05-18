import React, {Component} from 'react'
import {View, Text, Button, StyleSheet, TextInput} from 'react-native'


export default class TeacherList extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.auth_modal_form}>
                    <View style={styles.auth_modal_title}>
                        <Text style={{fontSize: 25}}>Help Teacher</Text>
                    </View>
                    <Text>Login</Text>
                    <TextInput style={styles.input}></TextInput>
                    <Text>Senha</Text>
                    <TextInput style={styles.input} secureTextEntry={true}></TextInput>
                    <Button title="Acessar" onPress= {() => {
                        this.props.navigation.navigate('TeacherList')
                    }}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    auth_modal_title: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 35,
    },
    auth_modal_form: {
        flex: 2,
        backgroundColor: '#FFFFFF',
        padding: 35,
    },
    input: {
        width: 150,
        fontSize: 21
    }
    
})