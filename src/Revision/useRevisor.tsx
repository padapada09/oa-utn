import { useState, useEffect } from 'react';
import { Question } from 'Types';
import { useHistory, useLocation } from 'react-router-dom';

interface Revisor {
    setAnswer: (answer: string) => any,
    checkAnswer: (pregunta : Question) => void,
    nextQuestion: () => void,
    answer: string,
    loading: boolean,
    preguntas: Question[],
    index: number,
    success: boolean | undefined,
    progress: number
}

const useRevisor = (content_id: string): Revisor => {
    
    const [preguntas, setPreguntas] = useState<Question[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [max_score, setMaxScore] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [success, setSuccess] = useState<boolean | undefined>();
    const [answer, setAnswer] = useState('');
    const [index, setIndex] = useState(0);
    const progress = index/preguntas.length;
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        setLoading(true);

        async function setUpRevison() {
            setLoading(true);
            const questions_response = await fetch(`${process.env.REACT_APP_SERVER_URL}/questions/getAll/${content_id}/${localStorage.getItem(content_id) || 0}`);
            const questions = (await questions_response.json()) as Question[];
            if (questions.length) {
                setPreguntas(questions);
    
                const max_score_response = await fetch(`${process.env.REACT_APP_SERVER_URL}/contents/getMaxScore/${content_id}`);
                const max_score = parseFloat(await max_score_response.text());
                setMaxScore(max_score);

                setLoading(false);
            } else {
                //If there are no questions, take the user to no_revision page
                history.replace(`${location.pathname}/no_revision`);
            }
        };

        try {
            setUpRevison();
        } catch (err) {
            console.error(err);
        }

    },[content_id,history,location]);

    function nextQuestion() {
        if (index === preguntas.length - 1) {
            const prev_score = parseFloat(localStorage.getItem(content_id) || '0');
            history.replace(`${location.pathname}/result/${(prev_score+(score/max_score))/2}`);
            localStorage.setItem(content_id,`${(prev_score+(score/max_score))/2}`);
        } else {
            setSuccess(undefined);
            setAnswer('');
            setTimeout(() => setIndex(current_index => current_index + 1),250);
        }
    }

    function checkAnswer (pregunta : Question) : void {
        if (pregunta?.respuesta_correcta === answer) {
            //Right answer given
            const new_score = score + pregunta.dificultad;
            setScore(new_score);
            setSuccess(true);
        } else {
            //Wrong answer given
            setSuccess(false);
        }
    }

    return { 
        index, 
        preguntas, 
        loading, 
        answer,
        success,
        progress,
        setAnswer, 
        checkAnswer,
        nextQuestion
    };
};

export default useRevisor;