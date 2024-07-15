import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, FlatList, Text, View, RefreshControl, Alert, Dimensions, Pressable, TextInput, StatusBar, Button, SafeAreaView, ViewStyle } from 'react-native';
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
//Components
import SearchInput from '@/components/SearchInput';
import VideoCard from '@/components/VideoCard'
import EmptyList from '@/components/Empty';

import { SpendInfo } from '@/components/spendCard/spendInfo';
import { DeleteSpend } from '@/components/spendCard/deleteSpend';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { useRoute } from '@react-navigation/native';

import { useYearAndMonthContext } from '@/context/YearAndMonthProvider';
import CustomButton from '@/components/buttons/CustomButton';
import { router } from 'expo-router';

const { height } = Dimensions.get('window');


//db
import { getUserById, insertMonth, insertSpend, insertUser, insertYear, openDatabase } from '@/db/mf';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';
import use from 'react';
import { useGlobalContext } from '@/context/GlobalProvider';
import { getIdFromSelectedYear, getSpendIdAndIncome, getAllSpendsByMonthId } from '@/db/getFromDb';
import { updateMonthIncome } from '@/db/writeInDb';

//Inputs 
import { IncomeInput } from '@/components/inputs/incomeInput';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { SpendInput } from '@/components/inputs/spendInput';


import { SpendList } from '@/components/spendCard/listSpendsContainer';
import { Amount } from '@/components/spendCard/amount';

import Picker from 'react-native-picker-select';


interface Spends {
    id: number;
    monthId: number;
    service: string;
    amount: number;
    type: string;
    description: string;
    createdAt: Date;
}

interface MonthData {
    id: number;
    brutIncome: number;
}



function MonthScreen() {
    const { selectedYear, selectedMonth } = useYearAndMonthContext();
    const { isLogged, user, setUser } = useGlobalContext();

    const [yearId, setYearId] = useState<number>(0);
    const [monthData, setMonthData] = useState<MonthData>({ id: 0, brutIncome: 0 });
    const [spends, setSpends] = useState<Spends[]>([]);
    const [income, setIncome] = useState<number>(0);

    //Inputs visibility
    const [showIncomeInput, setShowIncomeInput] = useState<boolean>(false);
    const [showSpendInput, setShowSpendInput] = useState<boolean>(false);


    const db = useSQLiteContext();

    useEffect(() => {
        getIdFromSelectedYear({ selectedYear, db, setYearId }) //Obtenemos el id del año seleccionado
        getSpendIdAndIncome({ db, selectedMonth, yearId, isLogged, setMonthData }) //Obtenemos el id y el brutIncome del mes seleccionado
        getAllSpendsByMonthId(monthData.id, db, setSpends) //Obtenemos todos los gastos del mes seleccionado 
    }, [monthData.brutIncome, monthData.id, yearId, spends.length])

    useEffect(() => {
        getSpendIdAndIncome({ db, selectedMonth, yearId, isLogged, setMonthData })
    }, [showIncomeInput])

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: '#383838' }} >
            <ThemedView>
                <ThemedView style={styles.headerContainer}>
                    <ThemedText style={styles.listHeader}>Expences from {selectedMonth}</ThemedText>
                </ThemedView>
                <ThemedView>

                    {/* Income */}
                    <ThemedView
                        style={{
                            flexDirection: 'row',
                            flexShrink: 1,
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            alignSelf: 'center',
                            marginTop: 10,
                            backgroundColor: '#31363F',
                            width: '90%',
                            height: 40,
                            borderRadius: 10,
                        }}
                    >

                        <ThemedText style={{ fontSize: 20, left: "100%" }}>Income: </ThemedText>
                        <ThemedText style={{ color: "#CCFFAD", backgroundColor: "#31363F", borderRadius: 10, textAlignVertical: "center", fontSize: 20, textAlign: "center", left: "100%" }} >{monthData.brutIncome} </ThemedText>
                        <Pressable
                            onPress={() => setShowIncomeInput(!showIncomeInput)}
                            style={{
                                position: "relative",
                                left: "100%",
                                backgroundColor: "#219C90",
                                height: '100%',
                                width: "10%",
                                borderRadius: 10,
                            }}><ThemedText style={{ textAlign: "center", textAlignVertical: "center", height: "100%" }}>+</ThemedText></Pressable>
                    </ThemedView>
                    {showIncomeInput &&
                        <IncomeInput
                            setShowIncomeInput={setShowIncomeInput}
                            showIncomeInput={showIncomeInput}
                            income={income}
                            setIncome={setIncome}
                            db={db}
                            monthId={monthData.id}
                        />}

                    {showSpendInput &&
                        <SpendInput
                            setShowSpendInput={setShowSpendInput}
                            monthId={monthData.id}
                            db={db}
                        />
                    }

                    {/* Sort By */}
                    <ThemedView
                        style={{
                            flexDirection: 'row',
                            width: '90%',
                            height: 40,
                            borderRadius: 10,
                            margin: 10,
                            alignSelf: 'center',
                        }}
                    >
                        <ThemedText style={{
                            fontSize: 20,
                            textAlign: "center",
                            backgroundColor: '#31363F',
                            textAlignVertical: "center",
                            borderRadius: 10,
                            width: "30%"
                        }}>Sort by: </ThemedText>
                        <ThemedText style={{
                            fontSize: 20,
                            backgroundColor: '#31363F',
                            width: "50%",
                            textAlign: "center",
                            textAlignVertical: "center",
                            borderRadius: 10,
                            left: "30%"
                        }}>Rent </ThemedText>
                        <ThemedText style={{
                            position: "relative",
                            backgroundColor: "#219C90",
                            left: "100%",
                            width: "10%",
                            color: "white",
                            textAlign: "center",
                            textAlignVertical: "center",
                            borderRadius: 10,
                        }}>+</ThemedText>
                    </ThemedView>

                    {/* Spends List */}
                    <SpendList
                        list={spends}
                        db={db}
                    />

                    {/* Total */}
                    <ThemedView
                        style={{
                            flexDirection: 'row',
                            flexShrink: 1,
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            alignSelf: 'center',
                            marginTop: 10,
                            backgroundColor: '#31363F',
                            width: '90%',
                            height: 50,
                            borderRadius: 10,
                        }}
                    >

                        <ThemedText style={{ fontSize: 23, backgroundColor: "#31363F", textAlignVertical: "center", left: "50%" }}>Total:</ThemedText>
                        <Amount showInfo={false} amount={spends.reduce((acc, spend) => acc + spend.amount, 0)} />


                    </ThemedView>

                    {/* Add Button */}
                    <Pressable
                        onPress={() => setShowSpendInput(!showSpendInput)}
                        style={{
                            borderRadius: 30,
                            display: "flex",
                            width: "90%",
                            height: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
                            margin: 10,
                            backgroundColor: "#219C90",
                            marginBottom: 25,
                        }}>
                        <FontAwesome name="plus" size={24} color="white" />
                    </Pressable>

                </ThemedView>

            </ThemedView>


        </SafeAreaView>


    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height,
        backgroundColor: '#383838',
        alignContent: 'space-between',
        marginTop: 20,
    },
    headerContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 7,
    },
    listHeader: {
        paddingTop: 20,
        height: 50,
        fontSize: 34,
        color: '#BBE9FF',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    buttonGoTo: {
        color: "white",
        borderRadius: 30,
        display: "flex",
        width: 200,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 220,
    },
    iconContainer: {
        top: 10,
        right: 12,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        borderRadius: 35,
        gap: 6,
    },
    categoryContainer: {
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    categoryText: {
        fontSize: 12,
    },
})



export default MonthScreen;