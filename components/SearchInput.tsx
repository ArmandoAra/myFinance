import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from "./ThemedView";
import { Colors } from '../constants/Colors';

const SearchInput = ({ initialQuery }: {
    initialQuery?: string;

}) => {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || "");

    return (
        <ThemedView style={{ flexDirection: "row", gap: 9 }} >
            <TextInput
                style={{
                    color: "#D6D3D1",
                    width: 200,
                    height: 40,
                    borderRadius: 20,
                    textAlign: "center",

                    borderBlockColor: "#E9C46A",
                    borderWidth: 3,
                    backgroundColor: "#FDCUEE0"
                }}
                value={query}
                placeholder="Search a video topic"
                placeholderTextColor="#D6D3D1"
                onChangeText={(e) => setQuery(e)}
            />

            <TouchableOpacity
                onPress={() => {
                    if (query === "")
                        return Alert.alert(
                            "Missing Query",
                            "Please input something to search results across database"
                        );

                    if (pathname.startsWith("/search")) router.setParams({ query });
                    else router.push(`/search/${query}`);
                }}
            >
                <Ionicons name="search-outline" size={24} color="white" />
            </TouchableOpacity>
        </ThemedView>
    );
};

export default SearchInput;