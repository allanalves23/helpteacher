import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import Teacher from './components/TeacherItem'
import Header from './components/Header'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class TeacherList extends Component {
    constructor(props){
        super(props)
    }

    static navigationOptions = {
        drawerLabel: 'PROFESSORES',
        drawerIcon: ({tintColor}) => (<Icon name="graduation-cap" size={18} color={tintColor}></Icon>)
    }

    render(){
        return(
            <View>
                <Header></Header>
                <View style={styles.buttonBar}>
                    <TouchableOpacity>
                        <Text style={styles.buttonText}>Matéria</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.buttonText}>Preço</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.buttonText}>Professor</Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin: 15, marginBottom: 50, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name="search" color="#CCC" size={18}></Icon>
                    <TextInput style={styles.searchInput} placeholder="Pesquisar..."></TextInput>
                </View>
                <ScrollView contentContainerStyle={styles.list}>
                    <Teacher></Teacher>
                    <Teacher></Teacher>
                    <Teacher></Teacher>
                    <Teacher></Teacher>
                    <Teacher></Teacher>
                    <Teacher></Teacher>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonBar: {
        padding: 40,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    buttonText: {
        color: '#31A7F9',
        fontSize: 15,
        borderBottomWidth: 0.8,
        borderBottomColor: '#31A7F9'
    },
    list: {
        margin: 10,
        alignItems: 'center',
        paddingVertical: 20
    },
    searchInput: {
        borderBottomWidth: 0.6,
        width: 300,
        height: 45,
        marginLeft: 5,
        fontSize: 18,
    },
    
})