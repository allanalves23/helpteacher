import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class TeacherItem extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.box}>
                <View style={styles.boxTitle}>
                    <Text style={{fontWeight: 'bold'}}>{this.props.teacher.name}</Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                    <View style={styles.boxContent}>
                        <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Text style={{fontSize: 18}}>{this.props.teacher.disciplineDesc}</Text>
                        </View>
                    </View>
                    <View style={styles.boxFooter}>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <Icon name="map-marker-alt" size={18} color="#000"></Icon>
                            <Text style={{fontSize: 15, marginLeft: 5}}>{`${this.props.teacher.state} - ${this.props.teacher.neighborhood}`}</Text>
                        </View>
                        <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                            <Text style={{fontSize: 18}}>{`R$ ${this.props.teacher.costHour}`}</Text>
                            <Text style={{fontSize: 11, color: '#888'}}>*Valor por hora</Text>
                        </View>
                    </View>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    box: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 320,
        height: 150,
        padding: 10,
        borderRadius: 4,
        borderColor: '#000000',
        borderWidth: 1,
        margin: 10
    },
    boxTitle: {
        borderBottomColor: '#CCC',
        borderBottomWidth: 0.9,
        paddingLeft: 10,
        paddingRight: 10,
    },
    boxContent: {
        height: 50,
        justifyContent: 'space-between',
        padding: 10,
    },
    boxFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})