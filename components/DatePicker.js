import React, {Component} from 'react';
import {DatePickerAndroid, StyleSheet} from 'react-native';
import CustomTextInput from "./CustomTextInput";
import {formatDate} from "./helpers"

type Props = {
  onChangeDate: () => void,
  value: string
};

class DatePicker extends Component<Props> {
  getDate = async () => {
    const {onChangeDate} = this.props;
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const newDate = new Date(year, month, day);
        onChangeDate(newDate);
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  };

  render() {
    const {value} = this.props;
    return (
      <CustomTextInput
        placeholder="Data"
        hideKeyboard
        onFocus={() => this.getDate()}
        onChangeText={() => {
        }}
        value={formatDate(value)}
        style={styles.textField}
      />
    );
  }
}

const styles = StyleSheet.create({
  textField: {}
});

export default DatePicker;
