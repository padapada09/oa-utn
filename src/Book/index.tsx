import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styles from './styles.module.scss';
import Estrella from './Estrella';
import Loader from 'components/Loader';
import { useContents } from 'Hooks';
import { dependenciesResolved } from 'Helpers';

export interface BookRouteParams { 
    book_id: string
};

const Book = ({match, history, location} : RouteComponentProps<BookRouteParams>) => {

    const [contents, loading_contents] = useContents(match.params.book_id);

    if (loading_contents) return <Loader />;

    return (
        <Container 
        maxWidth="sm" 
        className={'MobileContainer'} 
        data-testid="container">
            {
                contents.map(content => 
                    <Card 
                    data-testid="content"
                    key={content.id} 
                    style={{marginTop: 15, backgroundColor: dependenciesResolved(content) ? 'white' : 'lightgray'}}>
                        <CardActionArea onClick={() => history.push(`${location.pathname}/${content.id}`)}>
                            <div className={styles.Points}>
                                <Estrella 
                                    filled={Boolean(localStorage.getItem(content.id))}
                                    color_value={parseFloat(localStorage.getItem(content.id) || '0')}
                                />
                            </div>
                            <CardHeader 
                                title={content.titulo}
                            />
                            <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                    {content.descripcion}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
            }
            <div style={{height: 15}}/>
        </Container>
    );
}

export default Book;