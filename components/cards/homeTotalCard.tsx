import { ThemedText } from "../ThemedText"
import { ThemedView } from "../ThemedView"
import { StyleSheet } from 'react-native';

// Constants
import {
    rowHeaderColor, rowColorLighter, rowColorDarker
} from "../../constants/Colors";


const exampleData = {
    year: 2024,
    totalBruIncome: 1000,
    totalNetIncome: 800,
    totalSpend: 200,
    totalUmst: 100,
    total: 1000
}


export default function HomeTotalCard() {

    return (

        < ThemedView style={styles.container} >
            <ThemedView style={styles.textHeaderContainer}>
                <ThemedText style={styles.textHeader} >Total of the {exampleData.year}</ThemedText>
            </ThemedView>
            <ThemedView style={{ ...styles.rowHeader }}>
                <ThemedText >Type</ThemedText>
                <ThemedText>Amount</ThemedText>
            </ThemedView>

            <ThemedView style={{ width: '100%', height: 130, justifyContent: 'center' }}>
                <ThemedView style={{ ...styles.row, backgroundColor: rowColorDarker }}>
                    <ThemedText >Brut</ThemedText>
                    <ThemedText style={{ color: '#3035A4' }}>{exampleData.totalBruIncome} €</ThemedText>
                </ThemedView>
                <ThemedView style={{ ...styles.row, backgroundColor: rowColorLighter }}>
                    <ThemedText >Neto</ThemedText>
                    <ThemedText style={{ color: '#A6F576' }}>{exampleData.totalNetIncome.toFixed(2)} €</ThemedText>
                </ThemedView>
                <ThemedView style={{ ...styles.row, backgroundColor: rowColorDarker }}>
                    <ThemedText >Spend</ThemedText>
                    <ThemedText style={{ color: '#AD2222' }}>{exampleData.totalSpend} €</ThemedText>
                </ThemedView>
                <ThemedView style={{ ...styles.row, backgroundColor: rowColorLighter }}>
                    <ThemedText >Umst.</ThemedText>
                    <ThemedText style={{ color: '#3035A4' }}>{exampleData.totalUmst} €</ThemedText>
                </ThemedView>

            </ThemedView>

            <ThemedView style={{ ...styles.row }}>
                <ThemedText >Total</ThemedText>
                <ThemedText style={{ color: '#A6F576' }}>{exampleData.total.toFixed(2)} €</ThemedText>
            </ThemedView>


        </ ThemedView>

    )
}

const styles = StyleSheet.create({
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
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
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
        height: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'flex-end',
        width: '100%',
        marginVertical: 2,
    },
})



