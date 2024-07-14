"use server"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import TotalCard from "@/components/cards/total"
//Actions
import { getIncomeData, updateIncome } from "@/actions/income-actions"

//Styles
import "./styles.css"


export async function IncomeForm({ year, month, totalSpends }: { year: string, month: string, totalSpends: number }) {

    const monthIncome = await getIncomeData(year, month)

    const show = "block"

    return (
        <div className="flex flex-col w-4/5 sm:w-2/4 m-auto xl:m-0 xl:w-2/5 2xl:w-1/3">
            <TotalCard brutIncome={monthIncome?.brutIncome || 0} totalSpends={totalSpends} year={year} month={month} />
            <form id="form" className="flex flex-roww-2/12" action={updateIncome}>
                <input type="hidden" name="id" value={monthIncome?.id} />
                <input type="hidden" name="currentYear" value={year} />
                <input type="hidden" name="currentMonth" value={month} />
                <Card className="w-full mt-3 p-3 ">
                    <CardContent>
                        <div className="grid w-full items-center gap-4 ">
                            <div className="flex flex-col space-y-1.5 gap-3">
                                <Label htmlFor="name">Income</Label>
                                <Input name="brutIncome" id="brutIncome" className="text-right pr-2 appearance-none"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    required
                                    defaultValue={monthIncome?.brutIncome || 0} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit" className="block">Update Income</Button>
                    </CardFooter>
                </Card>

            </form>

        </div >
    )

}
