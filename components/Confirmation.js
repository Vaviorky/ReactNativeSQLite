import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CustomFormControl from "./CustomFormControl";
import {formatDate, parseRoomType} from "./helpers";

export default class Confirmation extends Component<Props> {
  static navigationOptions = {
    title: 'Szczegóły rezerwacji',
  };

  render() {
    const {navigation} = this.props;
    const {roomData} = navigation.state.params;
    const {first_name, last_name, email, room_type, number_of_guests, check_in_date, check_out_date} = roomData;
    return (
      <View style={styles.container}>
        <CustomFormControl label="Imię">
          <Text style={styles.value}>{first_name}</Text>
        </CustomFormControl>
        <CustomFormControl label="Nazwisko">
          <Text style={styles.value}>{last_name}</Text>
        </CustomFormControl>
        <CustomFormControl label="E-mail">
          <Text style={styles.value}>{email}</Text>
        </CustomFormControl>
        <CustomFormControl label="Rodzaj pokoju">
          <Text style={styles.value}>{parseRoomType(room_type)}</Text>
        </CustomFormControl>
        <CustomFormControl label="Liczba gości">
          <Text style={styles.value}>{number_of_guests}</Text>
        </CustomFormControl>
        <CustomFormControl label="Data zameldowania">
          <Text style={styles.value}>{formatDate(new Date(check_in_date))}</Text>
        </CustomFormControl>
        <CustomFormControl label="Data wymeldowania">
          <Text style={styles.value}>{formatDate(new Date(check_out_date))}</Text>
        </CustomFormControl>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
  value: {
    fontSize: 16
  }
});