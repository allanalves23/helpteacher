import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, TouchableOpacity, Image, StyleSheet, Picker, ActivityIndicator} from 'react-native'
import {Header, Left, Button, Icon, Body, Title, DatePicker, Content, Toast} from 'native-base'
import System from '../config/system'
import axios from 'axios'
import {backendUrl} from '../backend'
export default class NotRegistered extends Component {
    constructor(props){
        super(props)
        this.state = {
            mode : 'student',
            type: 'student',
            success: false,
            error: false,
            loading: false,

            name: '',
            email: '',
            gender: 'Female',
            birthDate: '',
            password: '',

        }
    }

    async sendRequest(){
        const user = {
            name: this.state.name,
            email: this.state.email,
            gender: this.state.gender,
            birthDate: this.state.birthDate,
            password: this.state.password,
            type: this.state.type
        }
        const url = `${backendUrl}/mobile/user`
        let response = null
        this.loadingInfo(this.state)
        await axios.post(url, user).then(() => {
            Toast.show({
                text: 'Cadastro Realizado com sucesso, realize o seu login',
                type: 'success',
                position: 'top',
                duration: 3000
            })
            response = true
        }).catch(error => {
            Toast.show({
                text: error.response.data || 'Ocorreu um erro desconhecido, se persistir reporte',
                type: 'danger',
                position: 'top',
                duration: 3000
            })
        })

        this.loadingInfo(this.state)
        return response
    }

    loadingInfo(prev){
        const previous = !prev.loading
        this.setState({
            loading: previous
        })
    }

    changeTypeRegister(){
        let register = this.state.type
        if(register === 'student') register = 'teacher'
        else register = 'student'
        this.setState({
            type: register
        })
    }

    render(){
        return (
            <ScrollView style={{flex: 1}}>
                <View>
                    <Header style={{backgroundColor: '#FFF'}}>
                        <Left>
                            <Button style={{backgroundColor: '#FFF'}} onPress={() => {
                                this.props.navigation.navigate('AuthScreen')
                            }}>
                                <Icon type="FontAwesome5" name="arrow-left" style={{color: '#000'}}></Icon>
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{justifyContent: 'center',alignItems: 'center', color: '#000'}}><Icon style={{marginRight: 10}} type="FontAwesome5" name="graduation-cap"></Icon><Text>{System.nameUpperCase}</Text></Title>
                        </Body>
                    </Header>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Realize seu cadastro</Text>
                    <View style = {styles.topo}>
                        <View>
                            {this.state.type === 'student' && <Image source={require('../assets/student.png')}></Image>}
                            {this.state.type === 'student' && <Text style={{fontSize: 18, textAlign: 'center'}}>Aluno</Text>}
                            {this.state.type === 'teacher' && <Image source={require('../assets/teacher.png')}></Image>}
                            {this.state.type === 'teacher' && <Text style={{fontSize: 18, textAlign: 'center'}}>Professor</Text>}
                        </View>
                    </View> 
                    <View style={{marginTop: 10, paddingTop: 10, borderBottomColor: '#CCC', borderBottomWidth: 0.8, width: "100%"}}>
                            <Text style={{textAlign: "center"}}>Eu sou um:</Text>
                            <View style={{flexDirection:'row', justifyContent: 'center'}}>
                                <TouchableOpacity style={{padding: 15}} onPress={() => {
                                    let register = this.state.type
                                    if(register === 'student') register = 'teacher'
                                    else register = 'student'
                                    this.setState({
                                        type: register
                                    })
                                }}>
                                    <Text style={{color: '#31A7F9'}}>Aluno</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{padding: 15}} onPress={() => {
                                    let register = this.state.type
                                    if(register === 'student') register = 'teacher'
                                    else register = 'student'
                                    this.setState({
                                        type: register
                                    })
                                }}>
                                    <Text style={{color: '#31A7F9'}}>Professor</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    <View style = {styles.body}>
                        <View style={styles.formRow}>
                            <Text style={styles.text}>Nome</Text>
                            <TextInput onChangeText={(value) => this.setState({name: value})} style={styles.input}></TextInput>
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.text}>Data de Nascimento</Text>
                            <Content style={styles.inputPicker}>
                                <DatePicker placeHolderText=" " minimumDate={new Date(1900, 1, 1)} maximumDate={new Date(2018, 12, 31)} locale={"pt-br"} 
                                    onDateChange={(value) => this.setState({birthDate: value})} >
                                    <Text>{this.state.birthDate.toString()}</Text>
                                </DatePicker>
                            </Content>
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.text} >E-mail</Text>
                            <TextInput style={styles.input} onChangeText={(value) => this.setState({email: value})} keyboardType="email-address" placeholder="Meu@gmail.com"></TextInput>
                        </View>
                        {this.state.type === 'teacher' && <View style={styles.formRow}>
                            <Text style={styles.text}>Senha </Text>
                            <TextInput style={styles.input} onChangeText={(value) => this.setState({password: value})} secureTextEntry={true} textContentType="password"></TextInput>
                        </View>}
                        {this.state.type === 'student' && <View style={styles.formRow}>
                            <Text style={styles.text} >Gênero </Text>
                            <Picker style={styles.input} selectedValue={this.state.gender} onValueChange={(value) => { 
                                this.setState({gender: value}) 
                            }}>
                                <Picker.Item label="Feminino" style={styles.input} value="Female" />
                                <Picker.Item label="Masculino" style={styles.input} value="Male" />
                            </Picker>
                        </View>}
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', margin: 20}}>
                        <TouchableOpacity style={styles.button} disabled={this.state.loading} onPress={async () => {
                            const status = await this.sendRequest()
                            if(status) this.props.navigation.navigate('AuthScreen')
                        }}>{!this.state.loading && <Icon type="FontAwesome" name="save" size={8} style={{color: '#fff'}}/>}{this.state.loading && <ActivityIndicator color='#fff'></ActivityIndicator>}<Text style={styles.tbutton}>{this.state.loading ? 'Solicitando cadastro...' : 'Solicitar cadastro'}</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent:'center',
        paddingTop: 15
    },
    topo:{
        borderTopColor:"#A9A9A9",
        borderTopWidth:2,
        borderBottomWidth:2,
        borderBottomColor:"#A9A9A9",
        alignItems: 'center',
        padding: 15,
        
    },
    body:{
        borderTopColor:"#A9A9A9",
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formRow:{
        flex: 1,
        width: "100%",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 35
    },
    text:{
        fontSize:18,
        textAlign:"left",
    
    },
    input:{
        height:35,
        width:"100%",
        fontSize:13,
        marginTop:2,
        margin:10,
        borderBottomColor:"#A9A9A9",
        borderBottomWidth:2,
    },
    inputPicker: {
        height:35,
        width:"100%",
        fontSize:13,
        margin:10,
        borderBottomColor:"#A9A9A9",
        borderBottomWidth:2,
    },
    button:{
        backgroundColor: System.colorApp,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        padding:10,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10
    },
    tbutton:{
        textAlign:"center",
        justifyContent: 'center',
        fontSize: 17,
        color:"#A9A9A9",
        fontWeight: "bold",
        flexWrap: 'wrap',
        marginLeft: 7,
        color: 'white'
        
    },
    image:{
        marginTop:10,
        marginLeft:40,
    },
    textop:{
        fontSize:17,
        marginTop:10,   
    },
    txt:{
        marginTop:40,
        flexDirection:'column'
    },
    title:{
        fontSize:23,
        textAlign:'center',
    }
});