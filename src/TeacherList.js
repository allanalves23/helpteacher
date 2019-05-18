import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Button} from 'react-native'
import Teacher from './components/TeacherItem'
import Header from './components/Header'
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import {backendUrl} from '../backend'

export default class TeacherList extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            teachers: [],
            error: false
        }
    }

    static navigationOptions = {
        drawerLabel: 'PROFESSORES',
        drawerIcon: ({tintColor}) => (<Icon name="graduation-cap" size={18} color={tintColor}></Icon>)
    }

    async componentDidMount(){
        await this.getTeachers()
        

    }
    
    async getTeachers(){
        const url = `${backendUrl}/mobile/teachers`
        await axios(url).then(res => {
            const teachers = res.data.teachers
            this.setState({
                teachers,
                error: false
            })
        }).catch( () =>{
            this.setState({
                error: true
            })
        })

        this.loadingInfo(this.state)
    }

    loadingInfo = (prev) => {
        const previous = !prev.loading
        this.setState({
            loading: previous
        })
    }
    
    render(){
        return(
            <View style={{flex: 1}}>
                <Header></Header>
                <View>
                    <View style={styles.buttonBar}>
                        <TouchableOpacity onPress={() =>{
                            //programação ação
                        }}>
                            <Text style={styles.buttonText}>Matéria</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>{
                            //programação ação
                        }}>
                            <Text style={styles.buttonText}>Preço</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>{
                            //programação ação
                        }}>
                            <Text style={styles.buttonText}>Professor</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name="search" color="#CCC" size={18}></Icon>
                        <TextInput style={styles.searchInput} placeholder="Pesquisar..." onChangeText={(value) => {
                            //programar pesquisa por digitação
                        } }></TextInput>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.list}>
                        { this.state.teachers.length > 0 && !this.state.loading && <FlatList style={{marginTop: 15, marginBottom: 15}} data={this.state.teachers} keyExtractor={(item, index) => index.toString()} renderItem={({item}) => <Teacher teacher={item} ></Teacher>} />}
                        { this.state.teachers.length === 0 && this.state.loading && <ActivityIndicator size="large" color="#B42727"></ActivityIndicator>}
                        { this.state.teachers.length === 0 && !this.state.loading && <Text style={{fontSize: 18}}>Nenhum resultado encontrado</Text>}
                        { this.state.error  && <Text style={{fontSize: 18}}>Ocorreu um erro ao buscar os dados, tente novamente mais tarde.</Text>}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonBar: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomColor: '#CCC',
        borderBottomWidth: 0.9
    },
    buttonText: {
        color: '#31A7F9',
        fontSize: 15,
        borderBottomWidth: 0.8,
        borderBottomColor: '#31A7F9'
    },
    list: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        borderBottomWidth: 0.6,
        width: 300,
        height: 45,
        marginLeft: 5,
        fontSize: 18,
    },
    
})