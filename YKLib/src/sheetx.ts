import { Util } from './util'

export class Sheetx{
  sheet: GoogleAppsScript.Spreadsheet.Sheet | null
  range: GoogleAppsScript.Spreadsheet.Range | null
  data: string[][] = [[]]
  row: number = 0
  width: number = 0
  height: number = 0
  data_x: string[][] = [[]]

  constructor(ss: GoogleAppsScript.Spreadsheet.Spreadsheet, sheetname:string){
    this.sheet = ss.getSheetByName(sheetname)
    if(this.sheet != null){
      this.range = this.sheet.getDataRange()
    }
    else{
      this.range = null
    }

    if(this.range != null){
      this.data = this.range.getValues()
      this.row = this.range.getRow()
      this.width = this.range.getWidth()
      this.height = this.range.getHeight()
      this.data = this.range.getValues()
    }
    else{
      this.data = [[]]
    }

    this.width = this.data[0].length
    this.height = this.data.length - 1
  }
  find_blank(){
    return Util.find_blank(this.data)
  }

  reform(found_index: number){
    this.data_x = [[]]
    if( found_index > 0){
      this.data_x = this.data.slice(found_index)
      Logger.log(`this.data_x=${this.data_x}`)
      this.height = this.data_x.length
      this.width = this.data_x[0].length
      Logger.log(`Sheetx reform 1 this.height=${this.height}`)
    }
    else if( found_index == 0){
      this.data_x = this.data
      this.height = this.data_x.length
      this.width = this.data_x[0].length
      Logger.log(`Sheetx reform 2 this.height=${this.height}`)
    }
    else{
      this.data_x = [[]]
      this.height = this.data_x.length
      this.width = this.data_x[0].length
      Logger.log(`Sheetx reform 3 this.height=${this.height}`)
    }
  }
}
// this.Sheetx = Sheetx