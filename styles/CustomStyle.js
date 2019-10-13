import { StyleSheet } from "react-native";

const colors = {
  black: "#222222",
  white: "#ffffff",
  primary: "#4662bd",
  success: "#31c882",
  warning: "#e8eb73",
  danger: "#cc6565"
};

export default StyleSheet.create({
  // Whole Page
  wholePage: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%"
  },
  // Header
  header: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 100
  },
  headerBody: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row"
  },
  headerBodyIcon: {
    height: 70,
    width: 50,
    marginRight: 20
  },
  headerBodyContent: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column"
  },
  // Content
  content: {
    padding: 10
  },
  // Level
  level: {
    flexDirection: "row",
    width: "100%"
  },
  levelItem: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  levelItemHeading: {
    fontSize: 15,
    textTransform: "uppercase"
  },
  levelItemTitle: {
    fontSize: 30
  },
  // Cards
  cardItemColumn: {
    alignItems: "flex-start",
    flexDirection: "column"
  },
  // Table
  table: {
    alignItems: "center",
    borderColor: "#eeeeee",
    borderWidth: 1,
    justifyContent: "center",
    width: "100%"
  },
  tableRow: {
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "row"
  },
  tableCell: {
    alignSelf: "stretch",
    borderColor: "#eeeeee",
    borderWidth: 1,
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  // Buttons
  button: {
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15
  },
  // Form
  form: {
    padding: 30,
    width: "100%"
  },
  formGroup: {
    marginBottom: 10
  },
  formInputPadding: {
    paddingLeft: 20,
    paddingRight: 20
  },
  // Icons
  iconSm: {
    height: 30,
    width: 30
  },
  icon: {
    height: 40,
    width: 40
  },
  iconLg: {
    height: 50,
    width: 50
  },
  // Modal
  modal: {
    backgroundColor: "rgba(34, 34, 34, 0.8)",
    flex: 1,
    justifyContent: "center",
    padding: 20,
    height: "100%",
    width: "100%"
  },
  modalContent: {
    backgroundColor: "#ffffff"
  },
  // QR
  qr: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: colors.primary,
    borderWidth: 2
  },
  // Font Weight
  fontWeightNormal: {
    fontWeight: "normal"
  },
  fontWeightBold: {
    fontWeight: "bold"
  },
  // Text Alignments
  textLeft: {
    textAlign: "left"
  },
  textRight: {
    textAlign: "right"
  },
  textCenter: {
    textAlign: "center"
  },
  // Flex Alignments
  alignItemsStart: {
    alignItems: "flex-start"
  },
  alignItemsEnd: {
    alignItems: "flex-end"
  },
  alignItemsCenter: {
    alignItems: "center"
  },
  justifyContentStart: {
    justifyContent: "flex-start"
  },
  justifyContentEnd: {
    justifyContent: "flex-end"
  },
  justifyContentCenter: {
    justifyContent: "center"
  },
  // Flex Direction
  directionColumn: {
    flexDirection: "column"
  },
  directionRow: {
    flexDirection: "row"
  },
  // Background Colors
  bgBlack: {
    backgroundColor: colors.black
  },
  bgWhite: {
    backgroundColor: colors.white
  },
  bgPrimary: {
    backgroundColor: colors.primary
  },
  bgSuccess: {
    backgroundColor: colors.success
  },
  bgWarning: {
    backgroundColor: colors.warning
  },
  bgDanger: {
    backgroundColor: colors.danger
  },
  // Foreground Colors
  fgBlack: {
    color: colors.black
  },
  fgWhite: {
    color: colors.white
  },
  fgPrimary: {
    color: colors.primary
  },
  fgSuccess: {
    color: colors.success
  },
  fgWarning: {
    color: colors.warning
  },
  fgDanger: {
    color: colors.danger
  }
});
