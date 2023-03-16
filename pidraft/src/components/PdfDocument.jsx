import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PdfDocument = ({ user }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Name: {user && user.nom}</Text>
        <Text>Email: {user && user.email}</Text>
        <Text>Role: {user && user.role ? user.role : " "}</Text>
      </View>
    </Page>
  </Document>
);

export default PdfDocument;
