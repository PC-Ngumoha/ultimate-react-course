import { useState } from 'react';

const initialExpenses = [
  { description: 'Weekly groceries', category: 'food', amount: 2000 },
  { description: 'Monthly bus pass', category: 'transport', amount: 15000 },
  { description: 'Electricity bill', category: 'utilities', amount: 30000 },
  { description: 'Dinner with friends', category: 'food', amount: 3000 },
  {
    description: 'Netflix subscription',
    category: 'entertainment',
    amount: 3000,
  },
  { description: 'Apartment rent', category: 'Rent', amount: 500000 },
];

export default function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const totalExpense = expenses.reduce((acc, cur) => acc + cur.amount, 0);

  // console.log(totalExpense);

  function handleAddExpense(newExpense) {
    setExpenses((expenses) => [...expenses, newExpense]);
  }

  return (
    <main className="app">
      <Navbar />
      <div className="container">
        <Dashboard totalExpense={totalExpense} />
        <FormAddNewExpense onAddExpense={handleAddExpense} />
        <ExpenseList expenses={expenses} />
      </div>
    </main>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <span>Expense Tracker</span>
    </nav>
  );
}

function Dashboard({ totalExpense }) {
  return (
    <article className="dashboard">
      <span>Total expenses</span>
      <h1>₦{totalExpense.toFixed(2)}</h1>
    </article>
  );
}

function FormAddNewExpense({ onAddExpense }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!description || !amount || !category) return;

    const newExpense = { description, amount, category };
    // console.log(newExpense);
    onAddExpense(newExpense);

    setDescription('');
    setAmount('');
    setCategory('');
  }

  return (
    <form className="form-add-new-expense" onSubmit={handleSubmit}>
      <h2>add new expense</h2>

      <div className="input-field">
        <label>Description</label>
        <input
          type="text"
          placeholder="E.g Coffee, Movie tickets..."
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
      </div>

      <div className="input-field">
        <label>Amount</label>
        <input
          type="text"
          placeholder="E.g 2000"
          value={amount}
          onChange={(evt) => setAmount(Number(evt.target.value))}
        />
      </div>

      <div className="input-field">
        <label>Category</label>
        <select
          value={category}
          onChange={(evt) => setCategory(evt.target.value)}
        >
          <option value="food">Food</option>
          <option value="utilities">Utilities</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
          <option value="rent">Rent</option>
          <option value="misc">Miscellaneous</option>
        </select>
      </div>

      <button>add expense</button>
    </form>
  );
}

function ExpenseList({ expenses }) {
  return (
    <section className="expense-list">
      <h2>recent expenses</h2>
      {expenses.map((expense, idx) => (
        <ExpenseCard expense={expense} key={idx} />
      ))}
    </section>
  );
}

function ExpenseCard({ expense }) {
  return (
    <div className="expense-card">
      <span>{expense.description}</span>
      <span>{expense.category}</span>
      <span>₦{expense.amount}</span>
    </div>
  );
}
