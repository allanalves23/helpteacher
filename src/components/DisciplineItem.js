import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class TeacherList extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.box}>
                <View style={styles.boxTitle}>
                    <Text style={{fontSize: 20}}>DISCIPLINA</Text>
                </View>
                <View style={{justifyContent: 'flex-start', flexDirection: 'row', flex: 2}}>
                    <View style={styles.boxInfo}>
                        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <Text style={{fontSize: 18}}>Área de atuação</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <Icon name="graduation-cap" size={18} color="#000"></Icon>
                            <Text style={{fontSize: 18, marginLeft: 3}}>Professores: 20</Text>
                        </View>
                    </View>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    box: {
        width: 320,
        height: 150,
        padding: 15,
        borderRadius: 4,
        borderColor: '#000000',
        borderWidth: 1,
        margin: 10
    },
    boxTitle: {
        flex: 1
    },
    boxInfo: {
        width: 175,
        justifyContent: 'space-between',
        padding: 10
        
    },
    boxASide: {
        width: 100,
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 10
    }
})