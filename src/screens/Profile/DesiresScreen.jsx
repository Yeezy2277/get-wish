import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DesiresScreenRow } from '../../styles/profile';
import { DesiresScreenElement } from '../../components';
import { COLORS } from '../../functions/constants';

function DesiresScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
      <DesiresScreenRow>
        <DesiresScreenElement />
        <DesiresScreenElement />
        <DesiresScreenElement />
        <DesiresScreenElement />
        <DesiresScreenElement />
        <DesiresScreenElement />
      </DesiresScreenRow>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white2
  },
});

export default DesiresScreen;
