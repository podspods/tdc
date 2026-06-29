import ReactMarkdown from "react-markdown";

const markdownText = `

- liste des tâches 
- liste des sparepart
- liste consommable




-------------------------------------------------------------------------


## Sous-titre

Voici un **texte en gras** et un *texte en italique*.

- Liste à puces
- Élément 2

1. Liste numérotée
2. Élément suivant

[Lien vers Google](https://google.com)

\`\`\`javascript
console.log('Code bloc');
\`\`\`


`;

export default function ToDoList() {
  return (
    <>
      <h1>ToDoList</h1>
      <div>
        <ReactMarkdown>{markdownText}</ReactMarkdown>
      </div>
    </>
  );
}
