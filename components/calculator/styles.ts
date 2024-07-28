import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  calculatorModal: {
    width: '90%',
    position: 'absolute',
    zIndex: 20,
    alignSelf: 'center',
    top: '43.63%', // Ajustado para centrar verticalmente
    backgroundColor: 'transparent',
  },
  calculatorDisplay: {
    position: 'relative',
    width: "65%",
    height: 35,
    left: "8%",
    bottom: 3,
    backgroundColor: "#31363F",
    marginBottom: 10,
  },
  calculatorDisplayText: {
    width: "90%",
    fontSize: 21,
    left: "8%",
    textAlign: "center",
    color: 'white',
  },
  calculatorButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calculatorButton: {
    flexBasis: '22%',
    margin: '1%',
    padding: 15,
    backgroundColor: '#383838',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  calculatorButtonText: {
    fontSize: 24,
  },
  calculatorButtonLastChild: {
    flexBasis: '47%',
  },
  resultButton: {
    backgroundColor: '#219C90',
    borderRadius: 10,
  },
  resultButtonText: {
    height: 30,
    top: 5,
    verticalAlign: 'middle',
    fontSize: 30,
    color: 'white',
  },
});