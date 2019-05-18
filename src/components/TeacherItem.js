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
                    <Text>Nome do professor</Text>
                </View>
                <View style={{justifyContent: 'center', flexDirection: 'row', flex: 2}}>
                    <View style={styles.boxInfo}>
                        <View style={{justifyContent: 'center', alignItems: 'center', borderWidth: 1}}>
                            <Text style={{fontSize: 18}}>Materia</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <Icon name="map-marker-alt" size={18} color="#000"></Icon>
                            <Text style={{fontSize: 18, marginLeft: 3}}>Local</Text>
                        </View>
                    </View>
                    <View style={styles.boxASide}>
                        <Text style={{fontSize: 18}}>R$ 35,50</Text>
                        <Text style={{fontSize: 11, color: '#888'}}>*Valor por hora</Text>
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