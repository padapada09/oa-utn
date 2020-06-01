export default function removeLaTex (string) {
    const regex = new RegExp(/<TeX>.*?<TeX>/g);
    let string_without_latex = string;
    let match;
    while ((match = regex.exec(string)) !== null) {
        string_without_latex = string_without_latex.replace(match[0],`<InDeX${match.index}>`);
    }
    return string_without_latex;
}