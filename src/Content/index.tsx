import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import EditingActions from './EditingActions';
import useBlocks from './useBlocks';
import Block from './Block';
import classes from './styles.module.scss';
import Loader from 'components/Loader';

export interface ContentRouteParams {
    book_id: string,
    content_id: string
};

const Content = ({match, history, location} : RouteComponentProps<ContentRouteParams>) => {

    const content_id = match.params.content_id;
    const [blocks, loading_blocks, reloadBlocks] = useBlocks(content_id);
    const [index_selector, setIndexSelector] = useState<number>(0);

    if (loading_blocks) return <Loader />;

    return (
        <div style={{backgroundColor: 'white', padding: 10, marginTop: 10, marginBottom: 10, borderRadius: 5}}>
            {   blocks.map((block,index) => 
                <div key={block.id}>
                    {   (index_selector === index && process.env.REACT_APP_MODE === 'editor') &&
                        <div style={styles.index_selector} />
                    }
                    <Block {...block} />
                </div>
            )}
            {   (index_selector === blocks.length && process.env.REACT_APP_MODE === 'editor') &&
                <div style={styles.index_selector} />
            }
            <Button
            fullWidth 
            variant="contained"
            onClick={() => history.push(`${location.pathname}/revision`)}
            color="primary"
            className={classes.Button}>
                Revisar
                {console.log(classes)}
            </Button>
            <EditingActions {...{
                blocks, 
                index_selector, 
                setIndexSelector, 
                content_id, 
                reloadBlocks
            }}/>
        </div>
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