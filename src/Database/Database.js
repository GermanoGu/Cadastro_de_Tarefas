import SQLite from "react-native-sqlite-storage";
import Tarefas from "../Models/Tarefas";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "doTasks.db";
const database_version = "1.0";
const database_displayname = "Tasks Manager";
const database_size = 200000;

export default class Database {

    Connect() {
        let db;
        return new Promise((resolve) => {
            console.log("Checando a integridade do plugin ...");

            SQLite.echoTest().then(() => {
                console.log("Integridade Ok ...");
                console.log("Abrindo Banco de Dados ...");
                SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
                    db = DB;
                    console.log("Banco de dados Aberto");
                    db.executeSql('SELECT 1 FROM Task LIMIT 1').then(() => {
                        console.log("O banco de dados está pronto ... Executando Consulta SQL ...");
                    }).catch((error) => {
                        console.log("Erro Recebido: ", error);
                        console.log("O Banco de dados não está pronto ... Criando Dados");
                        db.transaction((tx) => {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Task (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao VARCHAR(30), day VARCHAR(30), month VARCHAR(30), year VARCHAR(30), prioridade varchar(30), concluido varchar(10))');
                        }).then(() => {
                            console.log("Tabela criada com Sucesso");
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                    resolve(db);
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log("echoTest Falhou - plugin não funcional");
            });
        });
    }

    Desconnect(db) {
        if (db) {
            console.log("Fechando Banco de Dados");
            db.close().then(status => {
                console.log("Banco de dados Desconectado!!");
            }).catch(error => {
                this.errorCB(error);
            });
        } else {
            console.log("A conexão com o banco não está aberta");
        }
    };


    List() {
        return new Promise((resolve) => {
            const listaTask = [];
            this.Connect().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM Task', []).then(([tx, results]) => {
                        console.log("Consulta completa");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            const { id, descricao, day, month, year, prioridade, concluido } = row;
                            listaTask.push({ id, descricao, day, month, year, prioridade, concluido });
                        }
                        resolve(listaTask);
                    });
                }).then((result) => {
                    this.Desconnect(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }


    Insert(task) {
        return new Promise((resolve) => {
            this.Connect().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Task(descricao, day, month, year, prioridade, concluido) VALUES (?, ?, ?, ?, ?, ?)', [task.descricao, task.day, task.month, task.year, task.prioridade, task.concluido]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconnect(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    Done(id) {
        return new Promise((resolve) => {
            this.Connect().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql("UPDATE Task SET concluido = 'Sim' WHERE id = ?", [id]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconnect(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    Delete(id) {
        return new Promise((resolve) => {
            this.Connect().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('DELETE FROM Task WHERE id = ?', [id]).then(([tx, results]) => {
                        console.log(results);
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconnect(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

}