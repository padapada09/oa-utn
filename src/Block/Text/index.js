import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import VisibilitySensor from 'react-visibility-sensor';
import katex from 'katex';
import getLaTex from './getLaTex';
import removeLaTex from './removeLatex';
import parse from 'html-react-parser';

const Text = ({component, onLoad}) => 
{

    const [height, setHeight] = useState('auto');
    const [visible, setVisibility] = useState(true);
    const [html, setHTML] = useState(null);
    const [latex, setLatex] = useState(null);
    const [text, setText] = useState(null);
    const self = useRef(component.ref).current;
    
    useEffect(() => {
        function loadText () {
            setLatex(getLaTex(component.text).map(({code, index}) => ({html: katex.renderToString(code, {output: 'html'}), index, code})));
            setText(removeLaTex(component.text));
        }

        loadText();
    },[component]);

    useEffect(() => {
        function parseHtml () {
            let text_html = text;
            latex.forEach(({html, index, code}) => text_html = text_html.replace(`<InDeX${index}>`,html.replace(`class="katex"`,`class="katex" aria-label="${code}"`)));
            setHTML(parse(text_html));
        }

        if (latex && text) parseHtml();
    },[latex,text]);

    useEffect(() => {
        function load () {
            setHeight(self.current.clientHeight);
            onLoad();
        }

        if (html && height === 'auto') load();
    },[html,onLoad,height,self]);

    return (
        <VisibilitySensor onChange={(visible) => setVisibility(visible)} intervalDelay={300} offset={{top: 0, bottom: 0}} partialVisibility>
            {   visible || height === 'auto' ?
                    <p 
                    ref={component.ref}
                    className={styles.Text} 
                    style={{ height }}
                    tabIndex={0}>
                        {html ? html : null}
                    </p>
                : <p style={{ height }} ref={component.ref}/>
            }
        </VisibilitySensor>

    )
};

export default Text;