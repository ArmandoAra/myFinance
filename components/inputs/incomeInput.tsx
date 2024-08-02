import { TextInput, Pressable } from "react-native"
import { ThemedText } from "../ThemedText"
import { ThemedView } from "../ThemedView"

import { AntDesign } from '@expo/vector-icons';

//Db
import { updateIncome } from "@/db/dbTools";
import { useSQLiteContext } from "expo-sqlite/next";


export function IncomeInput({
    showIncomeInput,
    amount,
    year,
    month,
    setShowIncomeInput,
    setAmount
}: {
    showIncomeInput: boolean,
    amount: number,
    year: number,
    month: string,
    setShowIncomeInput: (showIncomeInput: boolean) => void,
    setAmount: React.Dispatch<React.SetStateAction<number>>,
}) {

    const db = useSQLiteContext();

    function handleIncomeInput() {
        updateIncome({ db, amount, month, year, setAmount })
        setShowIncomeInput(!showIncomeInput)
    }

    return (
        <ThemedView style={{
            paddingTop: 50,
            width: "100%",
            height: 1000,
            position: 'absolute',
            backgroundColor: 'black',
            zIndex: 20,
            gap: 10,
        }}>
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
                onChangeText={(text) => setAmount(Number(text))}
                placeholder="Enter your income"
                placeholderTextColor="white"
                keyboardType='decimal-pad'
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