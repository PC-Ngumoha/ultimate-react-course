import { useState } from 'react';
import { Button } from './Button';

export function FormAddNewRecipe({ onAddNewRecipe }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cookingTime, setCookingTime] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!name || !description || !cookingTime) return;

    const newRecipe = { name, description, cookingTime };
    onAddNewRecipe(newRecipe);

    setName('');
    setDescription('');
    setCookingTime('');
  }

  return (
    <form className="form-add-new-recipe" onSubmit={handleSubmit}>
      <h2>Add new recipe</h2>

      <div>
        <label>Recipe Name</label>
        <input
          type="text"
          placeholder="e.g Fufu & Egusi soup"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          placeholder="List out ingredients or describe steps to prepare it..."
          rows={5}
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        ></textarea>
      </div>

      <div>
        <label>Cooking time</label>
        <input
          type="text"
          placeholder="e.g 60 min"
          value={cookingTime}
          onChange={(evt) => setCookingTime(evt.target.value)}
        />
      </div>

      <Button>Add Recipe</Button>
    </form>
  );
}
