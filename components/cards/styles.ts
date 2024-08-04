import { StyleSheet } from "react-native";
import {
    rowHeaderColor,
} from "../../constants/Colors";



export const styles = StyleSheet.create({
    textHeaderContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: rowHeaderColor,
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7,
    },
    textHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
        minHeight: "50%",
        marginBottom: 10,
        paddingBottom: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        gap: 2,
    },
    rowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'flex-end',
        width: '100%',
    },
    spendsIncomeRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '40%',
        gap: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'flex-end',
        width: '100%',
        marginVertical: 5,
    },
    textMonth: {
        fontSize: 18,
        color: '#219C90',
    },
    textSpendAmount: {
        fontSize: 18,
        color: '#AD2222',
    },
    textAmount: {
        fontSize: 18,
        color: '#A6F576'
    },
})
