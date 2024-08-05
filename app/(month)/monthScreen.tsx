
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Pressable, SafeAreaView } from 'react-native';
import Picker from 'react-native-picker-select';

//Context
import { useYearAndMonthContext } from '@/context/YearAndMonthProvider';
import { useSQLiteContext } from 'expo-sqlite';

//Style
import { styles } from './styles';
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
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';





function MonthScreen() {


    const { selectedYear, selectedMonth, } = useYearAndMonthContext();
    const db = useSQLiteContext();

    const [amount, setAmount] = useState<number>(0);
    const [spends, setSpends] = useState<Spend[]>([]);
    const [filteredSpends, setFilteredSpends] = useState<Spend[]>(spends);
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
        getMonthIncome({ db, amount, year: selectedYear, month: selectedMonth, setAmount });
    }, [showIncomeInput])

    function handleEdit({ id, service, date, type, amount, description }: { id: number; service: string; date: Date; type: string; amount: number, description: string }) {
        const createdAt = new Date(date);
        setEditSpend({ id, service, createdAt, type, amount, month: selectedMonth, year: selectedYear, description });
        setShowEditInput(true);
    }

    // Obtener los gastos del mes
    useEffect(() => {
        getMonthSpends(db, selectedYear, selectedMonth, setSpends);
    }, [spends.length, showSpendInput, showEditInput])

    //SelectType Filter
    const [selectedType, setSelectedType] = useState<string>('All Spends');

    useEffect(() => {
        if (selectedType === 'All Spends') {
            setFilteredSpends(spends);
        } else {
            setFilteredSpends(spends.filter(spend => spend.type === selectedType));
        }

    }, [selectedType, spends]);

    const spendTypes = useMemo(() => {
        const types = new Set(spends.map(spend => spend.type));
        if (!types) return
        return Array.from(types).concat('All Spends')
    }, [spends]) || [];

    const calcSpendsByType = ({ spends, selectedType }: { spends: Spend[], selectedType: string }) => {
        if (selectedType !== 'All Spends') {
            return spends.filter(spend => spend.type === selectedType).reduce((acc, spend) => acc + spend.amount, 0)
        }
        return spends.reduce((acc, spend) => acc + spend.amount, 0)
    }

    return (

        <SafeAreaView  >
            <ThemedView style={styles.container}>
                <ThemedView style={styles.headerContainer}>
                    <ThemedText style={styles.listHeader}>Month: {selectedMonth}</ThemedText>
                </ThemedView>
                <ThemedView>

                    {/* @@@@@@@@@@@@@@@@@@@@@@ Income @@@@@@@@@@@@@@@@@@@@@@@@*/}
                    <ThemedView
                        style={styles.incomeContainer}
                    >

                        <Pressable
                            onPress={() => setShowIncomeInput(!showIncomeInput)}
                            style={styles.incomeAmountButton}>
                            <ThemedText style={styles.incomeAmountText} >
                                <ThemedText style={styles.incomeText}>Income: </ThemedText>
                                {amount}
                            </ThemedText>
                        </Pressable>
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

                    {/* @@@@@@@@@@@@@@@@@@@@@ Sort By @@@@@@@@@@@@@@@@@@@@@ */}
                    <ThemedView
                        style={styles.pickerContainer}
                    >
                        {/* Sort by */}
                        <Picker
                            placeholder={{
                                label: ` ${selectedType}`,
                                value: selectedType,
                                color: '#219C90',
                            }}
                            value={selectedType}
                            onValueChange={(e) => setSelectedType(e)}
                            items={spendTypes.map((spend) => ({ label: spend, value: spend })) || []}
                            style={pickerStyles}
                            useNativeAndroidPickerStyle={false}
                        />
                    </ThemedView>

                    {/*@@@@@@@@@@@@@@@@@@@@@@ Spends List @@@@@@@@@@@@@@@@@@@*/}
                    <SpendList
                        list={spends.filter(spend => selectedType === 'All Spends' ? spend : spend.type === selectedType)}
                        setSpends={setSpends}
                        handleEdit={handleEdit}
                    />
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

                    {/*@@@@@@@@@@@@@@ Total Spends Amount @@@@@@@@@@@@@@@@@*/}
                    <ThemedView style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        backgroundColor: '#31363F',
                        width: '95%',
                        borderRadius: 15,
                        margin: 10
                    }}>
                        <ThemedText style={{
                            fontSize: 20,
                            textAlign: "center",
                            backgroundColor: '#31363F',
                            textAlignVertical: "center",
                            borderRadius: 10,
                            width: "40%"
                        }}>Total: </ThemedText>
                        <Amount amount={calcSpendsByType({ spends, selectedType })} />
                        <AutoSizeText
                            fontSize={20}
                            mode={ResizeTextMode.max_lines}
                            numberOfLines={1}
                            style={styles.textAmount}
                        >
                            {amount - calcSpendsByType({ spends, selectedType: 'All Spends' })}
                        </AutoSizeText>
                    </ThemedView>

                    {/* Add Button */}
                    <Pressable
                        onPress={() => setShowSpendInput(!showSpendInput)}
                        style={{
                            borderRadius: 50,
                            display: "flex",
                            width: 70,
                            height: 70,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
                            backgroundColor: "#219C90",

                        }}>
                        <FontAwesome name="plus" size={24} color="white" />
                    </Pressable>

                </ThemedView>

            </ThemedView>
        </SafeAreaView>

    )
}

export default MonthScreen;


export const pickerStyles = StyleSheet.create({
    inputAndroid: {
        fontSize: 21,
        fontStyle: 'italic',
        width: '100%',
        height: 40,
        textAlign: 'center',
        borderRadius: 15,
        alignSelf: 'center',
        margin: 0,
        color: 'white',
        backgroundColor: '#219C90',
    },
})