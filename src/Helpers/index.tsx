import { Content } from 'Types';

export function dependsOf (A: Content, B : Content, contents : Content[]) : boolean {

    if (A.dependencias.includes(B.id)) return true;
    else {
        if (A.dependencias.length === 0) return false;
        else {
            const A_dependencies = contents.filter(content =>
                A.dependencias.includes(content.id));

            return A_dependencies.some(content => dependsOf(content,B,contents));
        };
    };
};

export function dependenciesResolved (content :  Content) {
    return content.dependencias.every(other_content_id => {
        const score = parseFloat(localStorage.getItem(other_content_id) || '0');
        if (score > 0.6) {
            return true;
        } else {
            return false;
        }
    });
};

export function sortDependencies (contents: Array<Content>) : Array<Content> {
    return contents.sort((A,B) => {
        function depends (A: Content,B : Content) : boolean {
            if (A.dependencias.includes(B.id)) return true;
            else {
                if (A.dependencias.length === 0) return false;
                else {
                    const A_dependencies = contents.filter(content =>
                        A.dependencias.includes(content.id));

                    return A_dependencies.some(content => depends(content,B));
                };
            };
        };

        return depends(A,B) ? 1 : -1;
    });
};