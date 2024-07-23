
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Dimensions, Pressable, SafeAreaView } from 'react-native';

//Context
import { useSQLiteContext } from 'expo-sqlite';
import { useYearAndMonthContext } from '@/context/YearAndMonthProvider';
import { useGlobalContext } from '@/context/GlobalProvider';

//Style
const { height } = Dimensions.get('window');
import { FontAwesome } from '@expo/vector-icons';

//db
import { getMonthSpends, getMonthIncome, } from '@/db/dbTools';

//Components
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IncomeInput } from '@/components/inputs/incomeInput';
import { SpendInput } from '@/components/inputs/spendInput';
import { EditSpend } from '@/components/inputs/editSpend';
import { SpendList } from '@/components/spendCard/listSpendsContainer';
import { Amount } from '@/components/spendCard/amount';

//Interfaces
import { Spend } from '@/constants/interfaces';
import CustomButton from '@/components/buttons/CustomButton';
import { router, useFocusEffect } from 'expo-router';


function MonthScreen() {

    const { selectedYear, selectedMonth, } = useYearAndMonthContext();

    const [amount, setAmount] = useState<number>(0);
    const [spends, setSpends] = useState<Spend[]>([]);
    const [editSpend, setEditSpend] = useState<Spend>({
        id: 0,
        service: '',
        createdAt: new Date(),
        type: '',
        amount: 0,
        month: '',
        year: 0,
        description: '',
    });

    //Inputs visibility
    const [showIncomeInput, setShowIncomeInput] = useState<boolean>(false);
    const [showSpendInput, setShowSpendInput] = useState<boolean>(false);
    const [showEditInput, setShowEditInput] = useState<boolean>(false);

    //    Obterner el Income 
    useEffect(() => {
        //Obtener todos los Incomes del año seleccionado y si no existe crearlo
        getMonthIncome({ amount, year: selectedYear, month: selectedMonth, setAmount });
    }, [showIncomeInput])


    // Obtener los gastos del mes
    useEffect(() => {
        getMonthSpends(selectedYear, selectedMonth, setSpends);
    }, [spends.length, showSpendInput, showEditInput])

    function handleEdit({ id, service, date, type, amount }: { id: number; service: string; date: Date; type: string; amount: number }) {
        const createdAt = new Date(date);
        setEditSpend({ id, service, createdAt, type, amount, month: selectedMonth, year: selectedYear, description: '' });
        setShowEditInput(true);
    }

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
                        }}>Income: </ThemedText>
                        <ThemedText style={{
                            fontSize: 20,
                            backgroundColor: '#31363F',
                            width: "50%",
                            textAlign: "center",
                            textAlignVertical: "center",
                            borderRadius: 10,
                            left: "30%"
                        }} >{amount} </ThemedText>

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
                            amount={amount ? amount : 0}
                            setAmount={setAmount}
                            year={selectedYear}
                            month={selectedMonth}
                        />}

                    {showSpendInput &&
                        <SpendInput
                            setShowSpendInput={setShowSpendInput}
                            month={selectedMonth}
                            year={selectedYear}
                        />
                    }
                    {showEditInput &&
                        <EditSpend
                            editSpend={editSpend}
                            setShowEditInput={setShowEditInput}
                        />}

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
                        setSpends={setSpends}
                        showAmountInfo={true}
                        handleEdit={handleEdit}
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