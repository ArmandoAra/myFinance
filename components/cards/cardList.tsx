import { useEffect } from "react";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { styles } from "./styles";



export function CardList({
    rowText,
    spend,
    amount
}: {
    rowText: string,
    spend: number | undefined,
    amount: number | undefined
}) {


    return (
        <ThemedView style={styles.row}>
            <ThemedText style={styles.textMonth} >{rowText}</ThemedText>
            <ThemedView style={styles.spendsIncomeRowContainer}>
                <ThemedText style={styles.textSpendAmount}>{spend} </ThemedText>
                <ThemedText style={styles.textAmount}>{amount} </ThemedText>
            </ThemedView>
        </ThemedView>
    )
}