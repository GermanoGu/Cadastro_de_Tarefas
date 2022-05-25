import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'


export default class ListTask extends Component {

    Conclusion() {
        if (this.props.concluido == 'Sim') {
            return { backgroundColor: 'green' }
        }
    }


    ShowDate() {
        var dayData = this.props.day;
        var moData = this.props.month;
        var yearData = this.props.year;

        //convertendo string para int
        var convertDay = parseInt(dayData);
        var convertMo = parseInt(moData);
        var convertYear = parseInt(yearData);

        //pegando data atual
        var date = new Date().getDate() - 1;
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        if (this.props.concluido == 'Sim') { return { flex: 1, borderRadius: 10, backgroundColor: '#39bf00', padding: 10, borderColor: 'black', borderWidth: 1 } }
        else if (year < convertYear) { return { flex: 1, borderRadius: 10, backgroundColor: 'white', padding: 10, borderColor: 'black', borderWidth: 1 } }
        else if (year > convertYear) { return { flex: 1, borderRadius: 10, backgroundColor: 'red', padding: 10, borderColor: 'black', borderWidth: 1 } }
        else if (year == convertYear && month > convertMo) { return { flex: 1, borderRadius: 10, backgroundColor: 'red', padding: 10, borderColor: 'black', borderWidth: 1 } }
        else if (year == convertYear && month < convertMo) { return { flex: 1, borderRadius: 10, backgroundColor: 'white', padding: 10, borderColor: 'black', borderWidth: 1 } }
        else if (year == convertYear && month == convertMo && date >= convertDay) { return { flex: 1, borderRadius: 10, backgroundColor: 'red', padding: 10, borderColor: 'black', borderWidth: 1 } }
        else { return { flex: 1, borderRadius: 10, backgroundColor: 'white', padding: 10, borderColor: 'black', borderWidth: 1 } }


    }


    render() {
        return (
            <View style={{ margin: 5 }}>
                <View style={this.ShowDate()}>
                    <View style={{ flex: 1 }}>
                        <Text>ID: {this.props.id}</Text>
                        <Text>Descrição: {this.props.descricao}</Text>
                        <Text>Data:{this.props.day}/{this.props.month}/{this.props.year}</Text>
                        <Text>Prioridade: {this.props.prioridade}</Text>
                        <Text>Concluído: {this.props.concluido}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { this.props.concluir(this.props.id) }}
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            margin: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 100,
                            height: 30,
                            backgroundColor: 'blue',
                            borderColor: 'black',
                            borderWidth: 1
                        }}>
                        <Text style={{ color: 'white' }}>Concluír</Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.props.deletar(this.props.id) }} style={{
                        flex: 1,
                        flexDirection: 'row',
                        margin: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 30,
                        backgroundColor: '#750606',
                        borderColor: 'black',
                        borderWidth: 1
                    }}>
                        <Text style={{ color: 'white' }}>REMOVER</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}