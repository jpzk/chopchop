// control needs index

const moveLine = (index, cursor, direction) => {
    const page = index.word2page[cursor]
    // go up
    if(direction === -1) { 
      const firstPage = page === 0 
      const firstLine = index.word2PageLine[cursor] === 0

      if(firstLine && firstPage) {
        return(cursor)
      } else if(firstLine) { 
        return(index.page2lastword[page - 1])
      } else {
        return(index.pageLine2word[page][index.word2PageLine[cursor] - 1])
      }
    } else { // go down
      const lastPage = page === index.page2word.length - 1
      const lastLine = index.word2PageLine[cursor] + 1 === index.pageLine2word[page].length
      if(lastLine && lastPage) {
        return(cursor)
      } else if(lastLine) { 
        return(index.page2word[page + 1])
      } else {
        return(index.pageLine2word[page][index.word2PageLine[cursor] + 1])
      }
    }
  }

export {moveLine}
