// Calculator.tsx
import React, { useState } from 'react';
import { styles } from './styles';
import * as reactNative from 'react-native';
import { ThemedText } from "../ThemedText"
import { ThemedView } from "../ThemedView"
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';


interface CalculatorProps {
    onClose: (amount: string) => void;
    onApply: (amount: number) => void;
    currentAmount: number;
}

export function Calculator({ onClose, onApply, currentAmount }: CalculatorProps) {
    const [expression, setExpression] = useState(currentAmount === 0 ? '' : currentAmount.toString());

    const handleButtonPress = (value: string) => {
        setExpression((prev) => prev + value);
    };

    const handleClear = () => {
        setExpression('');
    };

    const handleCalculate = () => {
        if (expression === '') return;
        try {
            const result = eval(expression);
            onApply(result.toFixed(2));
            onClose(expression);
        } catch {
            alert('Invalid Expression');
            handleClear();
        }
    };

    function deleteLastCharacter(str: string) {
        if (str.length > 0) {
            return str.slice(0, -1);
        } else {
            return str;
        }
    }

    return (
        <reactNative.Modal transparent={true} visible={true}>
            <ThemedView style={styles.calculatorModal}>
                <ThemedView style={styles.calculatorDisplay}>
                    <AutoSizeText
                        fontSize={20}
                        mode={ResizeTextMode.max_lines}
                        numberOfLines={1}
                        style={styles.calculatorDisplayText}
                    >
                        {expression}
                    </AutoSizeText>
                </ThemedView>
                <ThemedView style={styles.calculatorButtons}>
                    {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
                        <reactNative.Pressable
                            key={btn}
                            onPress={() => (btn === '=' ? handleCalculate() : handleButtonPress(btn))}
                            style={[styles.calculatorButton, btn === '=' && styles.resultButton]}
                        >
                            <ThemedText style={[styles.calculatorButtonText, btn === '=' && styles.resultButtonText]}>{btn}</ThemedText>
                        </reactNative.Pressable>
                    ))}
                    <reactNative.Pressable onPress={() => setExpression(deleteLastCharacter(expression))} style={styles.calculatorButton}>
                        <ThemedText style={styles.calculatorButtonText}>DEL</ThemedText>
                    </reactNative.Pressable>
                    <reactNative.Pressable onPress={handleClear} style={styles.calculatorButton}>
                        <ThemedText style={styles.calculatorButtonText}>C</ThemedText>
                    </reactNative.Pressable>
                    <reactNative.Pressable onPress={() => onClose(expression)} style={styles.calculatorButton}>
                        <ThemedText style={styles.calculatorButtonText}>Close</ThemedText>
                    </reactNative.Pressable>
                </ThemedView>
            </ThemedView>
        </reactNative.Modal>
    );
};
