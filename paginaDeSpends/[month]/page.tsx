
import { createIncome } from '@/actions/income-actions';
import { IncomeForm } from './income-form';
import { getSpends } from '@/actions/spend-actions';

//styles
import "./styles.css";

// utils
import SpendCard from './spend';
import { capitalize } from '@/components/utils/text';

interface Spends {
    id: number;
    monthId: number;
    service: string;
    amount: number;
    type: string;
    description: string;
    createdAt: Date;
}


export default async function Month({ params }: { params: { month: string, year: string } }) {
    const year = params.year;
    const month = params.month;

    createIncome({ year, month })
    const spends = await getSpends({ year, month })

    async function calcAllSpends(spends: Spends[]) {
        let result = 0;

        spends.map((spend) => {
            result += spend.amount || 0;
        })

        return parseFloat(result.toFixed(2));
    }

    const totalSpends = await calcAllSpends(spends as Spends[])

    return (
        <section className="flex flex-col gap-4 mt-36 w-full items-center">
            <h1 className='text-7xl font-medium my-5 text-center'>{capitalize(params.month)} {params.year}</h1>
            <div className='flex flex-col xl:flex-row gap-x-6 w-11/12 justify-center mb-10'>
                <IncomeForm year={params.year} month={params.month} totalSpends={totalSpends} />
                <SpendCard spends={spends as Spends[]} year={year} month={month} />
            </div>

        </section>
    )
}

