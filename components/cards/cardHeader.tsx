import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

import { styles } from "./styles";
import { constantStyles } from "@/constants/Colors";



export function CardHeader({ textHeader }: { textHeader: string }) {


    return (
        <ThemedView style={{ ...styles.rowHeader }}>
            <ThemedText style={styles.textHeader}>{textHeader}</ThemedText>
            <ThemedView style={styles.spendsIncomeRowContainer}>
                <AutoSizeText
                    fontSize={22}
                    mode={ResizeTextMode.max_lines}
                    numberOfLines={1}
                    style={{ ...styles.textHeader, ...constantStyles.spendText }}
                >
                    Spend
                </AutoSizeText>
                <AutoSizeText
                    fontSize={22}
                    mode={ResizeTextMode.max_lines}
                    numberOfLines={1}
                    style={{ ...styles.textHeader, ...constantStyles.incomeText }}
                >
                    Income
                </AutoSizeText>
            </ThemedView>
        </ThemedView>
    )
}