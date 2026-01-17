const recipes = [
  {
    name: 'Classic Tomato Pasta',
    description:
      'A simple yet delicious pasta dish with fresh tomatoes, basil, and garlic. Perfect for a quick weeknight meal.',
    cookingTime: '25 min',
  },
  {
    name: 'Spicy Lentil Soup',
    description:
      'Hearty and warming lentil soup with a kick of chilli, rich spices, and fresh cilantro. Great for meal prep.',
    cookingTime: '40 min',
  },
  {
    name: 'Chicken and vegetable stir-fry',
    description:
      'Quick and healthy stir-fry packed with colorful vegetables and tender chicken, coated in a savory soy-ginger sauce.',
    cookingTime: '30 min',
  },
  {
    name: 'Creamy Mushroom Risotto',
    description:
      'Arborio rice cooked slowly with rich broth, earthy mushrooms, and Parmesan cheese, finished with a touch of cream.',
    cookingTime: '45 min',
  },
  {
    name: 'Overnight oats with berries',
    description:
      'Easy-to-prepare oats soaked overnight with milk, chia seeds, and topped with fresh mixed berries. A perfect grab-and-go breakfast.',
    cookingTime: '5 min prep (overnight soak)',
  },
  {
    name: 'Baked salmon with asparagus',
    description:
      'Flaky salmon fillets baked to perfection with tender asparagus, lemon and herbs. A light and healthy dinner option.',
    cookingTime: '20 min',
  },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <SearchArea />
      <RecipeArea />
      <FormAddNewRecipe />
    </div>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function Logo() {
  return (
    <section className="logo">
      <h1>Recipe Finder</h1>
    </section>
  );
}

function SearchArea() {
  return (
    <section className="search-area">
      <SearchBar />
      <Button>Search</Button>
    </section>
  );
}

function SearchBar() {
  return (
    <div className="search-bar">
      <svg
        width="16px"
        height="16px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <path
            d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{' '}
        </g>
      </svg>
      <input type="text" placeholder="Search for a recipe ..." />
    </div>
  );
}

function RecipeArea() {
  return (
    <section className="recipe-area">
      <h2>Available Recipes</h2>
      <div className="container">
        {recipes.map((recipe, idx) => (
          <div className="recipe-card" key={idx}>
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            <span>{recipe.cookingTime}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FormAddNewRecipe() {
  return (
    <form className="form-add-new-recipe">
      <h2>Add new recipe</h2>

      <div>
        <label>Recipe Name</label>
        <input type="text" placeholder="e.g Fufu & Egusi soup" />
      </div>

      <div>
        <label>Description</label>
        <textarea
          placeholder="List out ingredients or describe steps to prepare it..."
          rows={5}
        ></textarea>
      </div>

      <div>
        <label>Cooking time</label>
        <input type="text" placeholder="e.g 60 min" />
      </div>

      <Button>Add Recipe</Button>
    </form>
  );
}
