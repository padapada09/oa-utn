import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Container, Card, Button } from 'react-bootstrap';
import LoadingScreen from '../LoadingScreen';
import JSZip from 'jszip';
import addImageToBlocks from './addImageToBlocks';
import README from '../README.json';

const Home = ({setBook}) => {

    const history = useHistory();
    const [blocks, setBlocks] = useState(null);
    const [zip, setZip] = useState(null);
    const [loading, setLoading] = useState(null);
    const [loaded_files, setLoadedFiles] = useState(0);
    const [book_files_count, setBookFilesCount] = useState(Infinity);

    useEffect(() => {
        if (zip) try {
            zip.files["book.json"].async("string").then(res => {
                const file_names = Object.keys(zip.files).filter(file_name => file_name !== 'book.json' && file_name !== 'Assets/');
                setBlocks(JSON.parse(res));
                setBookFilesCount(file_names.length);
                for (let name of file_names) {
                    const file = zip.files[name];
                    const entry = name.slice(0,name.indexOf("/") < 0 ? undefined : name.indexOf("/"));
                    switch (entry) {
                        case 'Assets':
                            file.async("base64").then(res => {
                                setBlocks(blocks => addImageToBlocks(blocks,name.slice(name.indexOf("/")+1),res));
                                setLoadedFiles(prev => prev === Infinity ? 1 : prev + 1);
                            }).catch(err => console.log("We had a problem loading an asset",err));
                            break;
                        default :
                            setLoadedFiles(prev => prev === Infinity ? 1 : prev + 1);
                            break;
                    }
                }
                window.history.pushState({page: 'file_view'},'');
            }).catch(err => console.log("We had a problem reading the book",err));
        } catch (err) {
            console.error("Looks like the file might be corrupted.",err);
        }
    },[zip]);

    useEffect(() => {
        if (loaded_files === book_files_count) {
            setBook(blocks);
            setLoading(false);
            history.push('/view');
        }
    },[book_files_count,blocks,loaded_files,setBook,history])

    function chooseFile (file) {
        setLoading(true);
        if (file instanceof File) {
            const reader = new FileReader();
            reader.onload = (event) => {
                JSZip.loadAsync(event.target.result)
                .then((zip) => setZip(zip))
                .catch((err) => console.error("We had a problem loading the file. ",err));
            }
            reader.readAsArrayBuffer(file);
        } else {
            setBlocks(README);
            setBookFilesCount(0);
            setLoadedFiles(0);
        }
    }

    if (loading) return <LoadingScreen message="Cargando el libro" />
    
    return (
        <Container style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <h1 style={{textAlign: 'center', marginBottom: '5vh', marginTop: '5vh'}}>Bienvenido al lector de archivos .Book</h1>
            <Form>
                <Form.File label="Ingresa un libro para visualizar" custom onChange={({target}) => chooseFile(target.files[0])}/>
            </Form>
            <Container style={{flex: 1, padding: '20px', overflow: 'scroll', marginTop: '20px'}}>
                <Card style={{ width: '100%', marginTop: '20px' }}>
                    <Button variant="outline-primary" onClick={() => chooseFile('README')}>
                        <Card.Body style={{textAlign: 'left'}}>
                            <Card.Title>Documentación</Card.Title>
                            <Card.Text>Ejemplo de .book con la documentación del proyecto y el formato. Presioná esta tarjeta si querés visualizarlo</Card.Text>
                        </Card.Body>
                    </Button>
                </Card>
            </Container>
        </Container>
    )
}

export default Home;