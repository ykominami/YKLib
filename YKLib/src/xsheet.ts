import {Condition} from './condition'
import {Sheetx} from './sheetx'

export class XSheet{
  settings: Record<string,string>
  cond_pat: string
  cond_value: string
  ss: GoogleAppsScript.Spreadsheet.Spreadsheet
  src_sheetx: Sheetx | null = null
  data_x: string[][] = [[]]
  found_index: number = -1
  width: number = 0
  height: number = 0
  dest_row: number = 0
  dest_sheetx: Sheetx | null = null
  cols: number = 0

  constructor(settings: Record<string,string>, cond_pat: string, cond_value: string){
    this.settings = settings
    this.cond_pat = cond_pat
    this.cond_value = cond_value
    this.ss = SpreadsheetApp.openById(settings.ss_id)
  }
  extract(){
    this.src_sheetx = new Sheetx(this.ss, this.settings.src_sheetname)
    Logger.log(`this.src_sheetx.hength=${this.src_sheetx.height}`)
    this.found_index = this.src_sheetx.find_blank()
    this.width = this.src_sheetx.width
    this.height = this.src_sheetx.height

    Logger.log(`found_index=${this.found_index}`)
    if( this.found_index < 0){
      // do nothing
    }
    else{
      this.src_sheetx.reform(this.found_index)
      this.width = this.src_sheetx.width
      this.height = this.src_sheetx.height

      this.dest_sheetx = new Sheetx(this.ss, this.settings.dest_sheetname)
      if( this.dest_sheetx != null && this.dest_sheetx.sheet != null){
        this.dest_sheetx.sheet.getDataRange().clear()
        this.data_x = this.src_sheetx.data_x
        this.copy_to_dest(this.data_x, this.height, this.dest_sheetx, this.width, this.cond_pat, this.cond_value)
      }
    }
  }
  copy_to_dest(data_x: string[][] , height: number, dest_sheetx: Sheetx, cols: number, cond_pat: string, cond_value: string): void{
    let dest_array:string[][] = []
    dest_array.push( data_x[0])

    let ret = false
    for(let i=1; i<height; i++){
      ret = Condition.select(data_x, i, 1, cond_pat, cond_value)
      if ( ret ){
        dest_array.push( data_x[i] )
      }
    }
    if( dest_sheetx.sheet != null){
      const dest_range = dest_sheetx.sheet.getRange(1,1, dest_array.length, cols)
      dest_range.setValues( dest_array )
    }
  }
}
// this.XSheet = XSheet