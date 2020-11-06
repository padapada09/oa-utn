import { Console } from "console";
import { get, post } from "Services";
import { Answer, Question } from "Types";

class Revisor {
    private content_id : string;
    private lvl : number;
    private preguntas: Question[] = [];
    public pregunta?: Question;
    private index: number = 0;
    private scores: number[] = [];

    constructor(content_id : string){
        this.content_id = content_id;
        this.lvl = parseFloat(window.localStorage.getItem(content_id) || "0");
        this.loadQuestions();
    };

    private async loadQuestions() {
        const response = await get<Question[]>(`/questions/get/${this.content_id}/${this.lvl}`);
        if (response.success) {
            this.preguntas = response.data;
            this.pregunta = response.data[this.index++];
        } else {
            console.error(`Tuvimos un problema cargando las preguntas en el revisor. ${response.error}`);
        }
    }

    public answer(answer: Answer) {
        if (this.pregunta === undefined) {
            console.error(`Todavía no hay preguntas cargadas`);
        } else {
            this.scores.push(answer.valoracion);
            this.pregunta = this.preguntas[this.index++];
        };
    };
};

export default Revisor;