import { ViewStyle } from "react-native";
import { ThemedView } from "../ThemedView";
import { StyleSheet } from "react-native";



interface CardProps extends React.PropsWithChildren {
    style?: ViewStyle;
}


export function Card({ children, style = {} }: CardProps) {
    return (
        <ThemedView
            style={styles.card}
        >
            {children}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "column",
        width: "97%",
        marginHorizontal: 5,
        alignSelf: "center",
        marginVertical: 3,
        borderRadius: 15,
        overflow: "hidden",
    },
    shadowTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        shadowColor: 'white',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 1,
        shadowRadius: 10,
        zIndex: 1,
    },
});