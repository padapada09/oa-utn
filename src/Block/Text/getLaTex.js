export default function getLaTex (string) {
    const regex = new RegExp(/<TeX>.*?<TeX>/g);
    let codes = [];
    let match;
    while ((match = regex.exec(string)) !== null) {
        codes.push({
            code: match[0].replace("<TeX>","").replace("<TeX>",""), 
            index: match.index
        });
    }
    return codes;
}