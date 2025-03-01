export function replaceMergeFields(template: string, replacements: { [key: string]: string }): string {
    return template.replace(/{{(.*?)}}/g, (match, key) => {
        return replacements[key.trim()] || match;
    });
}

// Example usage:
// const template = "Hello {{name}}, your total expense for {{month}} is {{total}}.";
// const replacements = {
//     name: "John",
//     month: "October",
//     total: "₹20000"
// };