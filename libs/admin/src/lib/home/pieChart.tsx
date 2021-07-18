import React, { useCallback, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#6fbf73', '#d7e360', '#ff784e', '#33ab9f'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function App({ members, projects, admins, meetings }) {
  const data = [
    { name: 'Group A', value: members },
    { name: 'Group B', value: admins },
    { name: 'Group C', value: projects },
    { name: 'Group D', value: meetings },
  ];
  return (
    <PieChart width={400} height={280}>
      <Pie
        data={data}
        cx={200}
        cy={130}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={130}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
