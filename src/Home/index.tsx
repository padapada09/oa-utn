import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Loader from 'components/Loader';
import useBooks from 'Hooks/useBooks';

const Home = () => {

    const [books, loading_books] = useBooks();
    const history = useHistory();

    if (loading_books) return <Loader />

    return (
        <Container 
        maxWidth="sm" 
        className={'MobileContainer'} 
        data-testid="container">
            {   books.map(book => 
                    <Card key={book.id} style={{marginTop: 15}} data-testid="book">
                        <CardActionArea onClick={() => history.push(book.id)}>
                            <CardHeader
                                title={book.titulo}
                            />
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {book.descripcion}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
            }
        </Container>
    );
}

export default Home;