"use client";
import React, { useEffect, useState } from 'react';
import { createSpend, updateSpend } from '@/actions/spend-actions';
import { Button } from '@/components/ui/button';
import Calculator from '@/components/calculator/Calculator';

// Styles
import './styles.css';
import { capitalize } from '@/components/utils/text';

interface Spend {
    id: number;
    service: string;
    amount: number;
    type: string;
    description: string | null;
    createdAt: Date;
}

interface SpendCardProps {
    spend: Spend;
    year: string;
    month: string;
}

interface SpendFormProps {
    spends: SpendCardProps | null;
}

export default function SpendForm({ spends }: SpendFormProps) {
    const [data, setData] = useState<SpendCardProps>({
        spend: {
            id: 0,
            service: '',
            amount: 0,
            type: '',
            description: '',
            createdAt: new Date(),
        },
        year: '',
        month: '',
    });

    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false); // Estado para gestionar la calculadora

    useEffect(() => {
        if (spends) {
            setData({
                ...spends,
                spend: {
                    ...spends.spend,
                    createdAt: new Date(spends.spend.createdAt),
                },
            });
        }
    }, [spends, spends?.spend.id]);

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'createdAt') {
            setData((prevData) => ({
                ...prevData,
                spend: {
                    ...prevData.spend,
                    [name]: new Date(value),
                },
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                spend: {
                    ...prevData.spend,
                    [name]: value,
                },
            }));
        }
    };

    const handleCalculatorApply = (amount: number) => {
        setData((prevData) => ({
            ...prevData,
            spend: {
                ...prevData.spend,
                amount,
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', data.spend.id.toString());
        formData.append('service', data.spend.service);
        formData.append('amount', data.spend.amount.toString());
        formData.append('type', data.spend.type);
        formData.append('description', data.spend.description || '');
        formData.append('createdAt', data.spend.createdAt.toISOString());
        formData.append('year', data.year);
        formData.append('month', data.month);

        if (data.spend.id === 0) {
            await createSpend(formData);
        } else {
            await updateSpend(formData);
        }

        setData({
            spend: {
                id: 0,
                service: '',
                amount: 0,
                type: '',
                description: '',
                createdAt: new Date(),
            },
            year: formData.get('year') as string,
            month: formData.get('month') as string,
        });
    };

    return (<section className='bg-slate-600 my-3 p-3 rounded-md'>
        <form id="form" className="flex flex-col w-11/12 md:w-2/4 xl:w-72 2xl:w-96 mt-10 m-auto xl:m-0 mb-7" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <label htmlFor="service" className="flex flex-row justify-between gap-3">
                    Service
                    <input
                        className="text-right pr-2"
                        type="text"
                        name="service"
                        onChange={handleChanges}
                        value={data.spend.service}
                    />
                </label>
                <label htmlFor="amount" className="flex flex-row justify-between gap-3">
                    Amount
                    <div className="flex flex-row gap-2">
                        <input
                            className="text-right pr-2 appearance-none"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            required
                            name="amount"
                            onChange={handleChanges}
                            value={data.spend.amount ? data.spend.amount : ''}
                        />
                    </div>
                </label>
                <label htmlFor="type" className="flex flex-row justify-between gap-3">
                    Type
                    <input
                        className="text-right pr-2"
                        type="text"
                        name="type"
                        onChange={handleChanges}
                        value={capitalize(data.spend.type)}
                    />
                </label>
                <label htmlFor="description" className="flex flex-row justify-between gap-3">
                    Description
                    <textarea
                        id="multiline-text"
                        name="description"
                        rows={5}
                        cols={50}
                        onChange={handleChanges}
                        value={data.spend.description || ''}
                    ></textarea>
                </label>
                <label htmlFor="date" className="flex flex-row justify-between">
                    Date
                    <input
                        type="date"
                        name="createdAt"
                        onChange={handleChanges}
                        value={data.spend.createdAt.toISOString().split('T')[0]}
                    />
                </label>
                <input type="hidden" name="id" value={data.spend.id} onChange={handleChanges} />
                <input type="hidden" name="year" value={data.year} onChange={handleChanges} />
                <input type="hidden" name="month" value={data.month} onChange={handleChanges} />
                <Button type="submit" className='bg-green-600'>{data.spend.id !== 0 ? "Update Spends" : "Add Spend"}</Button>
                <Button type="button" variant="destructive" onClick={() => setData({
                    spend: {
                        id: 0,
                        service: '',
                        amount: 0,
                        type: '',
                        description: '',
                        createdAt: new Date(),
                    },
                    year: data.year,
                    month: data.month,
                })}>Clear</Button>
            </div>
        </form>
        {isCalculatorOpen && <Calculator currentAmount={data.spend.amount || 0} onClose={() => setIsCalculatorOpen(false)} onApply={handleCalculatorApply} />}
        <Button type="button" className='flex w-11/12 md:w-2/4 xl:w-72 2xl:w-96 m-auto mt-2 bg-blue-400' onClick={() => setIsCalculatorOpen(true)}>Calc</Button>
    </section>)
}
