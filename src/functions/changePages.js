export const increment = (setMinItens, minItens, setMaxItens, maxItens, setPageNumber, pageNumber, array, incrementator) => {
    if(maxItens < array.length-1){
      setMinItens(minItens + incrementator);
      setMaxItens(maxItens + incrementator);
      setPageNumber(pageNumber+1);
    }
  }

export const decrement = (setMinItens, minItens, setMaxItens, maxItens, setPageNumber, pageNumber, incrementator) => {
    if(minItens > 0){
      setMinItens(minItens - incrementator);
      setMaxItens(maxItens - incrementator);
      setPageNumber(pageNumber-1)
    }
  }