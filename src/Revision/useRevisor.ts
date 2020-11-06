import { useAsyncEffect } from "Hooks";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { get } from "Services";
import { Question } from "Types";

interface Revisor {
    preguntas : Question[];
    pregunta?: Question;
    loading: boolean;
    selected: string;
    confirmed: boolean;

    select: (id: string) => void;
    confirm: () => void;
    next: () => void;
};

const useRevisor = (content_id : string) : Revisor => {
    const [preguntas, setPreguntas] = useState<Question[]>([]);
    const [pregunta, setPregunta] = useState<Question | undefined>();
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<string>(``);
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [scores, setScores] = useState<number[]>([]);
    const [maxScore, setMaxScore] = useState<number>(1);
    const history = useHistory();
    const location = useLocation();

    useAsyncEffect(async () => {
        const response = await get<Question[]>(`/questions/get/${content_id}/${window.localStorage.getItem(content_id) || 0}`);
        const max_score_response = await fetch(`${process.env.REACT_APP_SERVER_URL}/contents/getMaxScore/${content_id}`);
        const max_score = parseFloat(await max_score_response.text());
        if (response.success && response.data.length) {
            setPreguntas(response.data);
            setLoading(false);
            setPregunta(response.data[0]);
            setMaxScore(max_score);
        } else {
            history.replace(`${location.pathname}/no_revision`);
        };
    },[]);

    function select(id: string) {
        setSelected(id);
    };

    function confirm() {
        setConfirmed(true);
        setScores(prev => [...prev, (pregunta?.respuestas.find(({id}) => id === selected)?.valoracion || 0) * (pregunta?.dificultad || 0)]);
    };

    function next() {
        const nextQuestion = preguntas[preguntas.findIndex(({id}) => id === pregunta?.id)+1];
        if (nextQuestion) {
            setPregunta(preguntas[preguntas.findIndex(({id}) => id === pregunta?.id)+1]);
            setConfirmed(false);
            setSelected(``);
        } else {
            const newScore = scores.reduce((score, total) => total + score,0)/maxScore;
            const prevScore = parseFloat(window.localStorage.getItem(content_id) || "0");
            history.push(`${location.pathname}/result/${(newScore + prevScore)/2}`);
            window.localStorage.setItem(content_id,String((newScore+prevScore)/2));
        }
    };

    return {preguntas, pregunta, loading, selected, select, confirmed, confirm, next};
};

export default useRevisor;