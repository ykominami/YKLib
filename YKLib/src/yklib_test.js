function getSettings(dest_sheetname = ""){
  if( dest_sheetname === "" ){
    dest_sheetname = "Sheet1"
  }
  return {
    "ss_id": "1upauHI2N5cwrAEMzvG9UuC7dGLekuSkT-Y5uiKit9Bo",
    "src_sheetname": "_all",
    "dest_sheetname": dest_sheetname 
  }
}

function test() {
  settings = getSettings("public")
  xsheet = new XSheet(settings, "eq", "PUB")
  xsheet.extract()
}
