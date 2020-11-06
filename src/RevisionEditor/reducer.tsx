import { Question, Answer } from "Types";

interface Action {
    type: "setTitle" 
        | "setDescription"
        | "addAnswer" 
        | "removeAnswer"
        | "setAnswer"
        | "selectQuestion"
        | "setDificulty",
    payload?: string | Answer | number | Question,
    index?: number
};

function reducer (question : Question | undefined = undefined, {type, payload, index} : Action) : Question | undefined {

    switch (type) {
        case "setTitle": 
            return {
                ...question, 
                titulo: payload as string
            } as Question;
        case "setDescription": 
            return {
                ...question, 
                descripcion: payload as string
            } as Question;
        case "addAnswer": 
            const new_answer : Partial<Answer> = {
                descripcion: "",
                valoracion: 0,
                feedback: ""
            };
            return {
                ...question, 
                respuestas: [...(question as Question).respuestas, new_answer]
            } as Question;
        case "removeAnswer": 
            return {
                ...question, 
                respuestas: (question as Question).respuestas.filter((_,i) => i !== index as number)
            } as Question;
        case "setAnswer":
            return {
                ...question,
                respuestas: (question as Question).respuestas.map((respuesta,i) => {
                    if (i !== index as number) return respuesta;
                    else return {...(payload as Answer)};
                })
            } as Question;
        case "setDificulty":
            return {
                ...question,
                dificultad: payload === '' ? undefined : parseInt(payload as string)
            } as Question;
        case "selectQuestion": return payload as Question
        default: return question as Question;
    }
};

export default reducer;