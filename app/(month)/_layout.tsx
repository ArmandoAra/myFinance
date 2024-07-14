import { Link, Stack, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

//icons
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Pressable, StyleSheetProperties, StyleSheet, ActivityIndicator } from 'react-native';
import { YearAndMonthProvider } from '@/context/YearAndMonthProvider';
import { getMonthByNumber } from '@/utils/getMonth';
import { SQLiteProvider } from 'expo-sqlite/next';




export default function MonthLayout() {



    return (
        <React.Suspense fallback={<ActivityIndicator size='large' color='blue' />}>
            <SQLiteProvider
                databaseName='myFinance2.db'
            >
                <Tabs
                    screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: true,
                        tabBarStyle: {
                            display: 'none',
                        },
                    }}>

                </Tabs>
            </SQLiteProvider>
        </React.Suspense>

    );
}
function useYearAndMonthContext(): { selectedYear: any; selectedMonth: any; } {
    throw new Error('Function not implemented.');
}

