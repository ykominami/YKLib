export class Condition {
  static select(src_data: string[][], i: number, num: number, cond_pat: string, cond_value: string): boolean {
    Logger.log(`Condition#select src_data=${src_data}`)
    Logger.log(`Condition#select src_data[${i}]=${src_data[i]}`)
    let ret = false
    if(cond_pat == "eq"){
      if (src_data[i][num] == cond_value){
        ret = true
      }
    } else if(cond_pat == "not_eq"){
        if (src_data[i][num] != cond_value){
          ret = true
        }
    } else {
      ret = true
    }
    return ret
  }
}

// this.Condition = Condition
