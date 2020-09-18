import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useBlocks } from 'Hooks';
import BlockViewer from './BlockViewer';
import classes from './styles.module.scss';
import Loader from 'components/Loader';

export interface ContentRouteParams {
    book_id: string,
    content_id: string
};

const Content = ({match, history, location} : RouteComponentProps<ContentRouteParams>) => {

    const content_id = match.params.content_id;
    const [blocks, loading_blocks, reloadBlocks] = useBlocks(content_id);

    if (loading_blocks) return <Loader />;

    return (
        <Container 
        maxWidth="md" 
        className={'MobileContainer'} 
        data-testid="container">
            <div style={{backgroundColor: 'white', padding: 10, marginTop: 10, marginBottom: 10, borderRadius: 5}}>
                {   blocks.map(block => 
                        <BlockViewer {...block} key={block.id} />
                )}
                <Button
                fullWidth 
                variant="contained"
                onClick={() => history.push(`${location.pathname}/revision`)}
                color="primary"
                className={classes.Button}>
                    Revisar
                </Button>
            </div>
        </Container>
    )
}

const styles = {
    loading_container: {
        display: 'flex', 
        width: '100%', 
        justifyContent: 'center', 
        marginTop: 20,
        alignItems: 'center'
    },
    index_selector: {
        width: '100%',
        height: 5,
        borderRadius: 4,
        backgroundColor: 'blue'
    },
    button: {
        position: 'sticky',
        bottom: 20
    }
}

export default Content;