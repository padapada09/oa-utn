import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
//import Navbar from '../Navbar';
//import LoadingScreen from '../LoadingScreen';
//import Block from '../Block';
//import Controller from '../Controller';
// import styles from './styles.module.scss';
//import useBlocks from './useBlocks';
//import getComponentAmount from './getComponentAmount';
import scrollIntoView from 'scroll-into-view';

const Viewer = ({book}) => {

    const history = useHistory();
    // const blocks = useBlocks(book);
    // const [loaded_components, setLoadedComponents] = useState(0);
    // const number_of_components = useMemo(() => getComponentAmount(blocks),[blocks]);

    // useEffect(() => {
    //     if (!book) history.goBack();
    // },[book,history]);

    useEffect(() => {
        window.onkeydown = (event) => {
            if (event.keyCode === 9) {
                setTimeout(() => scrollIntoView(document.activeElement, { time: 10 }),10);
            }
        }
    },[]);
    
    return (
        <Container style={styles.container}>
            {
                book.map(({titulo, descripcion, id},index) => {

                    const score = window.localStorage.getItem(id);

                    return (
                        <Card
                        as={Button}
                        key={index}
                        onClick={() => setTimeout(() => history.push(`/contenido/${id}`),200)}
                        style={{...styles.card, backgroundColor: score === null ? 'white' : `hsl(${score*100},80%,60%)`}}>
                            <Card.Body>
                                <Card.Title>
                                    {titulo}
                                </Card.Title>
                                <Card.Text>
                                    {descripcion}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    );
                })
            }
        </Container>
    )

    // return (
    //     <>
    //         <Navbar blocks={blocks}/>
    //         <Container className={styles.Container} style={window.innerWidth < 1100 ? {maxWidth: '100%'} : undefined}>
    //             {blocks.map((block,index) => <Block key={index} block={block} onLoad={() => setLoadedComponents((prev) => prev + 1)}/> )}
    //         </Container>
    //         { !blocks.length && <LoadingScreen message={"Cargando el libro"} />}
    //         { (blocks.length && loaded_components < number_of_components) && <LoadingScreen message={`Cargando ${Math.floor((loaded_components/number_of_components)*100)}%`} />}
    //         <Controller />
    //     </>
    // )
}

const styles = {
    container: {
        paddingTop: '15px',
        overflowY: 'scroll'
    },
    card: {
        width: '100%',
        marginBottom: '15px',
        textAlign: 'left',
        color: 'black'
    }
};

export default Viewer;