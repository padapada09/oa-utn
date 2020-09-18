import { useState, useEffect } from 'react';
import { Question } from 'Types';
import { get } from 'Services';

const useQuestions = (content_id: string) : [Question[], () => void] => {

    const [questions, setQuestions] = useState<Question[]>([]);

    async function reloadQuestions(){
        const current_lvl = localStorage.getItem(content_id) || '0';
        const response = await get<Question[]>(`/questions/get/${content_id}/${current_lvl}`);
        if (!response.success) {
            throw Error(`Error al cargar las preguntas: ${response.error}`);
        }
        setQuestions(response.data);
    };

    useEffect(() => {
        reloadQuestions();
    },[]);

    return [questions, reloadQuestions];
};

export default useQuestions;