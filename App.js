import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import Database from './src/Database/Database'
import Tarefas from './src/Models/Tarefas'
import ListTask from './src/Components/ListTask'


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      descricao: "",
      data: "",
      prioridade: "",
      day:"",
      month:"",
      year:"",
      dateNow:"",
      listaTasks: []
    }
    this.ListarTasks()
  }
  
  ListarTasks = () => {
    const banco = new Database();
    banco.List().then(listing => { this.setState({ listaTasks: listing }) })
  }

  RegisterTask = (descricao, day, month, year, prioridade) => {
    const newTask = new Tarefas(descricao, day, month, year, prioridade, "Não")
    const banco = new Database();
    banco.Insert(newTask);
    this.ListarTasks();
    
  }

  DoneTask = (id) => {
    const banco = new Database();
    banco.Done(id);
    this.ListarTasks();
  }

  DeleteTask = (id) => {
    const banco = new Database();
    banco.Delete(id);
    this.ListarTasks()
  }
 

  render() {
    return (
      <ScrollView>
        <View >

          <Text style={estilo.titulo}>Tarefas</Text>

          <TextInput style={estilo.linha}  placeholder='Descrição da tarefa' onChangeText={(valor) => { this.setState({ descricao: valor }) }}></TextInput>
          <TextInput style={estilo.linha}  placeholder='Dia de conclusão (DD)' onChangeText={(valor) => { this.setState({ day: valor }) }}></TextInput>
          <TextInput style={estilo.linha}  placeholder='Mês de conclusão (MM)' onChangeText={(valor) => { this.setState({ month: valor }) }}></TextInput>
          <TextInput style={estilo.linha}  placeholder='Ano de conclusão (AAAA)' onChangeText={(valor) => { this.setState({ year: valor }) }}></TextInput>
          <TextInput style={estilo.linha}  placeholder='Prioridade (alta/média/baixa)' onChangeText={(valor) => { this.setState({ prioridade: valor }) }}></TextInput>
          <TouchableOpacity  style={estilo.botao} onPress={() => { this.RegisterTask(this.state.descricao, this.state.day, this.state.month, this.state.year, this.state.prioridade) }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Salvar</Text>
          </TouchableOpacity>

        </View>
        <Text style={estilo.titulo}>Lista de tarefas</Text>
        {
          this.state.listaTasks.map(item => (
            <ListTask
              key={item.id}
              id={item.id}
              descricao={item.descricao}
              day={item.day}
              month={item.month}
              year={item.year}
              prioridade={item.prioridade}
              concluido={item.concluido}
              concluir={this.DoneTask}
              deletar={this.DeleteTask}/>
          ))
        }
      </ScrollView>
    )
  }

}
const estilo = StyleSheet.create({
  titulo: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'gray',
    borderColor: 'black',
    borderWidth: 1
    
  },
  botao: {
    
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: "center",
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,

    margin: 5,
    color: 'white'
  },
  areaBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  },
  linha: {
    margin:15,
    borderBottomWidth: 2,
    borderBottomColor: '#34ebde'
    

  }
})