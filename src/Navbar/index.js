import React, { useState, useMemo, useCallback } from 'react';
import { Button, Card } from 'react-bootstrap';
import Finder from '../Finder';
import { FixedSizeList as List } from 'react-window';
import { Menu } from '@material-ui/icons';
import styles from './styles.module.scss';
import scrollIntoView from 'scroll-into-view';

const window_height = window.innerHeight;

const Navbar = ({blocks}) =>
{
    const [collapsed, collapse] = useState(true);
    const [search_results, setSearchResults] = useState(null);
    const getHeads = useCallback((block) => [block, ...(block.components.filter(component => component.type === 'block').map(block => getHeads(block)))].flat(Infinity),[]);
    const block_heads = useMemo(() => blocks.map(block => getHeads(block)).flat(Infinity),[blocks,getHeads]);
    
    const goToBlock = (block) => {
        scrollIntoView(block.ref.current,{time: 0});
        collapse(true);
    }

    const goToSearchResult = (component) => {
        scrollIntoView(component.ref.current,{time: 0});
        collapse(true);
    }
    
    const NavItem = ({index, style}) => (
        <div style={style} className={styles.Item} onClick={() => goToBlock(block_heads[index])}>
            {block_heads[index].title}
        </div>
    );
    
    const ResultItem = ({index, style}) => (
        <div style={style} className={styles.SearchResult} onClick={() => goToSearchResult(search_results[index])}>
            <Card text="info" bsPrefix={`card ${styles.Card}`}>
                <Card.Header>{search_results[index].block?.title || search_results[index].title}</Card.Header>
                <Card.Body>{search_results[index].text.slice(Math.max(0,search_results[index].index-10),Math.min(search_results[index].text.length,search_results[index].index+50))}...</Card.Body>
            </Card>
        </div>
    )

    function onFocus () {
        setSearchResults([]);
        collapse(false);
    }

    function onBlur () {
        setSearchResults(null);
        if (window.innerWidth > 1100) collapse(true);
    }

    return (
        <div className={collapsed ? styles.Navbar : styles.NavbarFixed}>
            <div className={styles.Header}>
                <Finder
                blocks={blocks} 
                setResults={setSearchResults} 
                results={search_results} 
                onFocus={onFocus}
                onBlur={onBlur}/>
                <div className={styles.ButtonContainer}>
                    <Button onClick={() => collapse(!collapsed)} tabIndex={-1}>
                        <Menu />
                    </Button>
                </div>
            </div>
            <div className={`${styles.Index} ${collapsed ? styles.Collapsed : ''}`}>
                {   search_results ?
                        <List
                        height={window.innerWidth > 1100 ? window_height*0.93 : window_height*0.80}
                        itemCount={search_results.length}
                        itemSize={160}
                        className={styles.List}
                        width={window.innerWidth > 1100 ? 300 : window.innerWidth}>
                            {ResultItem}
                        </List>
                    :
                        <List
                        height={window.innerWidth > 1100 ? window_height*0.93 : window_height*0.80}
                        itemCount={block_heads.length}
                        itemSize={35}
                        className={styles.List}
                        width={window.innerWidth > 1100 ? 300 : window.innerWidth}>
                            {NavItem}
                        </List>
                }
            </div>
        </div>
    );
};

export default Navbar;