import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';

const CustomFormControl = ({label, children}) => {
  return (
    <View style={styles.container}>
      <Text style={{flex: 1, textAlign: 'right', marginRight: 20}}>{label}</Text>
      <View style={{flex: 2}}>
        {children}
      </View>
    </View>
  )
};

CustomFormControl.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  }
});

export default CustomFormControl;