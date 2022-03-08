import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DesiresScreenRow } from '../../styles/profile';
import { DesiresScreenElement } from '../../components';

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
    backgroundColor: '#fff'
  },
});

export default DesiresScreen;
