class FinderEngine {

    #blocks = [];

    constructor (blocks) {
        this.#blocks = blocks;
    }

    search (query) {
        return new Promise((res,rej) => {
            if (!query) res(null);
            else {
                const results = this.#blocks.map(block => this.searchBlock(block,query)).flat(Infinity);
                if (results.length) res(results);
                else rej('No se encontraron resultados');
            }
        })
    }

    searchBlock (block,query) {
        return block.components.map(component => {
            switch (component.type) {
                case 'block': return this.searchBlock(component,query);
                case 'text': return this.everyIndexOf(query,component.text).map(index => ({...component, index}));
                default: return [];
            }
        });
    }

    everyIndexOf (sub_string, string) {
        const normalized_sub_string = sub_string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalized_string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const regex = new RegExp("\\b"+normalized_sub_string+"\\b","ig");
        let { results, match } = { results: [], match: null};
        while ((match = regex.exec(normalized_string))) results.push(match.index);
        return results;
    }

}

export default FinderEngine;