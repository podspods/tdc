import { StyleSheet } from "@react-pdf/renderer";

const theme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fontSize: {
    xs: 8,
    sm: 10,
    base: 12,
    lg: 14,
    xl: 16,
  },
  colors: {
    background: {
      light: "#EEEEDD",
      medium: "#BBBBBB",
      dark: "#999999",
    },

    border: "#E5E7EB",
    text: {
      primary: "#0F0F0F",
      secondary: "#444444",
    },
    error: "#EF4444",
    warning: "#F59E0B",
    success: "#10B981",
  },
};
//--------------------------------------------------------------------------------------------------------------------------

export const garageStyles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    margin: 0,
    padding: theme.spacing.sm,
    // backgroundColor: theme.colors.background.medium,
    alignItems: "center",
    justifyContent: "center",
  },

  title: { fontSize: theme.fontSize.xl, marginBottom: 20 },
  logo: { width: 150, height: "auto", marginRight: 5, objectFit: "contain" },
  name: { fontSize: theme.fontSize.xl, fontWeight: "bold" },
  garageDetails: {
    fontSize: theme.fontSize.sm,
    // color: "#666",
    marginTop: 5,
  },

  footer: {
    fontSize: theme.fontSize.sm,
    // color: "#666000",
    marginTop: 5,
  },
  address: {
    fontSize: theme.fontSize.sm,
    //  color: "#666999",
    marginTop: 5,
  },
  // phone: { fontSize: 10, color: "#666FFF", marginTop: 5, fontFamily: "Emoji" },
  phone: {
    fontSize: theme.fontSize.sm,
    // color: "#666FFF",
    marginTop: 5,
  },
});

//--------------------------------------------------------------------------------------------------------------------------

export const ownerStyles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    margin: 0,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.light,
    alignItems: "center",
    justifyContent: "center",
  },

  name: { fontSize: theme.fontSize.xl, fontWeight: "bold" },

  address: {
    fontSize: theme.fontSize.sm,
    marginTop: 5,
    textAlign: "left",
    width: "100%",
  },

  phone: {
    fontSize: theme.fontSize.sm,
    marginTop: 1,
    textAlign: "left",
    width: "100%",
  },
  city: {
    fontSize: theme.fontSize.sm,
    marginTop: 1,
    textAlign: "left",
    width: "100%",
  },
});
//--------------------------------------------------------------------------------------------------------------------------

export const vehicleStyles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    margin: 0,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.light,
    alignItems: "center",
    justifyContent: "center",
  },

  model: { fontSize: theme.fontSize.base, fontWeight: "bold" },
  information: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  plateNumber: {
    fontSize: theme.fontSize.base,
    marginTop: 1,
  },
  mileage: {
    fontSize: theme.fontSize.base,
    marginTop: 1,
  },
});
//--------------------------------------------------------------------------------------------------------------------------

export const daySectionStyles = StyleSheet.create({
  mainContainer: {
    fontSize: theme.fontSize.xs,

    width: "100%",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },

  dueDate: {
    marginTop: 1,
  },
  issueDate: {
    marginTop: 1,
  },
});
//--------------------------------------------------------------------------------------------------------------------------

export const invoiceStyles = StyleSheet.create({
  invoiceNumber: {
    fontSize: 10,
    marginTop: 1,
  },
});
//--------------------------------------------------------------------------------------------------------------------------

export const lineTypeSectionStyles = StyleSheet.create({
  mainContainer: {
    fontSize: theme.fontSize.base,
    width: "100%",
    margin: 0,
    padding: theme.spacing.sm,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    width: "100%",
    fontSize: theme.fontSize.lg,
    marginTop: 1,
    textAlign: "center",
    backgroundColor: theme.colors.background.light,
  },

  lineContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },

  id: {
    width: "4%",
    fontSize: theme.fontSize.xs,
  },
  description: {
    width: "50%",
  },
  quantity: {
    width: "5%",
    textAlign: "center",
    fontFamily: "Helvetica",
  },
  gross: {
    width: "15%",
    textAlign: "right",
    fontFamily: "Helvetica",
  },
  discount: {
    width: "10%",
    textAlign: "center",
    fontFamily: "Helvetica",
  },
  net: {
    width: "15%",
    textAlign: "right",
    fontFamily: "Helvetica",
  },
});
//--------------------------------------------------------------------------------------------------------------------------

export const summaryStyles = StyleSheet.create({
  mainContainer: {
    fontSize: theme.fontSize.base,
    width: "100%",
    margin: 0,
    padding: theme.spacing.sm,
    // backgroundColor: "#00FF99",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },

  row: {
    display: "flex",
    flexDirection: "row",
  },
  title: { width: "100%", backgroundColor: theme.colors.background.light, textAlign: "center" },
  subTitle: {
    width: "50%",
    // backgroundColor: "#FFFE99",
    textAlign: "right",
    fontFamily: "Helvetica",
  },
  detailValue: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "#FFFE99",
    fontFamily: "Helvetica",
    padding: "0 10 0 0 ",
  },

  detailTextValue: {
    textAlign: "right",
  },
  totalValue: {
    width: "20%",
    // backgroundColor: "#FFFE99",
    textAlign: "right",
    fontFamily: "Helvetica",
  },
  netAmount: {
    width: "20%",
    textAlign: "right",
    fontWeight: 500,
    border: "1px solid black",
    fontFamily: "Helvetica",
  },
});
//--------------------------------------------------------------------------------------------------------------------------

export const agreementStyles = StyleSheet.create({
  mainContainer: {
    fontSize: theme.fontSize.base,
    width: "100%",
    margin: 0,
    padding: theme.spacing.sm,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },

  title: { width: "100%", backgroundColor: theme.colors.background.light, textAlign: "center" },

  explain: {
    width: "100%",
    textAlign: "left",
    padding: "15 0",
    fontSize: theme.fontSize.sm,
  },
  twoHalf: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    width: "100%",
    padding: "5 0",
  },
  half: {
    width: "50%",
    height: 100,
    border: "1px solid #555555",
    textAlign: "center",
    paddingTop: 3,
    borderRadius: 10,
  },
});
//--------------------------------------------------------------------------------------------------------------------------

export const pageStyles = StyleSheet.create({
  page: { padding: 20, fontFamily: "Be Vietnam Pro" },
  mainContainer: {
    margin: 0,
    padding: theme.spacing.sm,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },

  bodyContainer: {
    marginTop: 30,
  },
});

export const pdfStyles = StyleSheet.create({
  page: { padding: 20, fontFamily: "Be Vietnam Pro" },

  mainContainer: {
    margin: 0,
    padding: theme.spacing.sm,
    // backgroundColor: theme.colors.background.light,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  twoHalfPage: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
  },

  leftSide: {},
});
