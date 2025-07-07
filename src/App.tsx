
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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
  const [categories, setCategories] = useState([
    'Vivienda', 'Transporte', 'Alimentación', 'Otros Gastos'
  ]);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [incomeForm, setIncomeForm] = useState({ name: '', amount: '' });
  const [expenseForm, setExpenseForm] = useState({ category: '', amount: '' });
  const [newCategory, setNewCategory] = useState('');

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const available = totalIncome - totalExpenses;

  const expensesByCategory = categories.map(category => {
    const categoryExpenses = expenses.filter(expense => expense.category === category);
    const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return { name: category, value: total };
  }).filter(item => item.value > 0);

  const COLORS = ['#FF6B35', '#32CD32', '#FFD700', '#FF69B4', '#00CED1', '#FF4500', '#9370DB'];
  const handleAddIncome = () => {
    if (incomeForm.name && incomeForm.amount) {
      const newIncome = {
        id: Date.now(),
        name: incomeForm.name,
        amount: parseFloat(incomeForm.amount)
      };
      setIncomes([...incomes, newIncome]);
      setIncomeForm({ name: '', amount: '' });
      setShowIncomeForm(false);
    }
  };

  const handleEditIncome = (income) => {
    setEditingIncome(income.id);
    setIncomeForm({ name: income.name, amount: income.amount.toString() });
    setShowIncomeForm(true);
  };

  const handleUpdateIncome = () => {
    if (incomeForm.name && incomeForm.amount) {
      setIncomes(incomes.map(income =>
        income.id === editingIncome
          ? { ...income, name: incomeForm.name, amount: parseFloat(incomeForm.amount) }
          : income
      ));
      setIncomeForm({ name: '', amount: '' });
      setShowIncomeForm(false);
      setEditingIncome(null);
    }
  };

  const handleDeleteIncome = (id) => {
    setIncomes(incomes.filter(income => income.id !== id));
  };

  const handleAddExpense = () => {
    if (expenseForm.category && expenseForm.amount) {
      const newExpense = {
        id: Date.now(),
        category: expenseForm.category,
        amount: parseFloat(expenseForm.amount)
      };
      setExpenses([...expenses, newExpense]);
      setExpenseForm({ category: '', amount: '' });
      setShowExpenseForm(false);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense.id);
    setExpenseForm({ category: expense.category, amount: expense.amount.toString() });
    setShowExpenseForm(true);
  };

  const handleUpdateExpense = () => {
    if (expenseForm.category && expenseForm.amount) {
      setExpenses(expenses.map(expense =>
        expense.id === editingExpense
          ? { ...expense, category: expenseForm.category, amount: parseFloat(expenseForm.amount) }
          : expense
      ));
      setExpenseForm({ category: '', amount: '' });
      setShowExpenseForm(false);
      setEditingExpense(null);
    }
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
      setShowCategoryForm(false);
    }
  };
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gradient-to-r from-orange-500 to-green-400 p-6 shadow-lg">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-black">DREAMTEAM FINANCE APP</h1>
          <p className="text-black text-lg mt-2 italic">by Otto N. Manrique</p>
        </div>
      </header>
      <main className="p-6 max-w-6xl mx-auto">
  {/* Tarjetas de Resumen */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
    <StatCard title="Ingresos Totales" value={totalIncome} icon={TrendingUp} color="text-green-400" bgColor="bg-gray-900" />
    <StatCard title="Gastos Totales" value={totalExpenses} icon={TrendingDown} color="text-red-400" bgColor="bg-gray-900" />
    <StatCard title="Disponible" value={available} icon={Wallet} color={available >= 0 ? "text-green-400" : "text-red-400"} bgColor="bg-gray-900" />
  </div>

  {/* Gráficos */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
    {/* Gráfico de Gastos por Categoría */}
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border-2 border-gray-800">
      <h3 className="text-xl font-bold mb-4 text-center text-orange-400">Gastos por Categoría</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={expensesByCategory}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {expensesByCategory.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* Gráfico de Barras Comparativo */}
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border-2 border-gray-800">
      <h3 className="text-xl font-bold mb-4 text-center text-green-400">Resumen Financiero</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={[
            { name: 'Ingresos', value: totalIncome, fill: '#32CD32' },
            { name: 'Gastos', value: totalExpenses, fill: '#FF6B35' },
            { name: 'Disponible', value: available, fill: available >= 0 ? '#32CD32' : '#FF0000' }
          ]}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
</main>
      <footer className="text-center py-6 text-gray-400">
        <p>© 2025 DREAMTEAM - Finanzas Personales</p>
      </footer>
    </div>
  );
};

export default DreamTeamFinanceApp;
