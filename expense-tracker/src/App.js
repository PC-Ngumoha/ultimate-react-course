const initialExpenses = [
  { description: 'Weekly groceries', category: 'food', amount: '2000' },
  { description: 'Monthly bus pass', category: 'transport', amount: '15000' },
  { description: 'Electricity bill', category: 'utilities', amount: '30000' },
  { description: 'Dinner with friends', category: 'food', amount: '3000' },
  {
    description: 'Netflix subscription',
    category: 'entertainment',
    amount: '3000',
  },
  { description: 'Apartment rent', category: 'Rent', amount: '500000' },
];

export default function App() {
  return (
    <main className="app">
      <Navbar />
      <div className="container">
        <Dashboard />
        <FormAddNewExpense />
        <ExpenseList />
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

function Dashboard() {
  return (
    <article className="dashboard">
      <span>Total expenses</span>
      <h1>₦100000.00</h1>
    </article>
  );
}

function FormAddNewExpense() {
  return (
    <form className="form-add-new-expense">
      <h2>add new expense</h2>

      <div className="input-field">
        <label>Description</label>
        <input type="text" placeholder="E.g Coffee, Movie tickets..." />
      </div>

      <div className="input-field">
        <label>Amount</label>
        <input type="text" placeholder="E.g 2000" />
      </div>

      <div className="input-field">
        <label>Category</label>
        <select>
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

function ExpenseList() {
  return (
    <section>
      {initialExpenses.map((expense, idx) => (
        <ExpenseCard expense={expense} key={idx} />
      ))}
    </section>
  );
}

function ExpenseCard({ expense }) {
  return <div>{expense.description}</div>;
}
