import { updateMonthIncome } from "@/db/writeInDb"
import { TextInput, Pressable } from "react-native"
import { ThemedText } from "../ThemedText"
import { ThemedView } from "../ThemedView"

import * as SQLite from 'expo-sqlite';

import { AntDesign } from '@expo/vector-icons';


export function IncomeInput({
    showIncomeInput,
    income,
    db,
    monthId,
    setShowIncomeInput,
    setIncome
}: {
    showIncomeInput: boolean,
    income: number,
    db: SQLite.SQLiteDatabase,
    monthId: number
    setShowIncomeInput: (showIncomeInput: boolean) => void,
    setIncome: (income: number) => void,
}) {
    function handleIncomeInput() {
        updateMonthIncome(db, monthId, income)
        setShowIncomeInput(!showIncomeInput)
    }

    return (
        <ThemedView style={{ height: "100%" }}>
            <TextInput
                style={{
                    fontSize: 20,
                    display: "flex",
                    position: 'absolute',
                    marginTop: 60,
                    height: 50,
                    width: "78%",
                    borderColor: 'gray',
                    borderRadius: 15,
                    textAlign: 'center',
                    alignSelf: 'center',
                    color: 'white',
                    left: "4%",
                    backgroundColor: '#31363F',
                }}
                placeholder="Insert Income"
                placeholderTextColor="white"
                keyboardType='decimal-pad'
                onChangeText={(text) => setIncome(Number(text))}
            />
            <Pressable
                onPress={handleIncomeInput}
                style={{
                    position: "absolute",
                    right: 25,
                    marginTop: 60,
                    backgroundColor: "#219C90",
                    width: "10%",
                    height: 50,
                    borderRadius: 10,
                }}>
                <ThemedText style={{ textAlign: "center", textAlignVertical: "center", height: "100%" }}>
                    <AntDesign name="check" size={20} color="white" />
                </ThemedText>
            </Pressable>

            <Pressable
                onPress={() => setShowIncomeInput(!showIncomeInput)}
                style={{
                    position: "absolute",
                    right: 25,
                    marginTop: 120,
                    backgroundColor: "red",
                    width: "90%",
                    height: 50,
                    borderRadius: 10,
                }}>
                <ThemedText style={{ textAlign: "center", textAlignVertical: "center", height: "100%" }}>
                    Cancel
                </ThemedText>
            </Pressable>
        </ThemedView>

    )
}