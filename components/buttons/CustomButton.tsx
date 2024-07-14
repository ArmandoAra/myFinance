import { Pressable, TextStyle } from "react-native";
import { Text } from "react-native";


export default function CustomButton(
    { title,
        handlePress,
        textStyles,
        isLoading }:
        {
            title: string,
            handlePress: () => void,
            textStyles?: TextStyle,
            isLoading?: boolean
        }) {

    return <Pressable
        style={({ pressed }) => [
            {
                backgroundColor: pressed
                    ? '#86FFF3'
                    : '#219C90',
            }, textStyles
        ]}
        onPress={handlePress}
    >
        <Text style={{ fontSize: 23, paddingBottom: 5 }} >{title}</Text>
    </Pressable>;
}

