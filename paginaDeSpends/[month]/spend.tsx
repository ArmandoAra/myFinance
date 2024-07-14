"use client"
import React, { useState, useEffect, useMemo, use } from 'react';
import SpendButtonDelete from '@/components/buttons/spend-button-delete';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SpendForm from './spend-form';

//styles
import "./styles.css";


interface Spends {
    id: number;
    monthId: number | null;
    service: string;
    amount: number;
    type: string;
    description: string | null;
    createdAt: Date;
}

interface SpendCardProps {
    spends: Spends[];
    year: string;
    month: string;
}

interface SpendEditProps {
    spend: {
        id: number;
        monthId: number | null;
        service: string;
        amount: number;
        type: string;
        description: string | null;
        createdAt: Date;
    };
    year: string;
    month: string;
}




const SpendCard: React.FC<SpendCardProps> = ({ spends, year, month }) => {
    const [selectedType, setSelectedType] = useState<string>('All');
    const [filteredSpends, setFilteredSpends] = useState<Spends[]>(spends);
    const [editSpend, setEditSpend] = useState<SpendEditProps | null>({
        spend: {
            id: 0,
            monthId: 0,
            service: '',
            amount: 0,
            type: '',
            description: '',
            createdAt: new Date(),
        },
        year,
        month,
    });

    useEffect(() => {
        if (!editSpend) {
            return;
        }
        setEditSpend(editSpend)
    }
        , [editSpend])



    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
    };

    useEffect(() => {
        if (selectedType === 'All') {
            setFilteredSpends(spends);
        } else {
            setFilteredSpends(spends.filter(spend => spend.type === selectedType));
        }
    }, [selectedType, spends]);


    const spendTypes = useMemo(() => {
        const types = new Set(spends.map(spend => spend.type));
        return Array.from(types).concat('All');
    }, [spends]);

    const formatDate = (date: Spends) => {
        const day = date.createdAt?.getDate();
        const month = date.createdAt?.getMonth() + 1;
        const year = date.createdAt?.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const calcTotalSpends = (spends: Spends[]) => {
        return spends.reduce((total, spend) => total + (spend.amount || 0), 0).toFixed(2);
    };

    const totalSpends = calcTotalSpends(filteredSpends);



    return (
        <section className='w-full xl:w-3/4 2xl:w-10/12 ' >
            <div className='flex flex-row w-full justify-center xl:justify-start mt-8 mb-3 gap-4'>
                <label htmlFor="sort"><h2 className='text-2xl'>Sort by: </h2></label>
                <select id="sort" className='w-2/4' value={selectedType} onChange={handleChange}>
                    {spendTypes.map((spendType, index) => (
                        <option className='text-xl w-14 text-end' key={index} value={spendType}>{spendType}</option>
                    ))}
                </select>
            </div>
            <div className='flex flex-col xl:flex-row gap-10' >

                <Table className='w-full flex flex-col sm:table'>
                    <TableHeader className='flex flex-col items-center w-full sm:table-row-group'>
                        <TableRow >
                            <TableHead>Spend</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="hidden sm:table-cell">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='flex flex-col items-center w-full sm:table-row-group'>
                        {filteredSpends.length !== 0 ? filteredSpends.map((spend, index) => (
                            <TableRow key={index} className=''>
                                <TableCell>{spend.service}</TableCell>
                                <TableCell>{formatDate(spend)}</TableCell>
                                <TableCell className='text-right'>{spend.amount} €</TableCell>
                                <TableCell><Badge>{spend.type}</Badge></TableCell>
                                <TableCell className='flex flex-row gap-4 justify-center md:align-baseline'>
                                    <Button onClick={() => setEditSpend({ year, month, spend })}>Edit</Button>
                                    {/* <Link href={`/year/${year}/${month}/${spend.id}/edit`}><Button>Edit</Button></Link> */}
                                    <SpendButtonDelete spendId={Number(spend.id)} year={year} month={month} />
                                </TableCell>
                            </TableRow>
                        )) :
                            <TableRow>
                                <TableCell colSpan={5} className='spendTableCell'>No spends</TableCell>
                            </TableRow>
                        }

                    </TableBody>
                    <TableFooter className='mt-4' >
                        <TableRow className='flex flex-row justify-center sm:table-row bg-red-900'>
                            <TableCell colSpan={2} >Total</TableCell>
                            <TableCell colSpan={3} >- {totalSpends} €</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
                <SpendForm spends={editSpend} />

            </div>


        </section>
    );
};

export default SpendCard;
