import React, {Component} from 'react'
import {View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Share} from 'react-native'
import {Header, Left, Button, Body, Title, Icon} from 'native-base'
import System from '../../config/system'
import axios from 'axios'
import {backendUrl} from '../../backend'

export default class Portfolio extends Component{

    constructor(props){
        super(props)
        this.state = {
            id: this.props.navigation.getParam('id'),
            loading: false,
            teacher: {},
            graduations: [],
            disciplines: [],
            error: false
        }
    }

    componentDidMount(){
        this.getTeacher()
    }

    async getTeacher(){
        const id = this.state.id
        if(!id) return this.props.navigation.navigate('TeacherList')
        const url = `${backendUrl}/mobile/teachers/${id}`
        this.loadingInfo(this.state)
        await axios(url).then(res => this.setState({
            teacher: res.data.teacher,
            graduations: res.data.graduations,
            disciplines: res.data.disciplines
        })).catch(() => {
            this.setState({
                error: true
            })
        })
        this.loadingInfo(this.state)
    }

    loadingInfo(prev){
        const previous = !prev.loading
        this.setState({
            loading: previous
        })
    }

    computeBirthDate(date){
        if(!date) return null
        const aux = date.split('-')
        const newDate = `${aux[2]}/${aux[1]}/${aux[0]}`
        return newDate
    }



    render(){
        return(
            <ScrollView style={{flex: 1}}>
                <View>
                    <View>
                        <Header style={{backgroundColor: System.colorApp}}>
                            <Left>
                                <Button style={{backgroundColor: System.colorApp}} onPress={() => {
                                    this.props.navigation.navigate('AppDrawer')
                                }}>
                                    <Icon type="FontAwesome5" name="arrow-left"></Icon>
                                </Button>
                            </Left>
                            <Body>
                                <Title style={{justifyContent: 'center',alignItems: 'center'}}><Icon style={{marginRight: 10}} type="FontAwesome5" name="graduation-cap"></Icon><Text>{System.nameUpperCase}</Text></Title>
                            </Body>
                        </Header>
                    </View>
                    { !this.state.loading && <View style={styles.container}>
                        <View style={{flexDirection: 'row', margin: 18, justifyContent: 'flex-start', alignItems: 'center', marginLeft: 10,  borderBottomColor: '#CCC', borderBottomWidth: 0.8, width: 225}}>
                            <Icon type="FontAwesome5" name="user" size={18} style={{marginRight: 5}}></Icon> 
                            <Text style={{fontSize: 18}}>Professor {this.state.teacher.name}</Text>
                        </View>
                        <View style={{flexDirection: 'row', margin: 5, justifyContent: 'space-between'}}>
                            <Image style={{width: 145, height: 145}} source={require('../../assets/curriculum.png')}></Image>
                            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'flex-start', paddingTop: 20, paddingBottom: 10}}>
                                <Text style={{marginBottom: 8, fontSize: 16, color: '#000'}}>Nome:  {this.state.teacher.name || ''}</Text>
                                <Text style={{marginBottom: 8, fontSize: 16, color: '#000'}}>Especialidade: {this.state.teacher.especiality || ''}</Text>
                                <Text style={{marginBottom: 8, fontSize: 16, color: '#000'}}>Estado de atuação:  {this.state.teacher.state || ''}</Text>
                                <Text style={{marginBottom: 8, fontSize: 16, color: '#000'}}>Bairro de atuação:  {this.state.teacher.neighborhood || ''}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', margin: 5 ,justifyContent: 'flex-start', alignItems: 'center', marginLeft: 10,  borderBottomColor: '#CCC', borderBottomWidth: 0.8, width: 225}}>
                            <Icon name="information-circle" size={18} style={{marginRight: 5}}></Icon> 
                            <Text style={{fontSize: 18}}>Informações</Text>
                        </View>
                        <View style={{padding: 15}}>
                            <Text style={{marginBottom: 8, fontSize: 16, color: '#000'}}>Telefone: {this.state.teacher.telphone || ''}</Text>
                            <Text style={{marginBottom: 8, fontSize: 16, color: '#000'}}>E-mail: {this.state.teacher.email || ''}</Text>
                            <Text style={{marginBottom: 8, fontSize: 16, color: '#000'}}>Data de nascimento: {this.computeBirthDate(this.state.teacher.birthDate)}</Text>
                        </View>
                        <View style={{flexDirection: 'row', margin: 5 ,justifyContent: 'flex-start', alignItems: 'center', marginLeft: 10,  borderBottomColor: '#CCC', borderBottomWidth: 0.8, width: 225}}>
                            <Icon name="school" size={18} style={{marginRight: 5}}></Icon> 
                            <Text style={{fontSize: 18}}>Disciplinas aplicáveis</Text>
                        </View>
                        <View style={{padding: 15}}>
                            {this.state.disciplines.length > 0 &&<FlatList data={this.state.disciplines} keyExtractor={(item) => item.idDiscipline.toString()} renderItem={({item}) => <Text style={{marginBottom: 8, fontSize: 16, color: '#000'}}> {item.discipline} - {item.acting_area}</Text> }></FlatList>}
                            {this.state.disciplines.length === 0 && <Text style={{fontSize: 16, color: '#000'}}>NENHUMA DISCIPLINA ENCONTRADA</Text>}
                        </View>
                    </View>}
                    { !this.state.loading && <View style={{flexDirection: 'row',justifyContent: 'center', marginTop: 20, marginBottom: 20, alignItems: 'center', padding: 7}}>
                        <TouchableOpacity onPress={() => Share.share({message: `Olá professor(a) ${this.state.teacher.name}, gostaria de ter aula com o(a) senhor(a) ...`, title: `HELP TEACHER - CONTATO DE FUTURO ALUNO`}, {dialogTitle: 'Entrar em contato via', subject: this.state.teacher.email})} style={{backgroundColor: System.colorApp, padding: 10, borderRadius: 10}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFF'}}>Quero ter aula com esse professor!</Text>
                        </TouchableOpacity>
                    </View>}
                    { this.state.loading && <View style={{justifyContent: 'center', alignItems: 'center', height: 250}}><ActivityIndicator size="large" color="#B42727"></ActivityIndicator><Text style={{marginTop: 10}}>Carregando curriculum ...</Text></View>}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 7
    }
})