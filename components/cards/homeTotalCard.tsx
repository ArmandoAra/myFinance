import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";

//Db
import { getYearData, YearDataResult } from "@/db/dbTools";

//Context
import { useYearAndMonthContext } from "@/context/YearAndMonthProvider";
import { useSQLiteContext } from "expo-sqlite/next";

//Styles
import { styles } from './styles';

//Interfaces
import { YearAndMonthData } from '@/interfaces/myInterfaces';

//Components
import { ThemedText } from "../ThemedText"
import { ThemedView } from "../ThemedView"
import { CardHeader } from './cardHeader';
import { CardList } from './cardList';


export default function HomeTotalCard() {
    const db = useSQLiteContext();
    const [yearData, setYearData] = useState<YearDataResult>()
    const [yearAndMonthData, setYearAndMonthData] = useState<YearAndMonthData[]>([])

    //Obtener selectedYear del context
    const { selectedYear } = useYearAndMonthContext();

    //Obtener los datos cada vez que se cambie el año o se entre a la pantalla
    useFocusEffect(
        useCallback(() => {
            getYearData(db, selectedYear, setYearAndMonthData, setYearData)
        }, [selectedYear])
    );

    return (

        < ThemedView style={styles.container} >
            <ThemedView style={styles.textHeaderContainer}>
                <ThemedText style={styles.textHeader} >Total of the {selectedYear}</ThemedText>
            </ThemedView>

            <CardHeader textHeader="Month" />

            <FlatList
                data={yearAndMonthData}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <CardList rowText={item.month} spend={item.spendAmount} amount={item.amount} />
                )}
                keyExtractor={(item) => (item.month).toString()}
            />

            <CardHeader textHeader="Total" />
            <CardList rowText="All months" spend={yearData?.spendAmounts} amount={yearData?.amounts} />
        </ ThemedView>

    )
}




