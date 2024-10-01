export class Util{
  static find_blank(data: string[][]): number{
    for(let i=0; i<data.length; i++){
      if(data[i][0] !== ''){
        return i
      }
    }
    return -1
  }
}

// this.Util = Util