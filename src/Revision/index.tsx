import React, { useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import useRevisor from './useRevisor';
import EditingActions from './EditingActions';
import styles from './styles.module.scss';
import Option from './Option';
import Loader from 'components/Loader';

export interface RevisionRouteParams {
    content_id: string
}

const Revision = ({match} : RouteComponentProps<RevisionRouteParams>) => {

    const content_id = match.params.content_id;
    const revisor = useRevisor(content_id);
    const pregunta = revisor.preguntas[revisor.index];
    const randomized_options = useMemo(() => [...(pregunta?.respuestas_erroneas || []), pregunta?.respuesta_correcta].sort(() => Math.random() - 0.5),[pregunta]);
    
    if (revisor.loading) return <Loader />;

    return (
        <>
            <div className={styles.Container}>
                <div className={styles.HeaderContainer}>
                    <Typography color="textPrimary" variant="h6">
                        {pregunta.titulo}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                        {pregunta.descripcion}
                    </Typography>
                </div>
                <div className={styles.OptionsContainer}>
                    {  randomized_options.map((option,index) => 
                            <Option 
                            key={index}
                            success={option === revisor.answer ? revisor.success : undefined}
                            selected={option === revisor.answer}
                            disabled={revisor.success !== undefined}
                            onSelect={() => revisor.setAnswer(option)}>
                                {option}
                            </Option>
                        )
                    }
                </div>
                <div className={styles.ButtonContainer}>
                    <Container maxWidth="sm">
                        <Button
                        fullWidth
                        variant="contained"
                        disabled={!Boolean(revisor.answer)}
                        disableElevation={!Boolean(revisor.answer)}
                        onClick={() => {
                            if (revisor.success === undefined) {
                                revisor.checkAnswer(pregunta);
                            } else {
                                revisor.nextQuestion();
                            }
                        }}
                        color="primary">
                            {revisor.success !== undefined ? 'Siguiente' : 'Revisar'}
                        </Button>
                    </Container>
                </div>
            </div>
            { process.env.REACT_APP_MODE === 'editor' && <EditingActions content_id={content_id}/> }
        </>
    );
}

export default Revision;