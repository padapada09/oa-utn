import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import styles from './styles.module.scss';
import Option from './Option';
import { blue, red } from 'colors';
import { Loader } from 'components';
import useRevisor from './useRevisor';

export interface RevisionRouteParams {
    content_id: string
};

const Revision = ({match: {params: {content_id}}} : RouteComponentProps<RevisionRouteParams>) => {

    const revisor = useRevisor(content_id);
  
    if (revisor.loading) return <Loader />;
    if (revisor.pregunta === undefined) return <div>Parece que tuvimos un error</div>;
    

    return (
        <Container
        maxWidth="sm"
        className={'MobileContainer'}
        data-testid="container">
            <div className={styles.Container}>
                <Typography color="textPrimary" variant="h6">
                    {revisor.pregunta.titulo}
                </Typography>
                <Typography color="textSecondary" variant="body1">
                    {revisor.pregunta.descripcion}
                </Typography>
                <div className={styles.OptionsContainer}>
                    {   revisor.pregunta.respuestas.map(answer => 
                            <Option 
                            key={answer.id}
                            selected={revisor.selected === answer.id}
                            disabled={revisor.confirmed}
                            onSelect={() => revisor.select(answer.id)}>
                                {answer.descripcion}
                            </Option>
                        )
                    }
                </div>
                <Typography style={{
                    position: 'relative',
                    textAlign: 'center',
                    bottom: 100,
                    color: blue,
                    width: window.innerWidth - 40
                }}>
                    {   revisor.confirmed && revisor.pregunta.respuestas.find(({id}) => id === revisor.selected)?.feedback}
                </Typography>
                <div className={styles.ButtonContainer}>
                     <Container maxWidth="sm">
                        <Button
                        fullWidth
                        variant="contained"
                        onClick={revisor.confirmed ? revisor.next : revisor.confirm}
                        color="primary">
                            {revisor.confirmed ? `Siguiente` : `Confirmar`}
                        </Button>
                    </Container>
                </div>
            </div>
        </Container>
    );
};

export default Revision;