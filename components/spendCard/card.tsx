import { ViewStyle } from "react-native";
import { ThemedView } from "../ThemedView";



interface CardProps extends React.PropsWithChildren {
    style?: ViewStyle;
}


export function Card({ children, style = {} }: CardProps) {
    return (
        <ThemedView
            style={{
                flexDirection: "row",
                width: "100%",
                height: 40,
                marginHorizontal: 10,
                marginVertical: 4,
                borderRadius: 10,
                gap: 2,
            }}
        >
            {children}
        </ThemedView>
    );
}