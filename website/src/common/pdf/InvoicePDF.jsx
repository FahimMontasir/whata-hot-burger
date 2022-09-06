import PropTypes from "prop-types";
import {
  Page,
  View,
  Text,
  Font,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import React from "react";
import { fDateTimeSuffix } from "../../utils/formatTime";
import { fCurrency } from "../../utils/formatNumber";
// utils

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Regular.ttf" },
    { src: "/fonts/Roboto-Bold.ttf" },
  ],
});

export const styles = StyleSheet.create({
  col4: { width: "25%" },
  col8: { width: "75%" },
  col6: { width: "50%" },
  mb8: { marginBottom: 8 },
  mb40: { marginBottom: 40 },
  overline: {
    fontSize: 8,
    marginBottom: 8,
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  comboLine: {
    fontSize: 8,
    marginTop: 8,
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  h3: { fontSize: 16, fontWeight: 700 },
  h4: { fontSize: 13, fontWeight: 700 },
  body1: { fontSize: 10 },
  subtitle2: { fontSize: 9, fontWeight: 700 },
  alignRight: { textAlign: "right" },
  page: {
    padding: "40px 24px 0 24px",
    fontSize: 9,
    lineHeight: 1.6,
    fontFamily: "Roboto",
    backgroundColor: "#fff",
    textTransform: "capitalize",
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    margin: "auto",
    borderTopWidth: 1,
    borderStyle: "solid",
    position: "absolute",
    borderColor: "#DFE3E8",
  },
  gridContainer: { flexDirection: "row", justifyContent: "space-between" },
  table: { display: "flex", width: "auto" },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    padding: "8px 0",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#DFE3E8",
  },
  noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
  tableCell_1: { width: "5%" },
  tableCell_2: { width: "50%", paddingRight: 16 },
  tableCell_3: { width: "15%" },
});

// ----------------------------------------------------------------------

InvoicePDF.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default function InvoicePDF({ invoice }) {
  const {
    _id,
    name,
    email,
    address,
    paidAmount,
    items,
    paymentStatus,
    createdAt,
  } = invoice;

  const dItems = Object.keys(items);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <View>
            <Image
              source="/pwd/android-chrome-512x512.png"
              style={{ height: 50, width: 50 }}
            />
            <Text style={styles.overline}>Whata Hot Burger</Text>
          </View>
          <View style={{ alignItems: "right", flexDirection: "column" }}>
            <Text>INV-{_id}</Text>
            <Text>{fDateTimeSuffix(createdAt)}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Invoice To</Text>
            <Text style={styles.body1}>{name}</Text>
            <Text style={styles.body1}>{email}</Text>
            <Text style={styles.body1}>{address}</Text>
          </View>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Payment Status</Text>
            <Text style={styles.body1}>{paymentStatus.Method}</Text>
            <Text style={styles.body1}>{paymentStatus.details}</Text>
            <Text style={styles.body1}>
              {paymentStatus.isSuccess ? "Payment accepted" : "Payment failed"}
            </Text>
          </View>
        </View>

        <Text style={[styles.overline, styles.mb8]}>Invoice Details</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Description</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Qty</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Size</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>Total</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            {dItems.map((key) => (
              <React.Fragment key={key}>
                {key === "notACombo" ? (
                  <Text style={styles.comboLine}>Other Product</Text>
                ) : (
                  <Text style={styles.comboLine}>comboId:{key}</Text>
                )}
                {items[key].map((v, i) => (
                  <View style={styles.tableRow} key={i}>
                    <View style={styles.tableCell_1}>
                      <Text>{i + 1}</Text>
                    </View>
                    <View style={styles.tableCell_2}>
                      <Text style={styles.subtitle2}>{v.name}</Text>
                      <Text>{v.description}</Text>
                    </View>
                    <View style={styles.tableCell_3}>
                      <Text>{v.qty}</Text>
                    </View>
                    <View style={styles.tableCell_3}>
                      <Text>{v.size}</Text>
                    </View>
                    <View style={[styles.tableCell_3, styles.alignRight]}>
                      <Text>{fCurrency(v.price)}</Text>
                    </View>
                  </View>
                ))}
              </React.Fragment>
            ))}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h4}>Total</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h4}>{fCurrency(paidAmount)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.footer]}>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>NOTES</Text>
            <Text>This content is generated automatically</Text>
          </View>
          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>Have a Question?</Text>
            <Text>moontasir001@gmail.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
