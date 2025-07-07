
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
        <p className="text-center text-gray-400">Aquí irá toda la interfaz interactiva que tenías en Claude, lista para reinsertar</p>
        {/* Aquí puedes seguir agregando los componentes de tarjetas, gráficos, formularios como los tenías */}
      </main>
      <footer className="text-center py-6 text-gray-400">
        <p>© 2025 DREAMTEAM - Finanzas Personales</p>
      </footer>
    </div>
  );
};

export default DreamTeamFinanceApp;
