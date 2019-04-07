import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Picker, Button} from 'react-native';
import CustomTextInput from "./CustomTextInput";
import DatePicker from "./DatePicker";
import CustomFormControl from "./CustomFormControl";

type Props = {
  onSubmitButtonClick: () => void
};

export default class Booking extends Component<Props> {
  static navigationOptions = {
    title: 'Rezerwacja pokoju',
  };

  state = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    roomType: 'single',
    numberOfGuests: 1,
    startDate: new Date(),
    endDate: new Date()
  };

  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const params = navigation.state.params;
    const {roomData} = params;

    if (roomData != null) {
      this.state = {
        id: roomData.id,
        firstName: roomData.first_name,
        lastName: roomData.last_name,
        email: roomData.email,
        numberOfGuests: roomData.number_of_guests,
        roomType: roomData.room_type,
        startDate: new Date(roomData.check_in_date),
        endDate: new Date(roomData.check_out_date),
      }
    }
  }


  insert = async () => {
    const {id, firstName, lastName, email, roomType, numberOfGuests, startDate, endDate} = this.state;
    const {navigation} = this.props;
    const {navigate} = navigation;
    const params = navigation.state.params;
    const db = params.db;

    await db.executeSql('INSERT INTO Booking (first_name, last_name, email, room_type, number_of_guests, check_in_date, check_out_date) VALUES ' +
      `('${firstName}', '${lastName}', '${email}', '${roomType}', '${numberOfGuests}', '${startDate.getTime()}', '${endDate.getTime()}')`);
    navigate("MainView");
  };

  update = async () => {
    const {id, firstName, lastName, email, roomType, numberOfGuests, startDate, endDate} = this.state;
    const {navigation} = this.props;
    const {navigate} = navigation;
    const params = navigation.state.params;
    const db = params.db;

    await db.executeSql(`UPDATE Booking SET 
    first_name = '${firstName}', 
    last_name = '${lastName}', 
    email = '${email}', 
    room_type = '${roomType}', 
    number_of_guests = '${numberOfGuests}', 
    check_in_date = '${startDate.getTime()}', 
    check_out_date = '${endDate.getTime()}' 
    WHERE id = '${id}'`);

    navigate("MainView");
  };

  render() {
    const {firstName, lastName, email, startDate, endDate, roomType, numberOfGuests} = this.state;
    const {navigation} = this.props;
    const params = navigation.state.params;

    let buttonAction = null;
    let isInsert = false;

    if (params.roomData == null) {
      buttonAction = this.insert;
      isInsert = true;
    } else {
      buttonAction = this.update;
      isInsert = false;
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <CustomFormControl label="Imię">
          <CustomTextInput
            value={firstName}
            onChangeText={(newFirstName) => this.setState({firstName: newFirstName})}
          />
        </CustomFormControl>
        <CustomFormControl label="Nazwisko">
          <CustomTextInput
            value={lastName}
            onChangeText={(newLastName) => this.setState({lastName: newLastName})}
          />
        </CustomFormControl>
        <CustomFormControl label="E-mail">
          <CustomTextInput
            value={email}
            type="email-address"
            onChangeText={(newEmail) => this.setState({email: newEmail})}
          />
        </CustomFormControl>
        <CustomFormControl label="Rodzaj pokoju">
          <Picker
            selectedValue={roomType}
            onValueChange={itemValue => this.setState({roomType: itemValue})}
          >
            <Picker.Item label="Pojedynczy" value="single" />
            <Picker.Item label="Podwójny" value="double" />
            <Picker.Item label="Potrójny" value="triple" />
          </Picker>
        </CustomFormControl>
        <CustomFormControl label="Liczba gości">
          <CustomTextInput
            value={numberOfGuests.toString()}
            type="numeric"
            onChangeText={(newNumberOfGuests) => this.setState({numberOfGuests: newNumberOfGuests})}
          />
        </CustomFormControl>
        <CustomFormControl label="Data zameldowania">
          <DatePicker
            value={startDate}
            onChangeDate={newDate => this.setState({startDate: newDate})}
          />
        </CustomFormControl>
        <CustomFormControl label="Data wymeldowania">
          <DatePicker
            value={endDate}
            onChangeDate={newDate => this.setState({endDate: newDate})}
          />
        </CustomFormControl>
        <View style={{marginTop: 20}}>
          <Button title={isInsert ? "Zapisz" : "Aktualizuj"} onPress={buttonAction} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
});
