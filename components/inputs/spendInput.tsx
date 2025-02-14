import { AntDesign } from "@expo/vector-icons";

import React, { useState } from "react";
import { TextInput, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

import { Spend } from '../../constants/interfaces';

import { insertSpend } from "@/db/dbTools";
import { Calculator } from "../calculator/Calculator";
import { SimpleLineIcons } from '@expo/vector-icons';
import { useSQLiteContext } from "expo-sqlite/next";
import RNDateTimePicker from "@react-native-community/datetimepicker";


export function SpendInput({
    setShowSpendInput,
    month,
    year,
}: {
    setShowSpendInput: (showSpendInput: boolean) => void,
    month: string,
    year: number,
}) {
    const db = useSQLiteContext();
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);



    const [data, setData] = useState<Spend>({
        id: 0,
        month,
        year,
        service: '',
        amount: 0,
        type: '',
        description: '',
        createdAt: new Date(),
    }
    );

    const handleChanges = (key: keyof Spend, value: string) => {

        if (key === 'createdAt') {
            setData((prevData) => ({
                ...prevData,
                createdAt: new Date(value),
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                [key]: value,
            }));
        };
    };

    const handleSubmit = () => {
        insertSpend({ data }, db);
        setShowSpendInput(false);
    };

    // Amount Calculator
    const handleCalculatorApply = (amount: number) => {
        setData((prevData) => ({
            ...prevData,
            amount,
        }));
    };

    const handleClose = (amount: string) => {
        if (amount === "") {
            setData((prevData) => ({
                ...prevData,
                amount: 0,
            }));
        }
        setIsCalculatorOpen(false);
    }


    return (
        <ThemedView style={styles.container}>

            {/* Service */}
            <TextInput
                value={data.service}
                onChangeText={(value) => handleChanges("service", value)}
                style={styles.input}
                placeholder="Insert Service"
                placeholderTextColor="white"
            />
            {/* Type */}
            <TextInput
                value={data.type}
                onChangeText={(value) => handleChanges("type", value)}
                style={styles.input}
                placeholder="Insert Type"
                placeholderTextColor="white"
            />
            {/* Description */}
            <TextInput
                value={data.description || ""}
                onChangeText={(value) => handleChanges("description", value)}
                style={{ ...styles.input, ...styles.description }}
                multiline={true}
                placeholder="Insert Description"
                placeholderTextColor="white"
            />
            {/* Amount */}
            <ThemedView style={styles.amountContainer}>
                <TextInput
                    value={data.amount.toString()}
                    onChangeText={(value) => handleChanges("amount", value)}
                    style={styles.input}
                    placeholder="Insert Amount"
                    placeholderTextColor="white"
                    keyboardType='decimal-pad'
                /><Pressable
                    onPress={() => setIsCalculatorOpen(!isCalculatorOpen)}
                    style={styles.calcIconContainer}>
                    <SimpleLineIcons name="calculator" size={24} color="white" />
                </Pressable>
            </ThemedView>
            {isCalculatorOpen &&
                <Calculator
                    onClose={handleClose}
                    onApply={handleCalculatorApply}
                    currentAmount={data.amount}
                />}
            {/* Date */}
            {showDatePicker &&
                <RNDateTimePicker
                    value={data.createdAt}
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                            handleChanges('createdAt', selectedDate.toISOString());
                        }
                    }}
                    id='date'
                    mode='date'
                    display='calendar'
                />
            }
            <Pressable
                onPress={() => setShowDatePicker(!showDatePicker)}
                style={styles.input}>
                <ThemedView style={styles.buttonDateText}>
                    <ThemedText>{data.createdAt.toISOString().split('T')[0]}</ThemedText>
                    <AntDesign name="calendar" size={24} color="white" />
                </ThemedView>

            </Pressable>
            <ThemedView style={styles.buttonContainer}>
                <Pressable
                    onPress={() => setShowSpendInput(false)}
                    style={{ ...styles.button, ...styles.cancelButton }}>
                    <ThemedText style={styles.buttonText}>
                        Cancel
                    </ThemedText>
                </Pressable>
                <Pressable

                    onPress={() => handleSubmit()}
                    style={{ ...styles.button, ...styles.addButton }}>
                    <ThemedText style={styles.buttonText}>
                        <AntDesign name="check" size={20} color="white" />
                    </ThemedText>
                </Pressable>

            </ThemedView>

        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        width: "100%",
        height: "100%",
        position: 'absolute',
        backgroundColor: 'black',
        zIndex: 1,
        gap: 10,
    },
    input: {
        fontSize: 20,
        display: "flex",
        borderColor: 'gray',
        borderRadius: 15,
        textAlign: 'center',
        alignSelf: 'center',
        color: 'white',
        backgroundColor: '#31363F',
        width: "78%",
        height: 50,
    },
    description: {
        width: "78%",
        height: 120,
    },
    amountContainer: {
        flexDirection: "row",
        width: "78%",
        alignSelf: "center"
    },
    calcIconContainer: {
        display: "flex",
        width: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",

    },
    buttonContainer: {
        flexDirection: "row",
        backgroundColor: "#E1E1E1",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "center",
        marginTop: 8,
        width: "78%",
        borderRadius: 15,
        height: 53,
        padding: 2,
    },
    buttonDateText: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        backgroundColor: "transparent",
        margin: "auto"
    },
    button: {
        width: "45%",
        height: 50,
        borderRadius: 15
    },
    addButton: {
        backgroundColor: "#219C90",
    },
    buttonText: {
        textAlign: "center",
        textAlignVertical: "center",
        height: "100%"
    },
    cancelButton: {
        backgroundColor: "red",
    }
})