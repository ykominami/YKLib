export class Util{
  static find_blank(data: string[][]): number{
    for(let i=0; i<data.length; i++){
      if(data[i][0] !== ''){
        return i
      }
    }
    return -1
  }
  static UPPER_BLANK_LINE_RANGE = 1;
  static NOT_BLANK_LINE_RANGE = 2;
  static BOTTOM_BLANK_LINE_RANGE = 3;

  static BLANK_LINE = 10;
  static NOT_BLANK_LINE = 11;

  static log_init() {

  }
  static log(message: string): string {
    Logger.log(message)
    return message;
  }
  static print_line(lines: StringOrNull[][]): void {
      let xstr: string = "";
      if (lines != null) {
          lines.map(l => {
            l.map(x => {
                if (typeof x === "string") {
                    xstr = x;
                }
                else {
                    xstr = "(null)";
                }
                Util.log(xstr);
            });
          })
          Util.log("\n");
      }
  }
  static detect_blank_line(line: string[]): number{
    return line.indexOf('')
  }

  static remove_blank_line(lines: string[][]): string[][]{
      let result: string[][] = [];
      lines.forEach((line, index) => {
        if (Util.detect_blank_line(line) === -1){
          result.push(line);
        }
      });
      return result;
  }
  static remove_upper_blank_line(lines: string[][]): string[][]{
      let result:string[][] = [];
      let skip_flag = true;
      lines.forEach((line, index) => {
        if (skip_flag){
          if (Util.detect_blank_line(line) === -1){
            skip_flag = false;
            result.push(line);
          }
        }
        else{
          result.push(line);
        }
      });
      return result;
  }

  static get_line_state(line: string[]): number{
      if (Util.detect_blank_line(line) === -1){
        return Util.NOT_BLANK_LINE
      }
      else {
        return Util.BLANK_LINE
      }
  }
  static remove_under_the_blank_row(lines: string[][]): string[][]{
    let result: string[][] = [];
    let range_state = Util.UPPER_BLANK_LINE_RANGE;
    let line_state = Util.BLANK_LINE;

    lines.forEach((line, index) => {
      line_state = Util.get_line_state(line);

      if (range_state === Util.UPPER_BLANK_LINE_RANGE){
        result.push(line);
        if (line_state === Util.NOT_BLANK_LINE){
          range_state = Util.NOT_BLANK_LINE_RANGE
        }
      }
      else if(range_state === Util.NOT_BLANK_LINE_RANGE){
        if (line_state === Util.NOT_BLANK_LINE){
          result.push(line);
        }
        else{
          range_state = Util.BOTTOM_BLANK_LINE_RANGE
        }
      }
    });
    return result;
  }

  static remove_left_blank_cols(lines: string[][]):string[][] {
    const list = Util.detect_ws_level(lines)
    let pos = Math.min(...list)
    return Util.reform_sub(lines, pos)
  }

  static reform_sub(lines: string[][], pos:number):string[][]{
    let result:string[][] = [];
    lines.forEach((line, index) => {
      let result2:string[] = [];
      line.forEach((word, i) => {
        if (i >= pos) {
          result2.push(word);
        }
      });
      result.push(result2);
    });
    Util.log(`reform_sub result=${result}`);
    return result;
  }


  static getAsJSON(values: string[][]): string {
    const init_value: StringStringAssoc = {"":""};
    const xarray: StringSSA = {"":init_value};
    //先頭行にラベルがあるものとして、それ以降の行に各カラムにラベルをキーとして、カラムの値を値とする連想配列を作成
    let first_i = 0;
    let second_i_str = "";
    let index = 0;
    let index_str = "";
    for (let i = 1; i < values.length; i++) {
        index = i -1;
        index_str = index.toString();
        xarray[index_str] = {};
        for (let j = 0; j < values[0].length; j++) {
          first_i = i - 1;
          second_i_str = values[0][j];
          xarray[first_i][second_i_str] = values[i][j];
        }
    }
    //オブジェクトの変数をJSON形式に変換
    const json = JSON.stringify(xarray);
    return json;
  }
  static son2string(sn: StringOrNull): string {
    if (typeof sn === "string") {
        return sn;
    }
    else {
        return "";
    }
  }

  static is_valid_string(str: string | null): boolean {
    if (str === null || typeof str === "undefined") {
      return false;
    }
    if (str.replace(/^\s*$/, '').length == 0) {
      return false;
    }
    return true;
  }

  static make_assoc_array_array(xarray: string[][]): [Record<string,string>] {
    let result: [Record<string,string>] = [{}];
    if (xarray.length > 0) {
      const keys = xarray[0];
      Util.log(`Util.make_assoc_array_array keys=${keys}`);

      xarray.slice(1).forEach((values, index) => {
        let obj: Record<string,string> = {};
        keys.forEach((key:string, i:number) => {
          obj[key] = values[i];
        });
        result.push(obj);
      });
    }
    return result;
  }
  static dump_array(array:string[][]): void {
    array.forEach((item, index)=>{
      Util.log(`listx_main ${index} 0=${item[0]} 1=${item[1]}`)
    })
  }

  static detect_ws_level(lines: string[][]): number[] {
    let no_ws_level_list: number[] = []
    lines.forEach((line, index) => {
      line.forEach((word, i) => {
        if (word !== ''){
          no_ws_level_list.push(i)
          return
        }
      })
    })
    // console.log(`ws_level_list=${ws_level_list}`);
    return no_ws_level_list;
  }
}

// this.Util = Util