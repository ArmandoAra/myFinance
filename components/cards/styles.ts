import { StyleSheet } from "react-native";
import {
    rowHeaderColor,
} from "../../constants/Colors";

import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

import { PixelRatio } from 'react-native';
import { verticalScale } from '@/constants/dimensions';

// Obtener el factor de escala
const scale = PixelRatio.get();

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
        fontSize: 22,
        fontStyle: "italic",
        marginVertical: 5,
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
        height: verticalScale(),
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
        justifyContent: 'space-evenly',
        width: '60%',
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
        width: '40%',
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
