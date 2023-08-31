// eslint-disable-next-line no-unused-vars
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const MyReport = () => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>Nombre: {"datos.nombre"}</Text>
          <Text>Precio: {"datos.precio"}</Text>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  section: {
    marginBottom: 10,
  },
});

export default MyReport;
