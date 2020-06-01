// import React from 'react';
// import { Container, Form, Button, Modal } from 'react-bootstrap';
// import Block from '../Block';

// function reducer (state,action) {
//     switch (action.type) {
        
//         case 'type': return {...state, type: action.payload};
//         case 'text': return {...state, text: action.payload};
//         case 'title': return {...state, title: action.payload};
        
//         case 'addComponent': 
//             switch (state.type) {
//                 case 'Texto':
//                     return {
//                         ...state, 
//                         text: '', 
//                         type: 'Texto', 
//                         blocks: [
//                             ...state.blocks.map((block,index,{length}) => index + 1 === length ? {
//                                 ...block, 
//                                 components: [...block.components, {type: 'text', text: state.text}]
//                             } : block)
//                         ]
//                     };
//                 default: return state;
//             }

//         case 'promptForBlockTitle': return {...state, modal: true};
//         case 'addBlock': return {...state, blocks: [...state.blocks, {type: "block", title: state.title, components: []}], title: '', modal: false};
//         case 'dismiss_modal': return {...state, modal: false};
//         case 'reset': return {type: 'Texto'};
//         default: return {...state};
//     }
// }

const Editor = (props) => {

    // const [state, dispatch] = useReducer(reducer,{type: 'Texto', blocks: []});

    return "Lamentablemente esta sección aún está en desarrollo...";

    // return (
    //     <Container style={{height: '100%', overflow: 'scroll', paddingBottom: '200px'}}>
    //         {
    //             state.blocks.map((block,index) => 
    //                 <Block key={index} block={block}/>
    //             )
    //         }
    //         <Form onSubmit={(e) => e.preventDefault()}>

    //             <Form.Group controlId="formBasicEmail">
    //                 <Form.Label>Que componente quieres agregar al bloque?</Form.Label>
    //                 <Form.Control 
    //                 as="select" 
    //                 custom 
    //                 value={state.type}
    //                 onChange={({target}) => dispatch({type: 'type', payload: target.value})}>
    //                     <option>Texto</option>
    //                     <option>Bloque</option>
    //                 </Form.Control>
    //             </Form.Group>

    //             {   state.type === 'Texto' &&
    //                 <Form.Group controlId="formBasicPassword">
    //                     <Form.Label>Texto</Form.Label>
    //                     <Form.Control 
    //                     as="textarea" 
    //                     rows={5} 
    //                     placeholder="Escribí acá..." 
    //                     value={state.text}
    //                     onChange={({target}) => dispatch({type: 'text', payload: target.value})}/>
    //                 </Form.Group>
    //             }
    //             <div style={{display: 'flex', justifyContent: 'space-between'}}>
    //                 <Button variant="primary" onClick={() => dispatch({type: 'addComponent'})}>
    //                     Agregar componente
    //                 </Button>
    //                 <Button variant="primary" onClick={() => dispatch({type: 'promptForBlockTitle'})}>
    //                     Nuevo bloque
    //                 </Button>
    //             </div>
    //             <Button variant="primary" block style={{marginTop: '20px'}}>
    //                 Descargar .book
    //             </Button>
    //         </Form>
    //         <Modal show={state.modal} onHide={() => dispatch({type: 'dismiss_modal'})}>
    //             <Modal.Header closeButton>
    //             <Modal.Title>Nuevo bloque</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //                 Que titulo querés que tenga el bloque?
    //                 <Form.Group controlId="formBasicPassword">
    //                     <Form.Label>Titulo</Form.Label>
    //                     <Form.Control  
    //                     placeholder="Titulo del bloque" 
    //                     // value={state.title}
    //                     onChange={({target}) => dispatch({type: 'title', payload: target.value})}/>
    //                 </Form.Group>
    //             </Modal.Body>
    //             <Modal.Footer>
    //             <Button variant="secondary" onClick={() => dispatch({type: 'dismiss_modal'})}>
    //                 Cancelar
    //             </Button>
    //             <Button variant="primary" onClick={() => dispatch({type: 'addBlock'})}>
    //                 Crear bloque
    //             </Button>
    //             </Modal.Footer>
    //         </Modal>
    //     </Container>
    // );
}

export default Editor;