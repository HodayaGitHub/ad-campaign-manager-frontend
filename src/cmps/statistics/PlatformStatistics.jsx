import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export function PlatformStatistics() {

    return (

        <div className='statistics-item'>
            <BarChart
                xAxis={[{
                    scaleType: 'band',
                    data: ['Google', 'Taboola', 'TikTok'],
                }]}
                series={[
                    { data: [4, 3, 5], color: ['#194dd2d9'] }, // Custom colors for the first series
                    { data: [1, 6, 3], color: ['#5db4cbd1'] }, // Custom colors for the second series
                    { data: [2, 5, 6], color: ['#2d796dad'] } // Custom colors for the third series
                ]}
                width={400}
                height={300}
            />
        </div>

    );
}
