import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';


const data1 = [
    { label: 'Group A', value: 2400 },
    { label: 'Group B', value: 4567 },
    { label: 'Group C', value: 1398 },
    { label: 'Group D', value: 9800 },
    { label: 'Group E', value: 3908 },
    { label: 'Group F', value: 4800 },
];

export function PieStatistics() {

    return (
        <div className='statistics-item' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <PieChart
                series={[
                    {
                        data: data1,
                        innerRadius: 40,
                        outerRadius: 80,
                    },
                ]}
                height={250}
                width={300}
                // slotProps={{
                //     legend: { hidden: true },
                // }}
            />
        </div>
    );
}