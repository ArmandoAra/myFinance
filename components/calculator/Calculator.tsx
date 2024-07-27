// Calculator.tsx
import React, { useState } from 'react';
import "./styles.css";
import { Button } from '../ui/button';

interface CalculatorProps {
    onClose: () => void;
    onApply: (amount: number) => void;
    currentAmount: number;
}

const Calculator: React.FC<CalculatorProps> = ({ onClose, onApply, currentAmount }) => {
    const [expression, setExpression] = useState(currentAmount === 0 ? '' : currentAmount.toString());

    const handleButtonClick = (value: string) => {
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
            onClose();
        } catch {
            alert('Invalid Expression');
            handleClear();
        }
    };

    function eliminarUltimoCaracter(str: string) {
        if (str.length > 0) {
            return str.slice(0, -1);
        } else {
            return str;
        }
    }

    return (
        <div className="calculator-modal">
            <div className="calculator-display">
                <label title='value'><input type="text" className='text-right' value={expression} readOnly /></label>
            </div>
            <div className="calculator-buttons">
                {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (

                    <button key={btn} className={btn === "=" ? "result" : ""} onClick={() => (btn === '=' ? handleCalculate() : handleButtonClick(btn))}>
                        {btn}
                    </button>
                ))}
                <Button variant="destructive" onClick={() => setExpression(eliminarUltimoCaracter(expression))}>DEL</Button>
                <Button variant="secondary" onClick={handleClear}>C</Button>
                <Button variant="outline" onClick={onClose}>Close</Button>
            </div>
        </div>
    );
};

export default Calculator;
