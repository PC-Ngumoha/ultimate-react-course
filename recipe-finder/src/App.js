import { useState } from 'react';
import { Logo } from './components/Logo';
import { SearchArea } from './components/SearchArea';
import { RecipeArea } from './components/RecipeArea';
import { FormAddNewRecipe } from './components/FormAddNewRecipe';

const initialRecipes = [
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
  const [recipes, setRecipes] = useState(initialRecipes);
  const [search, setSearch] = useState('');
  const filteredRecipes =
    search === ''
      ? recipes
      : recipes.filter((recipe) =>
          recipe.name.toLocaleLowerCase().includes(search)
        );

  function handleAddNewRecipe(newRecipe) {
    setRecipes((curr) => [...curr, newRecipe]);
  }

  function handleSearch(value) {
    setSearch(value);
  }

  return (
    <div className="app">
      <Logo />
      <SearchArea search={search} onSearch={handleSearch} />
      <RecipeArea recipes={filteredRecipes} />
      <FormAddNewRecipe onAddNewRecipe={handleAddNewRecipe} />
    </div>
  );
}
