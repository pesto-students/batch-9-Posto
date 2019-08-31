import React from 'react';
import Markdown from '../Markdown';

import styles from './Help.module.css';

const headers = `# H1
## H2
### H3
#### H4
##### H5`;

const emphasis = `Emphasis, aka italics, with *asterisks* or _underscores_.  
Strong emphasis, aka bold, with **asterisks** or __underscores__.  
Combined emphasis with **asterisks and _underscores_**.  
Strikethrough uses two tildes. ~~Scratch this.~~`;

const orderedList = `1. First ordered list item
2. Another item`;

const unorderedList = `* Unordered list can use asterisks
- Or minuses
+ Or pluses`;

const links = `[I'm an inline-style link](https://www.google.com)  
[I'm an inline-style link with title](https://www.google.com "Google's Homepage")`;

const image = '![Random Pic from Unsplash](https://source.unsplash.com/qbpM-CLCRtg "Random Pic from unsplash")';

const code = '`code`';

const codeBlock = `\`\`\`
let a = 5;
\`\`\``;

const table1 = `| Tables        | Are           | Cool  |
  | ------------- |:-------------:| -----:|
  | col 3 is      | right-aligned | $1600 |
  | col 2 is      | centered      |   $12 |
  | zebra stripes | are neat      |    $1 |`;

const table2 = `Markdown | Less | Pretty
  --- | --- | ---
  *Still* | \`renders\` | **nicely**
  1 | 2 | 3`;

const blockquote = '> Blockquotes are very handy in email to emulate reply text.';

const horizontalRules = `
  ***
  ___
  ---`;

const inlineHTML = `<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>
  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>`;

const youtubeEmbed = '!(https://www.youtube.com/watch?v=HUBNt18RFbo)';

const Help = () => (
  <>
    <h1 style={{ fontSize: '40px', color: '#00b5ad' }}>Markdown Cheatsheet</h1>

    <article className={styles.help}>
      {headers.split('\n').map((header) => <p>{header}</p>)}
      <Markdown source={headers} />

      {emphasis.split('\n').map((line) => <p>{line}</p>)}
      <Markdown source={emphasis} />

      {orderedList.split('\n').map((line) => <p>{line}</p>)}
      <Markdown source={orderedList} />

      {unorderedList.split('\n').map((line) => <p>{line}</p>)}
      <Markdown source={unorderedList} />

      {links.split('\n').map((link) => <p>{link}</p>)}
      <Markdown source={links} />

      <p>{image}</p>
      <Markdown source={image} />

      <p>{code}</p>
      <Markdown source={code} />

      <p>{codeBlock}</p>
      <Markdown source={codeBlock} />

      <p>Colons can be used to align columns.</p>
      {table1.split('\n').map((row) => <p>{row}</p>)}
      <Markdown source={table1} />

      <p>There must be at least 3 dashes separating each header cell.</p>
      <p>The outer pipes (|) are optional, and you don't need to make the
        raw Markdown line up prettily. You can also use inline Markdown.
      </p>

      {table2.split('\n').map((row) => <p>{row}</p>)}
      <Markdown source={table2} />

      <p>{blockquote}</p>
      <Markdown source={blockquote} />

      {horizontalRules.split('\n').map((line) => <p>{line}</p>)}
      <Markdown source={horizontalRules} />

      {inlineHTML.split('\n').map((html) => <p>{html}</p>)}
      <Markdown source={inlineHTML} />

      <p>{youtubeEmbed}</p>
      <Markdown source={youtubeEmbed} />
    </article>
  </>
);

export default Help;
