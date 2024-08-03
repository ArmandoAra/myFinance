import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect } from 'react'



//Components
import CustomButton from '@/components/buttons/CustomButton';
import HomeTotalCard from '@/components/cards/homeTotalCard';
import { router } from 'expo-router';

import { useYearAndMonthContext } from '@/context/YearAndMonthProvider';



//Styles
import { styles, pickerStyles } from './styles';
import { Picker } from '@react-native-picker/picker';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');



const Home = () => {
    const {
        selectedYear,
        selectedMonth,
        setSelectedYear,
        setSelectedMonth,
    } = useYearAndMonthContext();



    return (

        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerContainer}>
                <ThemedText style={styles.title} >My Personal Finance</ThemedText>
            </ThemedView>
            <ThemedView style={styles.pickerMainContainer}>

                <ThemedView style={styles.pickerContainer}>
                    {/* Select Year */}
                    <Picker
                        style={pickerStyles.inputAndroid}
                        selectedValue={selectedYear}
                        onValueChange={(value) => setSelectedYear(value)}>
                        <Picker.Item label="2024" value={2024} />
                        <Picker.Item label="2025" value={2025} />
                        <Picker.Item label="2026" value={2026} />
                        <Picker.Item label="2027" value={2027} />
                        <Picker.Item label="2028" value={2028} />
                        <Picker.Item label="2029" value={2029} />
                        <Picker.Item label="2030" value={2030} />
                    </Picker>

                </ThemedView>
                <ThemedView style={styles.pickerContainer}>
                    {/* Select Month */}
                    <Picker
                        style={pickerStyles.inputAndroid}
                        selectedValue={selectedMonth}
                        onValueChange={(value) => setSelectedMonth(value)}
                    >
                        <Picker.Item label="January" value="January" />
                        <Picker.Item label="February" value="February" />
                        <Picker.Item label="March" value="March" />
                        <Picker.Item label="April" value="April" />
                        <Picker.Item label="May" value="May" />
                        <Picker.Item label="June" value="June" />
                        <Picker.Item label="July" value="July" />
                        <Picker.Item label="August" value="August" />
                        <Picker.Item label="September" value="September" />
                        <Picker.Item label="October" value="October" />
                        <Picker.Item label="November" value="November" />
                        <Picker.Item label="December" value="December" />
                    </Picker>

                </ThemedView>
            </ThemedView>
            <CustomButton title="Go to" handlePress={() => router.push("/monthScreen")} textStyles={styles.buttonGoTo} />


            {/* Este componente debe recibir los datos que estan en el ejemplo en el componente que deben ser obtenidos de la db */}
            <HomeTotalCard />


        </ThemedView>
    )
}



export default Home
