import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text } from 'react-native';

// utils
import { getMonthByNumber } from '@/utils/getMonth';


import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';

//Components
import CustomButton from '@/components/buttons/CustomButton';
import HomeTotalCard from '@/components/cards/homeTotalCard';
import { router } from 'expo-router';


import { useYearAndMonthContext, YearAndMonthProvider } from '@/context/YearAndMonthProvider';
import { useSQLiteContext } from 'expo-sqlite';
import { useGlobalContext } from '@/context/GlobalProvider';

const { height, width } = Dimensions.get('window');

//getFromDb
import { getAllYearIncomes, getUser, getIdFromSelectedYear } from '@/db/getFromDb';


//Styles
import { styles, pickerStyles } from './styles';

interface IncomeMonth {
    [key: string]: number;
}

const Home = () => {
    const { selectedYear, selectedMonth, setSelectedYear, setSelectedMonth, } = useYearAndMonthContext();
    const { isLogged, user, setUser } = useGlobalContext();
    const [yearId, setYearId] = useState<number>(0);
    const [allIncomes, setAllIncomes] = useState<IncomeMonth>(); // [brutIncome, brutIncome, ...
    const db = useSQLiteContext();


    useEffect(() => {
        getUser({ isLogged, db, email: 'guest@example.com', password: '', setUser })
    }, [user.id, user.name])


    useEffect(() => {
        getIdFromSelectedYear({ selectedYear, db, setYearId });
        getAllYearIncomes(yearId, db, setAllIncomes);//Aqui devuelve un objeto con los ingresos de cada mes y el nombre del mes
        //Arreglar para que devuelva solo la suma de los brutIncomes y la suma de cada mes de los gastos y el total hacer de ultimo.
    }, [yearId]);



    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerContainer}>
                <ThemedText style={styles.title} >My Personal Finance</ThemedText>
            </ThemedView>
            <ThemedView style={styles.pickerMainContainer}>

                <ThemedView style={styles.pickerContainer}>
                    {/* Select Year */}
                    <RNPickerSelect
                        placeholder={{ label: ` ${selectedYear}`, value: selectedYear }}
                        value={selectedYear}
                        onValueChange={(value) => setSelectedYear(value)}

                        items={[
                            { label: '2023', value: 2023 },
                            { label: '2024', value: 2024 },
                            { label: '2025', value: 2025 },
                            { label: '2026', value: 2026 },
                        ]}
                        style={pickerStyles}

                    />
                </ThemedView>
                <ThemedView style={styles.pickerContainer}>
                    {/* Select Month */}
                    <RNPickerSelect
                        placeholder={{ label: ` ${selectedMonth}`, value: selectedMonth }}
                        value={selectedMonth}
                        onValueChange={(value) => setSelectedMonth(value)}
                        items={[
                            { label: "January", value: "January" },
                            { label: "February", value: "February" },
                            { label: "March", value: "March" },
                            { label: "April", value: "April" },
                            { label: "May", value: "May" },
                            { label: "June", value: "June" },
                            { label: "July", value: "July" },
                            { label: "August", value: "August" },
                            { label: "September", value: "September" },
                            { label: "October", value: "October" },
                            { label: "November", value: "November" },
                            { label: "December", value: "December" },
                        ]}
                        style={pickerStyles}
                    />
                </ThemedView>
            </ThemedView>
            <CustomButton title="Go to" handlePress={() => router.push("/monthScreen")} textStyles={styles.buttonGoTo} />


            {/* Este componente debe recibir los datos que estan en el ejemplo en el componente que deben ser obtenidos de la db */}
            <HomeTotalCard />

            {/* <ThemedView>
                <ThemedText style={styles.listHeader}>Total Income {allIncomes}</ThemedText>
            </ThemedView> */}

        </ThemedView>
    )
}



export default Home
