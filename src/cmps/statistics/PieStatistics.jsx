import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';


const data1 = [
    { label: 'Google', value: 2400, color: 'rgb(82, 176, 230)' },
    { label: 'Taboola', value: 4567, color: 'rgb(10 80 121 / 86%)' },
    { label: 'TikTok', value: 1398 ,color: 'rgb(106 158 189 / 73%)'},

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
            />
        </div>
    );
}