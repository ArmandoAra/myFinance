import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { styles } from "./styles";



export function CardHeader({ textHeader }: { textHeader: string }) {


    return (
        <ThemedView style={{ ...styles.rowHeader }}>
            <ThemedText style={styles.textHeader}>{textHeader}</ThemedText>
            <ThemedView style={styles.spendsIncomeRowContainer}>

                <ThemedText style={styles.textHeader}>Spend</ThemedText>
                <ThemedText style={styles.textHeader}>Income</ThemedText>
            </ThemedView>
        </ThemedView>
    )
}