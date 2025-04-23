
/**Hides the text from bots without changing how it looks */
export default function hideFromBots(input: string): string {
  const charset = [ 
    'a',  'b',  'c',  'd',  'e',  'f',  'g',  'h',  'i',  'j',  'k',  'l',  'm',  'n',  'o',  'p',  'q',  'r',  's',  
    't',  'u',  'v',  'w',  'x',  'y',  'z',  'A',  'B',  'C',  'D',  'E',  'F',  'G',  'H',  'I',  'J',  'K',  'L',  
    'M',  'N',  'O',  'P',  'Q',  'R',  'S',  'T',  'U',  'V',  'W',  'X',  'Y',  'Z',  '0',  '1',  '2',  '3',  '4',  
    '5',  '6',  '7',  '8',  '9', '\"', '\'', "\\@"
  ]
  
  const randomChars = () => {
    let result = "";
    const bound = Math.floor(Math.random() * 100);
    for (let index = 0; index < bound; index += 1) 
      result += charset[Math.floor(Math.random() * charset.length)];
    return result;
  }

  return ( input.split('')
    .map( character => {
      if (character === '@') return `\\${character}`;
      else return `${character}#text(size: 0pt)[${randomChars()}]`;
    }).join('')
  )
}
