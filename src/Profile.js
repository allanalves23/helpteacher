import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Picker, Image, ActivityIndicator} from 'react-native'
import {Header, Left, Body, Button, Icon, Title, Content, DatePicker, Toast} from 'native-base'
import System from '../config/system'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import {backendUrl} from '../backend'

export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            constName: '',
            id: '',
            name: '',
            email: '',
            state: '',
            neighborhood: '',
            especiality: '',
            costHour: '',
            birthDate: '',
            telphone: '',
            emailLogin: '',
            password: '',
            
            type: '',
            
            gender: '',
            address: '',
            schooling: '',
            cpf: '',
            number: '',
            loading: false,
            sending: false,
            error: false
        }
    }

    static navigationOptions = {
        drawerLabel: 'MEU PERFIL',
        drawerIcon: ({tintColor}) => (<Icon type="FontAwesome5" name="user" size={18} color={tintColor}></Icon>)
    }

    async componentDidMount(){
        const user = JSON.parse(await AsyncStorage.getItem('@user'))
        if(user.type === 'teacher'){
            const url = `${backendUrl}/mobile/teachers/${user.id}`
            this.loadingInfo(this.state)
            await axios(url).then(res => {
                this.setState({
                    constName: res.data.teacher.name,
                    id: res.data.teacher.id,
                    name: res.data.teacher.name,
                    email: res.data.teacher.email,
                    state: res.data.teacher.state,
                    neighborhood: res.data.teacher.neighborhood,
                    especiality: res.data.teacher.especiality,
                    costHour: res.data.teacher.costHour,
                    birthDate: this.formatDateBirth(res.data.teacher.birthDate),
                    telphone: res.data.teacher.telphone,
                    emailLogin: res.data.teacher.emailLogin,
                    type: user.type
                })
            }).catch(() => {
                this.showError()
            })
            this.loadingInfo(this.state)
        }else{
            const url = `${backendUrl}/mobile/students/${user.id}`
            this.loadingInfo(this.state)
            await axios(url).then(res => {
                this.setState({
                    constName: res.data.student.name,
                    id: res.data.student.id,
                    name: res.data.student.name,
                    email: res.data.student.email, //removing state
                    neighborhood: res.data.student.neighborhood,
                    cpf: res.data.student.cpf,
                    schooling: res.data.student.schooling, //especiality
                    gender: res.data.student.gender, //costHour
                    birthDate: this.formatDateBirth(res.data.student.birthDate),
                    address: res.data.student.address, //telphone
                    number: res.data.student.number, //emailLogin
                    type: user.type
                })
            }).catch( error => {
                this.showError()
            })
            this.loadingInfo(this.state)
        }
    }

    showError(){
        Toast.show({
            text: 'Ocorreu um erro ao buscar seus dados, tente novamente mais tarde',
            type: 'danger',
            duration: 10000,
        })

        this.setState({
            error: true
        })
    }

    loadingInfo(prev){
        const previous = !prev.loading
        this.setState({
            loading: previous
        })
    }

    sendingInfo(prev){
        const previous = !prev.sending
        this.setState({
            sending: previous
        })
    }

    formatDateBirth(date){
        const arrayDate = date.split('-')
        return `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`
    }

    async save(){
        if(this.state.type === 'teacher'){
            const url = `${backendUrl}/mobile/teachers/${this.state.id}`
            const teacher = await this.formatDataTeacher()
            this.sendingInfo(this.state)
            await axios.put(url, teacher).then(() => {
                Toast.show({
                    text: 'Informações salvas com sucesso!',
                    type: 'success',
                    buttonText: 'OK',
                    duration: 2000
                })
            }).catch(error => {
                Toast.show({
                    text: `${error.response.data || 'Ocorreu um erro desconhecido, se persistir reporte!'}`,
                    type: 'danger',
                    buttonText: 'OK',
                    duration: 2000
                })
            })
            this.sendingInfo(this.state)
        }else{
            const url = `${backendUrl}/mobile/students/${this.state.id}`
            const student = await this.formatDataStudent()
            this.sendingInfo(this.state)
            await axios.put(url, student).then(() => {
                Toast.show({
                    text: 'Informações salvas com sucesso!',
                    type: 'success',
                    buttonText: 'OK',
                    duration: 2000
                })
            }).catch(error => {
                Toast.show({
                    text: `${error.response.data || 'Ocorreu um erro desconhecido, se persistir reporte!'}`,
                    type: 'danger',
                    buttonText: 'OK',
                    duration: 2000
                })
            })
            this.sendingInfo(this.state)
        }
    }

    formatDataTeacher(){
        return {
            name: this.state.name,
            email: this.state.email,
            state: this.state.state,
            neighborhood: this.state.neighborhood,
            especiality: this.state.especiality,
            costHour: this.state.costHour,
            birthDate: this.state.birthDate,
            telphone: this.state.telphone,
            emailLogin: this.state.emailLogin,
            password: this.state.password
        }
    }

    formatDataStudent(){
        return {
            name: this.state.name,
            email: this.state.email,
            schooling: this.state.schooling,
            neighborhood: this.state.neighborhood,
            gender: this.state.gender,
            cpf: this.state.cpf,
            address: this.state.address,
            number: this.state.number,
            birthDate: this.state.birthDate,
        }
    }


    render(){
        return(
            <ScrollView style={{flex: 1}}>
                <View style={{flex: 1}}>
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
                    <View style={styles.container}>
                        <Text style={styles.title}>Editar dados cadastrais</Text>
                        <View style = {styles.topo}>
                            <View>
                                {this.state.loading && <View style={{alignItems: 'center', justifyContent: 'center'}}><ActivityIndicator size="large" color={System.colorApp}></ActivityIndicator><Text>Por favor aguarde, estamos obtendo seus dados...</Text></View>}
                                {this.state.type === 'student' && <Image source={require('../assets/student.png')}></Image>}
                                {this.state.type === 'student' && <Text style={{fontSize: 18, textAlign: 'center'}}>{this.state.constName}</Text>}
                                {this.state.type === 'teacher' && <Image source={require('../assets/teacher.png')}></Image>}
                                {this.state.type === 'teacher' && <Text style={{fontSize: 18, textAlign: 'center'}}>{this.state.constName}</Text>}
                            </View>
                        </View> 
                        {!this.state.error && !this.state.loading && <View style={{width: '100%', borderBottomColor: '#888', borderBottomWidth: 1.6}}></View>}
                            {!this.state.error && !this.state.loading && <View style={{width: "100%", flexDirection:'row', alignItems: 'center', borderBottomColor: '#888', borderBottomWidth: 1.6, padding: 10, marginBottom: 20}}>
                                    <Icon type="FontAwesome5" name="user" size={14}></Icon>
                                    <Text style={{fontSize: 18, marginLeft: 10}}>Informações básicas</Text>
                            </View>}
                        { !this.state.loading && Boolean(this.state.id) && <View style = {styles.body}>
                            <View style={styles.formRow}>
                                <Text style={styles.text}>Nome</Text>
                                <TextInput onChangeText={(value) => this.setState({name: value})} value={this.state.name} style={styles.input}></TextInput>
                            </View>
                            <View style={styles.formRow}>
                                <Text style={styles.text}>Data de Nascimento</Text>
                                <Content style={styles.inputPicker}>
                                    <DatePicker placeHolderText=" " defaultDate={new Date(2010, 5, 25)} minimumDate={new Date(1900, 1, 1)} maximumDate={new Date(2018, 12, 31)} locale={"pt-br"} 
                                        onDateChange={(value) => this.setState({birthDate: value})} >
                                        <Text>{this.state.birthDate}</Text>
                                    </DatePicker>
                                </Content>
                                {typeof this.state.birthDate === 'string' && <Text>{`Data atual: ${this.state.birthDate}`}</Text>}
                            </View>
                            {this.state.type === 'student' && <View style={styles.formRow}>
                                <Text style={styles.text}>CPF</Text>
                                <TextInput onChangeText={(value) => this.setState({cpf: value})} value={this.state.cpf} style={styles.input}></TextInput>
                            </View>}
                            {this.state.type === 'teacher' && !this.state.loading && <View style={{width: '100%', borderBottomColor: '#888', borderBottomWidth: 1.6}}></View>}
                            {this.state.type === 'student' && <View style={styles.formRow}>
                                <Text style={styles.text} >Genero</Text>
                                <Picker style={styles.input} selectedValue={this.state.gender} onValueChange={(value) => { 
                                    this.setState({gender: value}) 
                                }}>
                                    <Picker.Item label="Feminino" style={styles.input} value="Female" />
                                    <Picker.Item label="Masculino" style={styles.input} value="Male" />
                                </Picker>
                            </View>}
                            {this.state.type === 'student' && <View style={styles.formRow}>
                                <Text style={styles.text} >Escolaridade</Text>
                                <Picker style={styles.input} selectedValue={this.state.schooling} onValueChange={(value) => { 
                                    this.setState({schooling: value}) 
                                }}>
                                    <Picker.Item label="Ensino fundamental" style={styles.input} value="Ensino fundamental" />
                                    <Picker.Item label="Ensino médio" style={styles.input} value="Ensino médio" />
                                    <Picker.Item label="Nível técnico" style={styles.input} value="Nível técnico" />
                                    <Picker.Item label="Ensino superior incompleto" style={styles.input} value="Ensino superior incompleto" />
                                    <Picker.Item label="Ensino superior completo" style={styles.input} value="Ensino superior completo" />
                                </Picker>
                            </View>}
                            {this.state.type === 'teacher' && !this.state.loading && <View style={{width: "100%", alignItems: 'center', borderBottomColor: '#888', borderBottomWidth: 1.6, padding: 10, marginBottom: 20}}>
                                    <View style={{flexDirection: 'row', width: '100%'}}>
                                        <Icon type="FontAwesome5" name="hashtag" size={14}></Icon>
                                        <Text style={{fontSize: 18, marginLeft: 10}}>Informações sociais</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', width: '100%', margin: 5}}>
                                        <Text style={{fontSize: 13, marginLeft: 10, color: '#888'}}>Preencha os dados abaixo para ter seu perfil listado para nossos alunos</Text>
                                    </View>
                            </View>}
                            <View style={styles.formRow}>
                                <Text style={styles.text} >{this.state.type === 'student' ? 'E-mail' : 'E-mail de contato'}</Text>
                                <TextInput style={styles.input} onChangeText={(value) => this.setState({email: value})} value={this.state.email} keyboardType="email-address"></TextInput>
                            </View>
                            {this.state.type === 'teacher' && <View style={styles.formRow}>
                                <Text style={styles.text}>Especialidade</Text>
                                <TextInput onChangeText={(value) => this.setState({especiality: value})} value={this.state.especiality} style={styles.input}></TextInput>
                            </View>}
                            {this.state.type === 'teacher' && <View style={styles.formRow}>
                                <Text style={styles.text} >Estado </Text>
                                <Picker style={styles.input} selectedValue={this.state.state} onValueChange={(value) => { 
                                    this.setState({state: value}) 
                                }}>
                                    <Picker.Item label="Rio de Janeiro" style={styles.input} value="Rio de Janeiro" />
                                    <Picker.Item label="São Paulo" style={styles.input} value="São Paulo" />
                                    <Picker.Item label="Rio Grande do Sul" style={styles.input} value="Rio Grande do Sul" />
                                    <Picker.Item label="Paraíba" style={styles.input} value="Paraíba" />
                                    <Picker.Item label="Rio Grande do Norte" style={styles.input} value="Rio Grande do Norte" />
                                    <Picker.Item label="Amazonas" style={styles.input} value="Amazonas" />
                                </Picker>
                            </View>}
                            <View style={styles.formRow}>
                                <Text style={styles.text}>Bairro</Text>
                                <TextInput onChangeText={(value) => this.setState({neighborhood: value})} value={this.state.neighborhood} style={styles.input}></TextInput>
                            </View>
                            {this.state.type === 'student' && <View style={styles.formRow}>
                                <Text style={styles.text}>Endereço</Text>
                                <TextInput onChangeText={(value) => this.setState({address: value})} value={this.state.address} style={styles.input}></TextInput>
                            </View>}
                            {this.state.type === 'student' && <View style={styles.formRow}>
                                <Text style={styles.text}>Número</Text>
                                <TextInput keyboardType='numeric' onChangeText={(value) => this.setState({number: value})} value={this.state.number ? this.state.number.toString() : ''} style={styles.input}></TextInput>
                            </View>}
                            {this.state.type === 'teacher' && <View style={styles.formRow}>
                                <Text style={styles.text}>Valor da aula</Text>
                                <TextInput keyboardType="decimal-pad" onChangeText={(value) => this.setState({costHour: value})} value={this.state.costHour ? this.state.costHour.toString() : '' } style={styles.input}></TextInput>
                                <Text style={styles.description}>* Valor por Hora</Text>
                            </View>}
                            {this.state.type === 'teacher' && !this.state.loading && <View style={{width: '100%', borderBottomColor: '#888', borderBottomWidth: 1.6}}></View>}
                            {this.state.type === 'teacher' && !this.state.loading && <View style={{width: "100%", flexDirection:'row', alignItems: 'center', borderBottomColor: '#888', borderBottomWidth: 1.6, padding: 10, marginBottom: 20}}>
                                    <Icon type="FontAwesome5" name="lock" size={14}></Icon>
                                    <Text style={{fontSize: 18, marginLeft: 10}}>Dados de acesso</Text>
                            </View>}
                            {this.state.type === 'teacher' && !this.state.loading && <View style={styles.formRow}>
                                <View style={{width: "100%"}}>
                                    <Text style={styles.text}>E-mail de Login</Text>
                                    <TextInput style={styles.input} onChangeText={(value) => this.setState({emailLogin: value})} value={this.state.emailLogin} keyboardType="email-address"></TextInput>
                                </View>
                                <View style={{width: "100%"}}>
                                    <Text style={styles.text}>Senha</Text>
                                    <TextInput style={styles.input} onChangeText={(value) => this.setState({password: value})} value={this.state.password} secureTextEntry={true} textContentType="password"></TextInput>
                                </View>
                            </View>}
                            {!this.state.loading && Boolean(this.state.name) && <View style={{justifyContent: 'center', alignItems: 'center', margin: 20}}>
                                <TouchableOpacity style={styles.button} disabled={this.state.loading} onPress={async () => {
                                    await this.save()
                                }}>{!this.state.sending && <Icon type="FontAwesome" name="save" size={8} style={{color: '#fff'}}/>}{this.state.sending && <ActivityIndicator color='#fff'></ActivityIndicator>}<Text style={styles.tbutton}>{this.state.sending ? 'Salvando...' : 'Salvar'}</Text></TouchableOpacity>
                            </View>}
                        </View>}
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 2,
        padding: 10,
    },
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
    formRowInline:{
        flex: 1,
        width: "100%",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 35,
        flexDirection: 'row',
        flexWrap: 'wrap'
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
    inputInline:{
        height:35,
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
        flexWrap: 'wrap'
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
    },
    description: {
        fontSize: 13,
        color: '#CCC'
    }
})