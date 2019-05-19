import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native'
import Teacher from './components/TeacherItem'
import axios from 'axios'
import {backendUrl} from '../backend'
import { Dropdown } from 'react-native-material-dropdown'
import {Header, Left, Button, Icon, Body, Title} from 'native-base'
import System from '../config/system'


export default class TeacherList extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            teachers: [],
            error: false,
            page: 1,
            prefer: '',
            sequence: '',
            query: '',
        }
    }

    static navigationOptions = {
        drawerLabel: 'PROFESSORES',
        drawerIcon: ({tintColor}) => (<Icon type="FontAwesome5" name="book" size={18} color={tintColor}></Icon>)
    }

    async componentDidMount(){
        await this.getTeachers()
        

    }
    
    async getTeachers(query, prefer, sequence, newPage){
        let page = 1
        if(newPage) page = newPage
        else {
            page = this.state.page
            this.setState({
                teachers: []
            })
        }
        sequence = sequence || ''
        prefer = prefer || ''
        query = query || ''

        this.loadingInfo(this.state)
        const url = `${backendUrl}/mobile/teachers?query=${query}&sequence=${sequence}&prefer=${prefer}&page=${page}`
        await axios(url).then(res => {
            const teachers = this.formatCost(res.data.teachers)
            this.setState({
                teachers,
                error: false,
                query
            })
        }).catch( () =>{
            this.setState({
                error: true,
                query
            })
        })

        this.loadingInfo(this.state)
    }

    formatCost(teachers){
        teachers = teachers.map((teacher) => {
            teacher.costHour = parseFloat(teacher.costHour).toFixed(2).replace('.',',')
            return teacher
        })
        return teachers
    }

    resetPage(){
        this.setState({
            page: 1
        })
    }

    loadingInfo = (prev) => {
        const previous = !prev.loading
        this.setState({
            loading: previous
        })
    }
    
    renderFooter = () => {
        if(!this.state.loading) return null
        return (
            <View><ActivityIndicator size="large" color={System.colorApp}></ActivityIndicator></View>
        )
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
                            <Title style={{justifyContent: 'center',alignItems: 'center'}}><Icon style={{marginRight: 10}} type="FontAwesome5" name="graduation-cap"></Icon><Text>{System.nameUpperCase}</Text></Title>
                        </Body>
                    </Header>
                </View>
                <View>
                    <View style={styles.buttonBar}>
                        <TouchableOpacity onPress={() =>{
                            setTimeout(async ()=> {
                                await this.resetPage()
                                const prefer = 2
                                const sequence = this.state.sequence
                                const query = this.state.query
                                this.getTeachers(query, prefer, sequence)
                            }, 1000)
                        }}>
                            <Text style={styles.buttonText}>Matéria</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>{
                            setTimeout(async ()=> {
                                await this.resetPage()
                                const prefer = 1
                                const sequence = this.state.sequence
                                const query = this.state.query
                                this.getTeachers(query, prefer, sequence)
                            }, 1000)
                        }}>
                            <Text style={styles.buttonText}>Preço</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>{
                            setTimeout(async ()=> {
                                await this.resetPage()
                                const prefer = 3
                                const sequence = this.state.sequence
                                const query = this.state.query
                                this.getTeachers(query, prefer, sequence)
                            }, 1000)
                        }}>
                            <Text style={styles.buttonText}>Professor</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingLeft: 20, paddingRight: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name="search" color="#CCC" size={18}></Icon>
                            <TextInput style={styles.searchInput} placeholder="Pesquisar..." onSubmitEditing={async (event) => {
                                const query = event.nativeEvent.text
                                await this.resetPage()
                                const prefer = this.state.prefer
                                const sequence = this.state.sequence
                                this.getTeachers(query, prefer, sequence)
                            } }></TextInput>
                        </View>
                        <View style={{width: 65}}>
                            <Dropdown style={{marginLeft: 10}}
                                label='Ordem'
                                data={[{value: 'A-Z'}, {value: 'Z-A'}]} onChangeText={async (value) => {
                                    let sequence = ''
                                    if(value === 'A-Z'){
                                        //asc
                                        sequence = 1
                                    }else{
                                        //desc
                                        sequence = ''
                                    }

                                    await this.resetPage()
                                    const prefer = this.state.prefer
                                    const query = this.state.query
                                    this.getTeachers(query, prefer, sequence)

                                }}
                            />
                        </View>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.list}>
                        { this.state.teachers.length > 0 && <FlatList onEndReached={ () => {
                            if(this.state.teachers.length <= 2) return
                            const newPage = this.state.page++

                            const sequence = this.state.sequence
                            const prefer = this.state.prefer
                            const query = this.state.query
                    
                            this.getTeachers(query, prefer, sequence, newPage)
                        }} onEndReachedThreshold={0.1} ListFooterComponent={this.renderFooter} style={{marginTop: 15, marginBottom: 15}} data={this.state.teachers} keyExtractor={(item, index) => index.toString()} renderItem={({item}) => <TouchableOpacity onPress={() => this.props.navigation.navigate('Portfolio', {id: item.idTeacher})}><Teacher teacher={item} ></Teacher></TouchableOpacity>} />}
                        { this.state.teachers.length === 0 && !this.state.loading && <Text style={{fontSize: 18}}>Nenhum resultado encontrado</Text>}
                        { this.state.teachers.length === 0 && this.state.loading && <View style={{justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size="large" color="#B42727"></ActivityIndicator><Text style={{marginTop: 8}}>Carregando professores ...</Text></View>}
                        { this.state.error && <Text style={{fontSize: 18, textAlign:'center'}}>Ocorreu um erro ao buscar os dados, tente novamente mais tarde.</Text>}
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
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20
    },
    searchInput: {
        borderBottomWidth: 0.6,
        width: 275,
        height: 45,
        marginRight: 10,
        fontSize: 18,
    },
    
})