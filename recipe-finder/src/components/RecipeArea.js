export function RecipeArea({ recipes }) {
  return (
    <section className="recipe-area">
      <h2>Available Recipes</h2>
      <div className="container">
        {recipes.map((recipe, idx) => (
          <RecipeCard recipe={recipe} key={idx} />
        ))}
      </div>
    </section>
  );
}

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <h3>{recipe.name}</h3>
      <p>{recipe.description}</p>
      <span>{recipe.cookingTime}</span>
    </div>
  );
}
