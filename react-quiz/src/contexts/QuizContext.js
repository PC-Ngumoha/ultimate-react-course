import { createContext, useContext, useEffect, useReducer } from 'react';

const QuizContext = createContext();

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'data/received':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };

    case 'data/failed':
      return {
        ...state,
        status: 'error',
      };

    case 'quiz/start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };

    case 'quiz/answer':
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case 'quiz/nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case 'quiz/finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case 'quiz/restart':
      // return {
      //   ...state,
      //   status: 'ready',
      //   index: 0,
      //   answer: null,
      //   points: 0,
      //   highscore: 0,
      // };
      return {
        ...initialState,
        status: 'ready',
        questions: state.questions,
      };

    case 'timer/tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };

    default:
      throw new Error('Unknown action');
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((response) => response.json())
      .then((data) => dispatch({ type: 'data/received', payload: data }))
      .catch((_) => dispatch({ type: 'data/failed' }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
        numQuestions,
        maxPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error('QuizContext used outside scope of QuizProvider.');

  return context;
}

export { QuizProvider, useQuiz };
