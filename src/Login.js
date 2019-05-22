import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, ActivityIndicator} from 'react-native'
import {Icon, Toast} from 'native-base'
import {backendUrl} from '../backend'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

export default class TeacherList extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            type: 'student',
            loading: false,
            success: false
        }
    }

    static navigationOptions = {
        drawerLockMode: 'locked-closed',
        
    }

    async signIn(){
      const url = `${backendUrl}/mobile/signIn`
      this.loadingInfo(this.state)
      const payload = await this.formatData()
      await axios.post(url, payload).then(async res => {
        const user = payload.type === 'student' ? res.data.student : res.data.teacher
        user.type = payload.type
        
        await Toast.show({
          text: `Olá ${user.name}, Seja bem vindo!`,
          type: 'success',
          buttonText: 'OK',
          duration: 2000
        })
        
        await this.loadUser(user)

        this.setState({
          success: true,
        })
      }).catch(error => {
        Toast.show({
          text: error.response.data || 'Ocorreu um erro desconhecido, se persistir reporte',
          type: 'danger',
          buttonText: 'OK'
        })
      })

      this.loadingInfo(this.state)

    }

    async loadUser(user){
        await AsyncStorage.setItem('@user', JSON.stringify(user))
    }

    loadingInfo(prev){
      const previous = !prev.loading
      this.setState({
        loading: previous
      })
    }
    formatData(){
      return {
        email: this.state.email,
        password: this.state.password,
        type: this.state.type
      }
    }

    async componentDidMount(){
      try {
        const user = JSON.parse(await AsyncStorage.getItem('@user'))
        if(user.name){
          this.props.navigation.navigate('TeacherList')
        }
      } catch (error) {
        //
      }
    }


    render(){
        return(
            <View style={styles.container}>
                <Icon type="FontAwesome5" name="graduation-cap" size={90} />
                <Text style={styles.welcome}>Help Teacher</Text>
                <View style={styles.login}>
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="black"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.login}
                />
                {this.state.type === 'teacher' && <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="black"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    secureTextEntry={true}
                />}
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 20, width: "100%"}}>
                  <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 15}}>
                    <Text style={{marginLeft: 10}}>{this.state.type === 'student' ? 'Aluno' : 'Professor'}</Text>
                    <Switch onValueChange={() => {
                      const type = this.state.type === 'student' ? 'teacher' : 'student'
                      this.setState({type})
                    }} value={this.state.type === 'student'}></Switch>
                  </View>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('NotRegistered')}>
                      <Text style={styles.link}>Não Cadastrado?</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} disabled={this.state.loading} onPress={async () => {
                  await this.signIn()
                  if(this.state.success) {
                    this.props.navigation.navigate('TeacherList')
                  }
                }}>
                    {this.state.loading && <ActivityIndicator style={{marginRight: 10}} color='#555'></ActivityIndicator>}
                    <Text style={styles.buttontext}>{this.state.loading ? 'Por favor aguarde...' : 'Entrar'}</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    height: 100,
    flex: 0,
    marginBottom: 10
  },
  login: {
    flex: 0,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%'
  },
  input: {
    width: "100%",
    padding: 10,
    fontSize: 14,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: "80%",
    marginRight: 15,
    marginLeft: 15,
    borderWidth: 1,
  },
  buttontext: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 14,
  },
})