import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get('window');


export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: "100%",
    },
    headerContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 1,
    },
    listHeader: {
        paddingTop: 20,
        height: 50,
        fontSize: 25,
        color: '#BBE9FF',
    },
    incomeContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: '#31363F',
        width: '95%',
        height: 50,
        borderRadius: 10,
        margin: 3,
    },
    incomeText: {
        fontSize: 20,
        textAlign: "center",
        backgroundColor: 'transparent',
        textAlignVertical: "center",
        borderRadius: 10,
        width: "40%"
    },
    incomeAmountButton: {
        position: "relative",
        backgroundColor: "#219C90",
        width: "90%",
        height: 40,
        margin: 5,
        borderRadius: 10,
    },
    incomeAmountText: {
        height: 40,
        fontSize: 20,
        textAlign: "center",
        textAlignVertical: "center",
    },
    pickerContainer: {
        width: '80%',
        height: 50,
        alignSelf: 'center',
        margin: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    textAmount: {
        fontSize: 20,
        height: 40,
        textAlign: "center",
        color: '#A6F576',
        margin: 5,
        textAlignVertical: "center",
    },
})
