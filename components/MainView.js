import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, ScrollView, Image, Alert} from 'react-native';
import {openDatabase, DEBUG, enablePromise, echoTest} from 'react-native-sqlite-storage';
import {NavigationEvents} from 'react-navigation';
import {formatDate, parseRoomType} from "./helpers";
import editImage from "./images/edit.png";
import deleteImage from "./images/delete.png";

DEBUG(true);
enablePromise(true);

function errorCB(err) {
  console.log("SQL Error: " + err);
}

function successCB() {
  console.log("SQL executed fine");
}

function openCB() {
  console.log("Database OPENED");
}

type Props = {};

export default class MainView extends Component<Props> {
  static navigationOptions = {
    title: 'Rezerwacje w hotelu',
  };

  state = {
    records: []
  };

  db = null;

  componentWillMount(): void {
    console.log("[MainView | componentWillMount] initalizating db");
    this.initializeDb();
  }

  initializeDb = async () => {
    try {
      await echoTest();
      this.db = await openDatabase("booking.db", "1.0", "Booking Database", 200000, openCB, errorCB);
      await this.db.executeSql('CREATE TABLE IF NOT EXISTS Booking ' +
        '(' +
        '    id INTEGER PRIMARY KEY AUTOINCREMENT,' +
        '    first_name TEXT NOT NULL,' +
        '    last_name TEXT NOT NULL,' +
        '    email TEXT NOT NULL,' +
        '    room_type TEXT NOT NULL,' +
        '    number_of_guests INTEGER NOT NULL,' +
        '    check_in_date INTEGER NOT NULL,' +
        '    check_out_date INTEGER NOT NULL' +
        ') ');
    } catch (e) {
      console.warn("[MainView | initializeDb] Exception occured", e);
    }
  };

  getRecordsFormDb = async () => {
    const resultsInfo = await this.db.executeSql('SELECT * FROM Booking');
    const results = resultsInfo[0];
    const len = results.rows.length;
    const records = [];
    for (let i = 0; i < len; i++) {
      let row = results.rows.item(i);
      records.push(row);
    }
    this.setState({records})
  };

  onViewPress = (item) => {
    const {navigation} = this.props;
    const {navigate} = navigation;
    navigate("Confirmation", {roomData: item})
  };

  onEditPress = (item) => {
    const {navigation} = this.props;
    const {navigate} = navigation;
    navigate("Booking", {db: this.db, roomData: item})
  };

  onDeletePress = (item) => {
    Alert.alert("Usunięcie rezerwacji", "Czy na pewno chcesz usunąć tę rezerwację?",
      [
        {
          text: 'Nie',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'Tak',
          onPress: () => this.deleteItem(item)
        },
      ],
      {cancelable: false},
    )
  };

  deleteItem = async (item) => {
    await this.db.executeSql(`DELETE FROM Booking WHERE id = ${item.id}`);
    await this.getRecordsFormDb();
  };

  render() {
    const {navigation} = this.props;
    const {navigate} = navigation;
    const {records} = this.state;

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.getRecordsFormDb()}
        />
        <ScrollView styles={{flex: 1}}>
          {records.map(record => {
            const startDate = new Date(record.check_in_date);
            const endDate = new Date(record.check_out_date);
            return (<View key={record.id} style={styles.record}>
              <TouchableOpacity onPress={() => this.onViewPress(record)}>
                <Text style={{fontSize: 20}}>{`${record.first_name} ${record.last_name}`}</Text>
                <Text>{`${formatDate(startDate)} - ${formatDate(endDate)}`}</Text>
                <Text>{`Typ pokoju: ${parseRoomType(record.room_type)}`}</Text>
              </TouchableOpacity>
              <View style={styles.recordButtons}>
                <TouchableOpacity onPress={() => this.onEditPress(record)} style={{marginRight: 20}}>
                  <Image style={styles.recordButtonIcon} source={editImage} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onDeletePress(record)}>
                  <Image style={styles.recordButtonIcon} source={deleteImage} />
                </TouchableOpacity>
              </View>
            </View>)
          })}

        </ScrollView>

        <TouchableOpacity style={styles.addButton}
                          onPress={() => navigate("Booking", {db: this.db, roomData: null})}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e4e4',
  },
  record: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 10
  },
  recordButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  recordButtonIcon: {
    width: 35,
    height: 35,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#dd585a',
    position: 'absolute',
    bottom: 25,
    right: 25,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  addButtonText: {
    color: "#fff6f4",
    fontSize: 32
  },
  test: {
    height: 30
  }
});