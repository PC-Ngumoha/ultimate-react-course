function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome To The React Quiz !</h2>
      <h3>
        {numQuestions} questions designed to test your understanding of the
        React library.
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'quiz/start' })}
      >
        Let's start.
      </button>
    </div>
  );
}

export default StartScreen;
