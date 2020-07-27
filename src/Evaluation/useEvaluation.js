import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useEvaluation = (id,book) => {

    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([]);
    const [problem, setProblem] = useState({});
    const [index, setIndex] = useState(0);
    const [error, setError] = useState();
    const [wrong_answers, setWrongAnswers] = useState(0);
    const [done, setDone] = useState(0);

    useEffect(() => {
        const problems = book.find(content => content.id === id).evaluacion.map(question => ({...question, id: uuidv4(), done: false})).sort(() => Math.random() - 0.5);
        setProblems(problems);
        setIndex(0);
        setProblem(problems[0]);
        setLoading(false);
    },[book,id]);

    useEffect(() => {
        if (index === problems.length) {
            window.localStorage.setItem(id,answers.reduce((total,value) => total + value,0)/problems.length);
        }
    },[index]);

    function checkAnswer(problem_id,answer) {
        const correct_answer = problem.opciones.find(option => option.correcta).valor;
        if (correct_answer === answer) {
            setProblems(problems => 
                problems.map(problem => 
                    problem.id === problem_id ? {...problem, done: true} : problem
                )
            );
            setIndex(index + 1);
            setProblem(problems[index + 1]);
            setError();
            setDone((index + 1)/problems.length);
            if (answers[index] === undefined) {
                setAnswers([...answers, true]);
            }
        } else {
            if (answers[index] === undefined) {
                setAnswers([...answers, false]);
            }
            setError("Respuesta incorrecta");
        }
    }

    return { problems, checkAnswer, loading, problem, error, answers, done };
}

export default useEvaluation;