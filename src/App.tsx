
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Plus, Edit2, Trash2, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const DreamTeamFinanceApp = () => {
  const [incomes, setIncomes] = useState([
    { id: 1, name: 'Salario', amount: 2000 },
    { id: 2, name: 'Freelance', amount: 500 }
  ]);
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Vivienda', amount: 700 },
    { id: 2, category: 'Transporte', amount: 200 },
    { id: 3, category: 'Alimentación', amount: 300 },
    { id: 4, category: 'Otros Gastos', amount: 150 }
  ]);
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const available = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gradient-to-r from-orange-500 to-green-400 p-6 shadow-lg text-center">
        <h1 className="text-4xl font-bold text-black">DREAMTEAM</h1>
        <p className="text-black text-lg">Gestor de Finanzas Personales</p>
        <p className="text-black text-sm italic">by Otto N. Manrique</p>
      </header>
      <main className="p-6 space-y-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900 p-4 rounded-xl text-center shadow border border-gray-700">
            <h2 className="text-green-400 font-bold">Ingresos</h2>
            <p className="text-2xl">${totalIncome}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-xl text-center shadow border border-gray-700">
            <h2 className="text-red-400 font-bold">Gastos</h2>
            <p className="text-2xl">${totalExpenses}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-xl text-center shadow border border-gray-700">
            <h2 className="text-blue-400 font-bold">Disponible</h2>
            <p className="text-2xl">${available}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DreamTeamFinanceApp;
