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
    const [search_results, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const getHeads = useCallback((block) => [block, ...(block.components.filter(component => component.type === 'block').map(block => getHeads(block)))].flat(Infinity),[]);
    const block_heads = useMemo(() => blocks.map(block => getHeads(block)).flat(Infinity),[blocks,getHeads]);
    
    const goTo = (block) => scrollIntoView(block.ref.current, { time: 0 }, () => setTimeout(scrollIntoView(block.ref.current),100)) || collapse(true);

    const goToSearchResult = (component) => scrollIntoView(component.block.ref.current, { time: 0 }, () => {
        const from = Math.max(0,component.index-10);
        const to = Math.min(component.index+30,component.text.length);
        const left_text = component.text.slice(0,from);
        const highlighted_text = component.text.slice(from,to);
        const right_text = component.text.slice(to);
        const selected_text = left_text + "<mark>" + highlighted_text + "</mark>" + right_text;
        collapse(true);
        setTimeout(() => 
            scrollIntoView(component.ref.current, () => {
                console.log("Selecting...");
                component.ref.current.innerHTML = selected_text;
            })
        ,500);
    });
    
    const NavItem = ({index, style}) => (
        <div style={style} className={styles.Item} onClick={() => goTo(block_heads[index])}>
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

    return (
        <div className={styles.Navbar}>
            <div className={styles.Header}>
                <Finder blocks={blocks} setResults={setSearchResults} results={search_results} focusSearch={setSearching} collapse={collapse}/>
                <div className={styles.ButtonContainer}>
                    <Button onClick={() => collapse(!collapsed)}>
                        <Menu />
                    </Button>
                </div>
            </div>
            <div className={`${styles.Index} ${collapsed ? styles.Collapsed : ''}`}>
                {   searching ?
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