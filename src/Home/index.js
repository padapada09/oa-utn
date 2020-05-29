import React, { useEffect, useState } from 'react';
import { Form, Container, Card, Button} from 'react-bootstrap';
import LoadingScreen from '../LoadingScreen';
import JSZip from 'jszip';
import addImageToBlocks from './addImageToBlocks';
import recents from './recents.json';
import fake_book from '../fake_book.json';

const Home = ({setBook}) => {

    const [blocks, setBlocks] = useState(null);
    const [zip, setZip] = useState(null);
    const [loading, setLoading] = useState(null);
    const [loaded_files, setLoadedFiles] = useState(0);
    const [book_files_count, setBookFilesCount] = useState(Infinity);

    useEffect(() => { window.history.pushState({page: 'file_selection'},'') },[]);

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
        }
    },[book_files_count,blocks,loaded_files,setBook])

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
            setBook(fake_book);
            window.history.pushState({page: 'file_view'},'');
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
                {
                    recents.map((book,index) => 
                        <Card key={index} style={{ width: '100%', marginTop: '20px' }}>
                            <Button variant="outline-primary" onClick={() => chooseFile(book)}>
                                <Card.Body style={{textAlign: 'left'}}>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text>{book.description}</Card.Text>
                                </Card.Body>
                            </Button>
                        </Card>
                    )
                }
            </Container>
        </Container>
    )
}

export default Home;