import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
    date: string;
    value: number;
}

interface ProgressChartProps {
    data: DataPoint[];
}

const ProgressChart = ({ data }: ProgressChartProps) => {
    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                        dy={10}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        cursor={{ stroke: '#6366f1', strokeWidth: 1 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#4F46E5"
                        fill="url(#colorValue)"
                        strokeWidth={2}
                    />
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProgressChart;
