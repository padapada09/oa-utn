import React, { useEffect, useRef, useState, useMemo } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import katex from 'katex';
import getLaTex from '../Text/getLaTex';
import removeLaTex from '../Text/removeLatex';
import parse from 'html-react-parser';
// import styles from './styles.module.scss';

const List = ({component, onLoad, ...props}) => 
{

    const [height, setHeight] = useState('auto');
    const [visible, setVisibility] = useState(true);
    const [html, setHTML] = useState(null);
    const [latex_list, setLatexList] = useState(null);
    const [list, setList] = useState(null);
    const self = useRef(component.ref).current;

    useEffect(() => {
        function loadList() {
            setLatexList(component.list.map( item => getLaTex(item).map(({code, index}) => ({html:katex.renderToString(code, {output: 'html'}), index, code}))));
            setList(component.list.map( item => removeLaTex(item)));
        }

        loadList();
    },[]);

    useEffect(() => {
        function parseHtml () {
            let list_html = list;
            latex_list.forEach((latex,_index) => latex.forEach(({html, index, code}) => list_html[_index] = list_html[_index].replace(`<InDeX${index}>`,html.replace(`class="katex"`,`class="katex" aria-label="${code}"`))));
            setHTML(list_html.map(text => parse(text)));
        }

        if (latex_list && list) parseHtml();
    },[latex_list,list]);

    useEffect(() => {
        function load () {
            setHeight(self.current.clientHeight);
            onLoad();
        }

        if (html && height === 'auto') load();
    },[html,height,onLoad]);

    return (
        <VisibilitySensor onChange={(visible) => setVisibility(visible)} intervalDelay={300} offset={{top: 0, bottom: 0}} partialVisibility>
            {   visible || height === 'auto'  ?
                    <ul ref={component.ref} style={{ height }}>
                        {
                            component.list.map((_,index) =>
                                <li key={index} tabIndex={0}>
                                    { html ? html[index] : null}
                                </li>
                            )
                        }
                    </ul>
                :   <ul style={{ height }} ref={component.ref}/>
            }
        </VisibilitySensor>
    );
};

export default List;