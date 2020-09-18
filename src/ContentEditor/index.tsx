import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import styles from './styles.module.scss';
import BlockEditor from './BlockEditor';
import { useBlocks, useBlockTypes } from 'Hooks';
import { Block } from 'Types';
import { Blocks } from 'Services';
import { Button } from '@material-ui/core';

export interface ContentRouteParams {
    book_id: string,
    content_id: string
};

const ContentEditor = ({match, history, location} : RouteComponentProps<ContentRouteParams>) => {

    const [blocks, loading, reloadBlocks] = useBlocks(match.params.content_id);
    const [modified_blocks, setModifiedBlocks] = useState<Block[]>([]);
    const [ordered_blocks, setOrderedBlocks] = useState<Block[]>([]);
    const block_types = useBlockTypes();

    useEffect(() => {
        setOrderedBlocks(blocks);
    },[blocks]);

    async function onSave() {
        for (let block of modified_blocks) {
            const response = await Blocks.update(block);
            if (!response.success) throw Error("Tuvimos un problema al actualizar uno de los bloques");
        }
        reloadBlocks();
        setModifiedBlocks([]);
    };
    
    async function onDragEnd (result : DropResult) {
        if (result.source.droppableId === 'droppable_document') {
            if (result.destination?.droppableId === 'droppable_bin') {
                const response = await Blocks.remove(result.draggableId);
                reloadBlocks();
            } else if (result.destination) {
                const response = await Blocks.sort(result.draggableId,result.destination.index,result.source.index);
                if (!response.success) return;
                reloadBlocks();
            }
        } else {
            if (result.destination?.droppableId === 'droppable_document') {
                const block = block_types.find(block => block.id === result.draggableId);
                if (block) {
                    const response = await Blocks.add({...block, orden: result.destination.index},match.params.content_id);
                    reloadBlocks();
                }
            }
        }
    };

    return (
        <div className={styles.Container}>
            <Button 
            variant="contained"
            disabled={!Boolean(modified_blocks.length)}
            classes={{root: styles.SaveButton}}
            onClick={onSave}>
                Guardar
            </Button>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.ToolbarContainer}>
                    <Droppable droppableId="droppable_toolbar">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={styles.DroppableToolbar}
                            >
                                {   block_types.map((block, index) => (
                                        <Draggable draggableId={block.id} index={index} key={block.id}>
                                            {(provided, snapshot) => (
                                                <div 
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}>
                                                    <BlockEditor
                                                        disabled
                                                        block={block}
                                                        onChange={(block: Block) => 
                                                            setModifiedBlocks([
                                                                ...modified_blocks.filter(({id}) => id !== block.id),
                                                                block
                                                            ])
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="droppable_bin">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={styles.DroppableBin}
                                style={{backgroundColor: snapshot.isDraggingOver ? 'rgba(200,10,10,0.5)' : 'transparent'}}
                            >
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
                <div className={styles.DocumentContainer}>
                        <Droppable droppableId="droppable_document">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={styles.DroppableDocument}
                                >
                                    {   ordered_blocks.map((block,index) => (
                                            <Draggable key={block.id} draggableId={block.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    >
                                                        <BlockEditor
                                                            key={block.id}
                                                            block={block}
                                                            onChange={(block: Block) => 
                                                                setModifiedBlocks([
                                                                    ...modified_blocks.filter(({id}) => id !== block.id),
                                                                    block
                                                                ])
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                </div>
            </DragDropContext>
        </div>
    );
};

export default ContentEditor;