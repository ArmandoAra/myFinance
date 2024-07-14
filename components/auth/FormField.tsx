import React, { useState } from 'react'
import { View, Text, TextInput, useColorScheme } from 'react-native'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FormField = ({ title, value, placeholder, handleChangeText, ...props }: {
    title: string, value: string,
    placeholder?: string, handleChangeText: (text: string) => void, otherStyles?: object, props?: any
}) => {
    const colorScheme = useColorScheme();
    const [showPassword, setShowPassword] = useState(true)
    return (
        <ThemedView style={{
            flexDirection: 'column',
            gap: 8,
            alignItems: 'center',
            width: '100%'
        }}>
            <ThemedText>{title}</ThemedText>
            <ThemedView style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60%'

            }}>
                <TextInput style={{
                    backgroundColor: "#26355D",
                    borderColor: Colors[colorScheme ?? 'light'].text,
                    color: Colors[colorScheme ?? 'light'].text,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    width: '100%',
                }}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' || title === 'Confirm Password' ? showPassword : false}
                    {...props}
                />
                {title === 'Password' || title === 'Confirm Password' ?
                    <Text style={{
                        color: Colors[colorScheme ?? 'light'].text,
                        position: 'absolute',
                        right: 10
                    }}
                        onPress={() => setShowPassword(!showPassword)}
                    >{showPassword
                        ? <MaterialCommunityIcons name="eye-off-outline" size={24} color={Colors[colorScheme ?? 'light'].text} />
                        : <MaterialCommunityIcons name="eye-outline" size={24} color={Colors[colorScheme ?? 'light'].text} />
                        }</Text>
                    : null
                }

            </ThemedView>
        </ThemedView>
    )
}

export default FormField
