import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: "Be Vietnam Pro" },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    border: "1px solid black",
  },
  leftColumn: { flex: 1 },
  rightColumn: { flex: 1 },
  title: { fontSize: 24, marginBottom: 20 },
  logo: { width: 60, height: "auto", marginRight: 5, objectFit: "contain" },
  garageName: { fontSize: 18, fontWeight: "bold" },
  garageDetails: { fontSize: 10, color: "#666", marginTop: 5 },

  ownerName: { fontSize: 14, fontWeight: "bold", marginBottom: 4 },
  ownerDetails: { fontSize: 10, color: "#333", marginTop: 2 },
  vehicleDetails: { fontSize: 8, color: "blue", marginTop: 16 },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: "#f3f4f6",
    padding: 6,
  },
  table: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 4,
    marginTop: 4,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    paddingBottom: 4,
    marginBottom: 4,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 4,
    borderTopWidth: 0.1,

    borderTopColor: "black",
    borderTopStyle: "solid",
  },
  tableTotalRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  colId: { fontSize: 10, width: "10%" },
  colDesc: { fontSize: 10, width: "65%" },
  colQty: { fontSize: 10, width: "10%", textAlign: "center" },
  colDiscount: { fontSize: 10, width: "10%", textAlign: "right" },
  colAmount: { fontSize: 10, width: "15%", textAlign: "right" },
  colTotal: {
    fontSize: 10,
    fontWeight: "bold",
    width: "15%",
    textAlign: "right",
    border: "1 solid black",
    borderRadius: "4px",
    padding: 4,
  },

  agreementContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    border: "1px solid",
    margin: "20px",
  },
  standard: {
    fontSize: 10,
    width: "100%",
    padding: "4px",
  },
  center: {
    textAlign: "center",
  },
  h100: {
    height: "100px",
  },
  b1: {
    border: "1px solid black",
  },
  br4: {
    borderRadius: "4px",
  },
  m10: {
    margin: "10px",
  },

  headerPage: {
    position: "absolute",
    top: 20,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
    borderBottom: "1 solid #ccc",
    paddingBottom: 5,
    color: "#666",
  },
  footerPage: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
    color: "#666",
    borderTop: "1 solid #ccc",
    paddingTop: 5,
  },
  fdr: {
    flexDirection: "row",
  },

  jcb: {
    justifyContent: "space-between",
  },

  content: {
    marginTop: 30,
    marginBottom: 30,
  },

  brd: {
    border: "1px solid red",
  },
});
