import PropTypes from "prop-types";
import {
  Page,
  View,
  Text,
  Font,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { fCurrency } from "../../../../../utils/formatNumber";
import { fDateTimeSuffix } from "../../../../../utils/formatTime";
// utils

// ----------------------------------------------------------------------

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Regular.ttf" },
    { src: "/fonts/Roboto-Bold.ttf" },
  ],
});

const styles = StyleSheet.create({
  col4: { width: "25%" },
  col8: { width: "75%" },
  col6: { width: "50%" },
  mb8: { marginBottom: 8 },
  mb15: { marginBottom: 15 },
  mb40: { marginBottom: 40 },
  mb85: { marginBottom: 85 },
  overline: {
    fontSize: 8,
    marginBottom: 8,
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  h3: { fontSize: 16, fontWeight: 700 },
  h4: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  h5: { fontSize: 11, fontWeight: 700 },
  body1: { fontSize: 10 },
  subtitle2: { fontSize: 9, fontWeight: 700 },
  alignRight: { textAlign: "right" },
  page: {
    padding: "40px 28px 0 24px",
    fontSize: 9,
    lineHeight: 1.6,
    fontFamily: "Roboto",
    backgroundColor: "#fff",
    textTransform: "capitalize",
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "12px",
  },
  table: { display: "flex", width: "auto", margin: "0 15px" },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    padding: "5px 0",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#DFE3E8",
  },
  noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
  tableCell_2: { width: "55%" },
  tableCell_3: { width: "20%" },
  alignCenter: { textAlign: "center" },
  borderTop: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "black",
  },
  signature: { position: "absolute", bottom: 70, right: 30 },
  red: { color: "red", fontSize: 9, fontWeight: 700 },
  green: { color: "green", fontSize: 9, fontWeight: 700 },
  descriptionBox: {
    border: "1px solid black",
    width: "70%",
    padding: 10,
    marginTop: 20,
  },
});

// ----------------------------------------------------------------------

InvoicePDF.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default function InvoicePDF({ invoice }) {
  const {
    serialNo,
    patientId,
    name,
    contactNo,
    age,
    sex,
    address,
    departmentName,
    consultFee,
    testName,
    testAmountTk,
    subtotal,
    discountTk,
    payableAmount,
    paidAmount,
    createdAt,
    ptConsultFee,
    sessionFee,
    sessionPerDay,
    sessionDay,
    miscellaneousDetails,
    miscellaneousFee,
    miscellaneousDay,
    advance,
    due,
    description,
  } = invoice;

  const proxyTestName = testName || "";
  const testNameArr = proxyTestName.split(",");

  const proxyTestAmount = testAmountTk || "";
  const testAmountTkArr = proxyTestAmount.split(",");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.mb85} />
        <View style={[styles.alignCenter, styles.mb15]}>
          <Text style={styles.h4}>Invoice/Bill</Text>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col4}>
            <Text style={styles.body1}>
              <Text style={styles.subtitle2}>SL No: </Text>
              {serialNo}
            </Text>
            <Text style={styles.body1}>
              <Text style={styles.subtitle2}>Name: </Text>
              {name}
            </Text>
            <Text style={styles.body1}>
              <Text style={styles.subtitle2}>Address: </Text>
              {address}
            </Text>
          </View>
          <View style={styles.col4}>
            <Text style={styles.body1}>
              <Text style={styles.subtitle2}>Patient Id: </Text>
              {patientId}
            </Text>
            <Text style={styles.body1}>
              <Text style={styles.subtitle2}>Contact No: </Text>
              {contactNo}
            </Text>
          </View>
          <View style={styles.col4}>
            <Text style={styles.body1}>
              <Text style={styles.subtitle2}>Sex: </Text>
              {sex}
            </Text>
            <Text style={styles.body1}>
              <Text style={styles.subtitle2}>Age: </Text>
              {age}
            </Text>
          </View>
        </View>
        {/* //attention! table start hare... */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Description</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2} />
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>Fee</Text>
              </View>
            </View>
          </View>

          {sessionFee || ptConsultFee || miscellaneousFee ? (
            <View style={styles.tableHeader}>
              <View style={styles.tableRow}>
                <View style={styles.tableCell_2}>
                  <Text>
                    <Text style={styles.subtitle2}>#Department: </Text>
                    Physiotherapy
                  </Text>
                </View>
                <View style={styles.tableCell_3} />
                <View style={[styles.tableCell_3, styles.alignRight]} />
              </View>
              {ptConsultFee ? (
                <View style={styles.tableRow}>
                  <View style={styles.tableCell_2}>
                    <Text>Consult Fee</Text>
                  </View>
                  <View style={styles.tableCell_3} />
                  <View style={[styles.tableCell_3, styles.alignRight]}>
                    <Text>{ptConsultFee}</Text>
                  </View>
                </View>
              ) : (
                <View />
              )}
              {sessionFee ? (
                <View style={styles.tableRow}>
                  <View style={styles.tableCell_2}>
                    <Text>Session Fee</Text>
                  </View>
                  <View style={styles.tableCell_3} />
                  <View style={[styles.tableCell_3, styles.alignRight]}>
                    <Text>
                      {sessionFee}
                      {sessionPerDay > 1 ? `x${sessionPerDay}` : ""}
                      {sessionDay > 1 ? `x${sessionDay}` : ""}
                    </Text>
                  </View>
                </View>
              ) : (
                <View />
              )}
              {miscellaneousFee ? (
                <View style={styles.tableRow}>
                  <View style={styles.tableCell_2}>
                    <Text>
                      Miscellaneous Fee{" "}
                      {miscellaneousDetails && `(${miscellaneousDetails})`}
                    </Text>
                  </View>
                  <View style={styles.tableCell_3} />
                  <View style={[styles.tableCell_3, styles.alignRight]}>
                    <Text>
                      {miscellaneousFee}
                      {miscellaneousDay > 1 ? `x${miscellaneousDay}` : ""}
                    </Text>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
          ) : (
            <View />
          )}

          {departmentName ? (
            <View style={styles.tableHeader}>
              <View style={styles.tableRow}>
                <View style={styles.tableCell_2}>
                  <Text>
                    <Text style={styles.subtitle2}>#Department: </Text>
                    {departmentName}
                  </Text>
                </View>
                <View style={styles.tableCell_3} />
                <View style={[styles.tableCell_3, styles.alignRight]} />
                <View style={[styles.tableCell_3, styles.alignRight]} />
              </View>
              {consultFee ? (
                <View style={styles.tableRow}>
                  <View style={styles.tableCell_2}>
                    <Text>Consult Fee</Text>
                  </View>
                  <View style={styles.tableCell_3} />
                  <View style={[styles.tableCell_3, styles.alignRight]}>
                    <Text>{consultFee}</Text>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
          ) : (
            <View />
          )}

          {testNameArr[0] !== "" ? (
            <View style={styles.tableBody}>
              {testNameArr.map((item, index) => (
                <View style={styles.tableRow} key={item}>
                  <View style={styles.tableCell_2}>
                    <Text>
                      {index + 1}. {item}
                    </Text>
                  </View>
                  <View style={styles.tableCell_3} />
                  <View style={[styles.tableCell_3, styles.alignRight]}>
                    <Text>{testAmountTkArr[index]}</Text>
                  </View>
                </View>
              ))}

              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle2}>Total</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text style={styles.subtitle2}>{fCurrency(subtotal)}</Text>
                </View>
              </View>
              {discountTk ? (
                <View style={[styles.tableRow, styles.noBorder]}>
                  <View style={styles.tableCell_2} />
                  <View style={styles.tableCell_3}>
                    <Text style={styles.subtitle2}>Discount(-)</Text>
                  </View>
                  <View style={[styles.tableCell_3, styles.alignRight]}>
                    <Text style={[styles.subtitle2, styles.green]}>
                      {fCurrency(discountTk)}
                    </Text>
                  </View>
                </View>
              ) : (
                <View />
              )}
              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3}>
                  <Text style={styles.h5}>Payable Amount</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text style={styles.h5}>{fCurrency(payableAmount)}</Text>
                </View>
              </View>
              {due || advance ? (
                <>
                  <View style={[styles.tableRow, styles.noBorder]}>
                    <View style={styles.tableCell_2} />
                    <View style={styles.tableCell_3}>
                      <Text style={due ? styles.red : styles.green}>
                        {due ? "Due Amount" : "Advance Amount"}
                      </Text>
                    </View>
                    <View style={[styles.tableCell_3, styles.alignRight]}>
                      <Text style={due ? styles.red : styles.green}>
                        {due ? fCurrency(due) : fCurrency(advance)}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.tableRow, styles.noBorder]}>
                    <View style={styles.tableCell_2} />
                    <View style={styles.tableCell_3}>
                      <Text style={styles.h5}>Paid Amount</Text>
                    </View>
                    <View style={[styles.tableCell_3, styles.alignRight]}>
                      <Text style={styles.h5}>{fCurrency(paidAmount)}</Text>
                    </View>
                  </View>
                </>
              ) : (
                <View />
              )}
            </View>
          ) : (
            <View style={styles.tableBody}>
              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle2}>Total</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text style={styles.subtitle2}>{fCurrency(subtotal)}</Text>
                </View>
              </View>
              {discountTk ? (
                <View style={[styles.tableRow, styles.noBorder]}>
                  <View style={styles.tableCell_2} />
                  <View style={styles.tableCell_3}>
                    <Text style={styles.subtitle2}>Discount(-)</Text>
                  </View>
                  <View style={[styles.tableCell_3, styles.alignRight]}>
                    <Text style={[styles.subtitle2, styles.green]}>
                      {fCurrency(discountTk)}
                    </Text>
                  </View>
                </View>
              ) : (
                <View />
              )}
              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3}>
                  <Text style={styles.h5}>Payable Amount</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text style={styles.h5}>{fCurrency(payableAmount)}</Text>
                </View>
              </View>
              {due || advance ? (
                <>
                  <View style={[styles.tableRow, styles.noBorder]}>
                    <View style={styles.tableCell_2} />
                    <View style={styles.tableCell_3}>
                      <Text style={due ? styles.red : styles.green}>
                        {due ? "Due Amount" : "Advance Amount"}
                      </Text>
                    </View>
                    <View style={[styles.tableCell_3, styles.alignRight]}>
                      <Text style={due ? styles.red : styles.green}>
                        {due ? fCurrency(due) : fCurrency(advance)}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.tableRow, styles.noBorder]}>
                    <View style={styles.tableCell_2} />
                    <View style={styles.tableCell_3}>
                      <Text style={styles.h5}>Paid Amount</Text>
                    </View>
                    <View style={[styles.tableCell_3, styles.alignRight]}>
                      <Text style={styles.h5}>{fCurrency(paidAmount)}</Text>
                    </View>
                  </View>
                </>
              ) : (
                <View />
              )}
            </View>
          )}
        </View>
        {description ? (
          <View style={styles.descriptionBox}>
            {description.split("|").map((t, i) => (
              <Text style={styles.body1} key={i}>
                {t}
              </Text>
            ))}
          </View>
        ) : (
          <View />
        )}
        <View style={[styles.signature, styles.borderTop]}>
          <Text style={[styles.overline, styles.mb8]}>
            Authorized Signature
          </Text>
          <Text>{fDateTimeSuffix(createdAt)}</Text>
        </View>
      </Page>
    </Document>
  );
}
