function Condition() {
}
function Sheetx() {
}
function Util() {
}
function XSheet() {
}
function Infox() {
}/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/condition.ts":
/*!**************************!*\
  !*** ./src/condition.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Condition: () => (/* binding */ Condition)
/* harmony export */ });
class Condition {
    static select(src_data, i, num, cond_pat, cond_value) {
        Logger.log(`Condition#select src_data=${src_data}`);
        Logger.log(`Condition#select src_data[${i}]=${src_data[i]}`);
        let ret = false;
        if (cond_pat == "eq") {
            if (src_data[i][num] == cond_value) {
                ret = true;
            }
        }
        else if (cond_pat == "not_eq") {
            if (src_data[i][num] != cond_value) {
                ret = true;
            }
        }
        else {
            ret = true;
        }
        return ret;
    }
}
// this.Condition = Condition


/***/ }),

/***/ "./src/infox.ts":
/*!**********************!*\
  !*** ./src/infox.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Infox: () => (/* binding */ Infox)
/* harmony export */ });
/* harmony import */ var _spreadsheetx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./spreadsheetx */ "./src/spreadsheetx.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.ts");
/* harmony import */ var _itemx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./itemx */ "./src/itemx.ts");
/* harmony import */ var _searchitem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./searchitem */ "./src/searchitem.ts");
/* harmony import */ var _itemvalue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./itemvalue */ "./src/itemvalue.ts");





class Infox {
    constructor(ss_id, sheet_name) {
        if (!_util__WEBPACK_IMPORTED_MODULE_1__.Util.is_valid_string(ss_id)) {
            throw new Error("Infox ss_id is invalide");
        }
        if (!_util__WEBPACK_IMPORTED_MODULE_1__.Util.is_valid_string(sheet_name)) {
            throw new Error("Infox sheet_name is invalide");
        }
        this.ss_id = ss_id;
        this.sheet_name = sheet_name;
        this.ssxx = null;
        this.ssheet = null;
        this.values = [[""]];
        if (!_util__WEBPACK_IMPORTED_MODULE_1__.Util.is_valid_string(this.ss_id) || !_util__WEBPACK_IMPORTED_MODULE_1__.Util.is_valid_string(this.sheet_name)) {
            throw new Error("Infox this.ss_id is invalide");
        }
        this.getValues();
    }
    setup() {
        if (this.ssxx === null) {
            this.ssxx = new _spreadsheetx__WEBPACK_IMPORTED_MODULE_0__.SpreadSheetx(this.ss_id);
        }
        if (this.ssxx !== null) {
            this.ssheet = this.ssxx.getSheet(this.sheet_name);
        }
    }
    appendRow(data_array) {
        // [this.name, this.email, this.inquiry, "受付", new Date(), new Date()]);
        this.setup();
        if (this.ssheet !== null) {
            this.ssheet.appendRow(data_array);
        }
    }
    getValues() {
        this.setup();
        if (this.ssheet !== null) {
            this.ssheet.fetchAndSetDataRange();
            this.values = this.ssheet.getValues();
        }
        return this.values;
    }
    getSSId(infoparam) {
        const values = this.getValues();
        const year = infoparam.year;
        const kind = infoparam.kind;
        const kind2 = infoparam.kind2;
        const item = this.make_item(year, kind, kind2);
        return this.get_id_from_values(values, item);
    }
    make_item(year_str = null, kind_str = null, kind2_str = null) {
        const INDEX_ID = 4;
        const INDEX_KIND = 0;
        const INDEX_YEAR = 1;
        // const INDEX_TITLE: number = 2
        const INDEX_KIND2 = 3;
        // const INDEX_URL: number = 6
        const value_item = new _itemvalue__WEBPACK_IMPORTED_MODULE_4__.Itemvalue({ index: INDEX_ID, value: "" });
        const search_items = [];
        if (year_str != null) {
            const s1_item = new _itemx__WEBPACK_IMPORTED_MODULE_2__.Itemx({ index: INDEX_YEAR, name: year_str });
            search_items.push(s1_item);
        }
        if (kind_str != null) {
            const s2_item = new _itemx__WEBPACK_IMPORTED_MODULE_2__.Itemx({ index: INDEX_KIND, name: kind_str });
            search_items.push(s2_item);
        }
        if (kind2_str != null) {
            const s3_item = new _itemx__WEBPACK_IMPORTED_MODULE_2__.Itemx({ index: INDEX_KIND2, name: kind2_str });
            search_items.push(s3_item);
        }
        const searchitem = new _searchitem__WEBPACK_IMPORTED_MODULE_3__.SearchItem({ searches: search_items, value: value_item });
        return searchitem;
    }
    get_id_from_values(d, item) {
        let result_start = d;
        let result_end = [];
        let ret_str = "";
        let xstr = "";
        const search_items = item.searches;
        const value_item = item.value;
        // Util.log(`Infox get_id_from_values result_start=${result_start}`);
        // Util.log(`Infox get_id_from_values =1-X d d.length=${d.length}`);
        d.map(it => {
            it.map(x => {
                _util__WEBPACK_IMPORTED_MODULE_1__.Util.log(`${x}, `);
            });
            _util__WEBPACK_IMPORTED_MODULE_1__.Util.log("\n");
        });
        const count = search_items.length;
        for (let i = 0; i < count; i++) {
            const item = search_items[i];
            xstr = item.name == null ? "null" : "not null";
            // Util.log(`Infox get_id_from_values =4-X i=${i} item.value=${xstr} result_start.length=${result_start.length}`);
            result_end = result_start.filter((v) => {
                return v[item.index] == item.name;
            });
            result_start = result_end;
            // Util.log("Infox get_id_from_values =S");
            // Util.log(result_start);
            // Util.log("Infox get_id_from_values =E");
        }
        // Util.log("Infox get_id_from_values =A1");
        if (result_start.length > 0) {
            // Util.log("Infox get_id_from_values =A2");
            ret_str = result_start[0][value_item.index];
            // Util.log(`Infox get_id_from_values 1 ret_str=${ret_str}`);
        }
        xstr = ret_str == null ? "(null)" : ret_str;
        // Util.log(`Infox get_id_from_values =A3 xstr=${xstr} value_item.index=${value_item.index}`);
        // Util.log(`Infox get_id_from_values ret=${ret} result_start.length=${result_start.length}`);
        return ret_str;
    }
}


/***/ }),

/***/ "./src/itemvalue.ts":
/*!**************************!*\
  !*** ./src/itemvalue.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Itemvalue: () => (/* binding */ Itemvalue)
/* harmony export */ });
class Itemvalue {
    constructor(options) {
        this.index = options.index;
        this.value = options.value;
    }
}


/***/ }),

/***/ "./src/itemx.ts":
/*!**********************!*\
  !*** ./src/itemx.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Itemx: () => (/* binding */ Itemx)
/* harmony export */ });
class Itemx {
    constructor(options) {
        this.index = options.index;
        this.name = options.name;
    }
}
// export default Item;


/***/ }),

/***/ "./src/searchitem.ts":
/*!***************************!*\
  !*** ./src/searchitem.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchItem: () => (/* binding */ SearchItem)
/* harmony export */ });
class SearchItem {
    constructor(options) {
        this.searches = options.searches;
        this.value = options.value;
    }
}
;


/***/ }),

/***/ "./src/sheetx.ts":
/*!***********************!*\
  !*** ./src/sheetx.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sheetx: () => (/* binding */ Sheetx)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");

class Sheetx {
    constructor(ss, sheetname) {
        this.data = [[]];
        this.row = 0;
        this.width = 0;
        this.height = 0;
        this.data_x = [[]];
        this.sheet = ss.getSheetByName(sheetname);
        if (this.sheet != null) {
            this.range = this.sheet.getDataRange();
        }
        else {
            this.range = null;
        }
        if (this.range != null) {
            this.data = this.range.getValues();
            this.row = this.range.getRow();
            this.width = this.range.getWidth();
            this.height = this.range.getHeight();
            this.data = this.range.getValues();
        }
        else {
            this.data = [[]];
        }
        this.width = this.data[0].length;
        this.height = this.data.length - 1;
    }
    find_blank() {
        return _util__WEBPACK_IMPORTED_MODULE_0__.Util.find_blank(this.data);
    }
    reform(found_index) {
        this.data_x = [[]];
        if (found_index > 0) {
            this.data_x = this.data.slice(found_index);
            Logger.log(`this.data_x=${this.data_x}`);
            this.height = this.data_x.length;
            this.width = this.data_x[0].length;
            Logger.log(`Sheetx reform 1 this.height=${this.height}`);
        }
        else if (found_index == 0) {
            this.data_x = this.data;
            this.height = this.data_x.length;
            this.width = this.data_x[0].length;
            Logger.log(`Sheetx reform 2 this.height=${this.height}`);
        }
        else {
            this.data_x = [[]];
            this.height = this.data_x.length;
            this.width = this.data_x[0].length;
            Logger.log(`Sheetx reform 3 this.height=${this.height}`);
        }
    }
}
// this.Sheetx = Sheetx


/***/ }),

/***/ "./src/spreadsheetx.ts":
/*!*****************************!*\
  !*** ./src/spreadsheetx.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SpreadSheetx: () => (/* binding */ SpreadSheetx)
/* harmony export */ });
/* harmony import */ var _ssheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ssheet */ "./src/ssheet.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.ts");


class SpreadSheetx {
    constructor(ss_id) {
        this.ss_id = ss_id;
        this.ss_url = "";
        this.ss = null;
        let xstr = "";
        let xstr2 = "";
        _util__WEBPACK_IMPORTED_MODULE_1__.Util.log(`##################### SpreadSheetx constructor A ss_id=${ss_id}`);
        if (typeof ss_id === "string" && ss_id.replace(/^\s+$/, '').length > 0) {
            this.ss = SpreadsheetApp.openById(ss_id); //IDから取得
            if (typeof (this.ss) === "string") {
                xstr = "null";
            }
            else {
                xstr = "valid";
            }
            if (typeof (this.ss_id) === "string") {
                xstr2 = this.ss_id;
            }
            else {
                xstr2 = "";
            }
            _util__WEBPACK_IMPORTED_MODULE_1__.Util.log(`##################### SpreadSheetx constructor T ss=${xstr} ss_id=${xstr2}`);
        }
        else {
            if (this.ss !== null) {
                xstr = "valid";
            }
            else {
                xstr = "null";
            }
            xstr2 = "null";
            _util__WEBPACK_IMPORTED_MODULE_1__.Util.log(`##################### SpreadSheetx constructor F ss=${xstr} ss_id=${xstr2}`);
        }
        this.s_sheet_assoc = {};
    }
    openByUrl(url) {
        let xstr = "";
        this.ss_url = url;
        if (this.ss_url != null) {
            this.ss = SpreadsheetApp.openByUrl(this.ss_url); //URLから取得
            xstr = this.ss == null ? "null" : "valid";
            _util__WEBPACK_IMPORTED_MODULE_1__.Util.log(`##################### SpreadSheetx constructor openByUrl T this.ss_url=${this.ss_url} ss=${xstr}`);
        }
        else {
            xstr = this.ss == null ? "null" : "valid";
            _util__WEBPACK_IMPORTED_MODULE_1__.Util.log(`##################### SpreadSheetx constructor openByUrl F this.ss_url=null ss=${xstr}`);
        }
    }
    getSheet(sheet_name) {
        _util__WEBPACK_IMPORTED_MODULE_1__.Util.log(`SpreadSheetx getSheet 1 sheet_name=${sheet_name}`);
        if (!_util__WEBPACK_IMPORTED_MODULE_1__.Util.is_valid_string(sheet_name)) {
            return null;
        }
        let s_sheet = this.s_sheet_assoc[sheet_name];
        let xstr = "";
        if (s_sheet === null || s_sheet === undefined) {
            _util__WEBPACK_IMPORTED_MODULE_1__.Util.log(`SpreadSheetx getSheet 2 sheet_name=${sheet_name}`);
            if (this.ss !== null) {
                _util__WEBPACK_IMPORTED_MODULE_1__.Util.log(`SpreadSheetx getSheet 0 1 this.ss=${this.ss}|sheet_name=${sheet_name}`);
                const sheet = this.ss.getSheetByName(sheet_name);
                _util__WEBPACK_IMPORTED_MODULE_1__.Util.log(`SpreadSheetx getSheet 0 2 sheet=${sheet}`);
                if (sheet === null) {
                    throw new Error("sheet is null");
                }
                s_sheet = new _ssheet__WEBPACK_IMPORTED_MODULE_0__.SSheet(sheet, sheet_name);
                xstr = this.ss_id == null ? "" : this.ss_id;
                _util__WEBPACK_IMPORTED_MODULE_1__.Util.log(`SpreadSheetx getSheet 0 4 this.ss_id=${xstr}`);
                xstr = this.ss_url == null ? "" : this.ss_url;
                _util__WEBPACK_IMPORTED_MODULE_1__.Util.log(`SpreadSheetx getSheet 0 5 this.ss_url=${xstr}`);
                this.s_sheet_assoc[sheet_name] = s_sheet;
            }
            else {
                xstr = "null";
                _util__WEBPACK_IMPORTED_MODULE_1__.Util.log(`##################### SpreadSheetx error!! this.ss=${xstr} s_sheet=undefined`);
            }
        }
        else {
            xstr = s_sheet == null ? xstr = "not null" : "valid";
            _util__WEBPACK_IMPORTED_MODULE_1__.Util.log(`SpreadSheetx getSheet 2 sheet_name=${sheet_name} s_sheet=${xstr}`);
            xstr = this.ss_id == null ? "" : this.ss_id;
            _util__WEBPACK_IMPORTED_MODULE_1__.Util.log(`SpreadSheetx getSheet 2 this.ss_id=${xstr}`);
            xstr = this.ss_url == null ? "" : this.ss_url;
            _util__WEBPACK_IMPORTED_MODULE_1__.Util.log(`SpreadSheetx getSheet 2 this.ss_url=${xstr}`);
        }
        return s_sheet;
    }
}
// export default SpreadSheetx;


/***/ }),

/***/ "./src/ssheet.ts":
/*!***********************!*\
  !*** ./src/ssheet.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SSheet: () => (/* binding */ SSheet)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");

class SSheet {
    constructor(sheet, sheet_name) {
        let xstr = "";
        this.sheet_name = sheet_name;
        this.sheet = sheet;
        this.dataRange = null;
        if (this.sheet !== null) {
            this.dataRange = this.sheet.getDataRange();
            xstr = this.dataRange == null ? "" : "valid";
            _util__WEBPACK_IMPORTED_MODULE_0__.Util.log(`SSheet 1-1 T constructor this.sheet_name=${this.sheet_name} this.dataRange=${xstr}`);
        }
        else {
            xstr = this.dataRange == null ? "" : "valid";
            _util__WEBPACK_IMPORTED_MODULE_0__.Util.log(`SSheet 1-2 F constructor this.sheet_name=${this.sheet_name} this.dataRange=${xstr}`);
        }
    }
    //   this.dataRange = { "x":15, "y": 1, "height": 100, "width":9 };
    getRange(x, y, height, width) {
        let xstr = "";
        if (this.sheet != null) {
            this.dataRange = this.sheet.getRange(x, y, height, width);
            xstr = this.dataRange == null ? "" : "valid";
            _util__WEBPACK_IMPORTED_MODULE_0__.Util.log(`SSheet 2-1 getRange this.sheet_name=${this.sheet_name} this.dataRange=${xstr}`);
        }
        else {
            xstr = this.dataRange == null ? "" : "valid";
            _util__WEBPACK_IMPORTED_MODULE_0__.Util.log(`SSheet 2-2 getRange this.sheet_name=${this.sheet_name} this.dataRange=${xstr}`);
        }
    }
    fetchAndSetDataRange() {
        let xstr = "";
        if (this.sheet != null) {
            this.dataRange = this.sheet.getDataRange();
            xstr = this.dataRange == null ? "" : "valid";
            _util__WEBPACK_IMPORTED_MODULE_0__.Util.log(`SSheet 3-1 getDataRange this.sheet_name=${this.sheet_name} this.dataRange=${xstr}`);
        }
        else {
            xstr = this.dataRange == null ? "" : "valid";
            _util__WEBPACK_IMPORTED_MODULE_0__.Util.log(`SSheet 3-2 getDataRange this.sheet_name=${this.sheet_name} this.dataRange=${xstr}`);
        }
    }
    getValues() {
        let xvalues = [[""]];
        if (this.dataRange != null) {
            const values = this.dataRange.getValues();
            if (values != null) {
                xvalues = values;
            }
        }
        else {
            xvalues = [["dataRange=null"]];
        }
        return xvalues;
    }
    appendRow(data_array) {
        if (this.sheet !== null) {
            this.sheet.appendRow(data_array);
        }
    }
}


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Util: () => (/* binding */ Util)
/* harmony export */ });
class Util {
    static find_blank(data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i][0] !== '') {
                return i;
            }
        }
        return -1;
    }
    static log_init() {
    }
    static log(message) {
        Logger.log(message);
        return message;
    }
    static print_line(lines) {
        let xstr = "";
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
            });
            Util.log("\n");
        }
    }
    static detect_blank_line(line) {
        return line.indexOf('');
    }
    static remove_blank_line(lines) {
        let result = [];
        lines.forEach((line, index) => {
            if (Util.detect_blank_line(line) === -1) {
                result.push(line);
            }
        });
        return result;
    }
    static remove_upper_blank_line(lines) {
        let result = [];
        let skip_flag = true;
        lines.forEach((line, index) => {
            if (skip_flag) {
                if (Util.detect_blank_line(line) === -1) {
                    skip_flag = false;
                    result.push(line);
                }
            }
            else {
                result.push(line);
            }
        });
        return result;
    }
    static get_line_state(line) {
        if (Util.detect_blank_line(line) === -1) {
            return Util.NOT_BLANK_LINE;
        }
        else {
            return Util.BLANK_LINE;
        }
    }
    static remove_under_the_blank_row(lines) {
        let result = [];
        let range_state = Util.UPPER_BLANK_LINE_RANGE;
        let line_state = Util.BLANK_LINE;
        lines.forEach((line, index) => {
            line_state = Util.get_line_state(line);
            if (range_state === Util.UPPER_BLANK_LINE_RANGE) {
                result.push(line);
                if (line_state === Util.NOT_BLANK_LINE) {
                    range_state = Util.NOT_BLANK_LINE_RANGE;
                }
            }
            else if (range_state === Util.NOT_BLANK_LINE_RANGE) {
                if (line_state === Util.NOT_BLANK_LINE) {
                    result.push(line);
                }
                else {
                    range_state = Util.BOTTOM_BLANK_LINE_RANGE;
                }
            }
        });
        return result;
    }
    static remove_left_blank_cols(lines) {
        const list = Util.detect_ws_level(lines);
        let pos = Math.min(...list);
        return Util.reform_sub(lines, pos);
    }
    static reform_sub(lines, pos) {
        let result = [];
        lines.forEach((line, index) => {
            let result2 = [];
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
    static getAsJSON(values) {
        const init_value = { "": "" };
        const xarray = { "": init_value };
        //先頭行にラベルがあるものとして、それ以降の行に各カラムにラベルをキーとして、カラムの値を値とする連想配列を作成
        let first_i = 0;
        let second_i_str = "";
        let index = 0;
        let index_str = "";
        for (let i = 1; i < values.length; i++) {
            index = i - 1;
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
    static son2string(sn) {
        if (typeof sn === "string") {
            return sn;
        }
        else {
            return "";
        }
    }
    static is_valid_string(str) {
        if (str === null || typeof str === "undefined") {
            return false;
        }
        if (str.replace(/^\s*$/, '').length == 0) {
            return false;
        }
        return true;
    }
    static make_assoc_array_array(xarray) {
        let result = [{}];
        if (xarray.length > 0) {
            const keys = xarray[0];
            Util.log(`Util.make_assoc_array_array keys=${keys}`);
            xarray.slice(1).forEach((values, index) => {
                let obj = {};
                keys.forEach((key, i) => {
                    obj[key] = values[i];
                });
                result.push(obj);
            });
        }
        return result;
    }
    static dump_array(array) {
        array.forEach((item, index) => {
            Util.log(`listx_main ${index} 0=${item[0]} 1=${item[1]}`);
        });
    }
    static detect_ws_level(lines) {
        let no_ws_level_list = [];
        lines.forEach((line, index) => {
            line.forEach((word, i) => {
                if (word !== '') {
                    no_ws_level_list.push(i);
                    return;
                }
            });
        });
        // console.log(`ws_level_list=${ws_level_list}`);
        return no_ws_level_list;
    }
}
Util.UPPER_BLANK_LINE_RANGE = 1;
Util.NOT_BLANK_LINE_RANGE = 2;
Util.BOTTOM_BLANK_LINE_RANGE = 3;
Util.BLANK_LINE = 10;
Util.NOT_BLANK_LINE = 11;
// this.Util = Util


/***/ }),

/***/ "./src/xsheet.ts":
/*!***********************!*\
  !*** ./src/xsheet.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XSheet: () => (/* binding */ XSheet)
/* harmony export */ });
/* harmony import */ var _condition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./condition */ "./src/condition.ts");
/* harmony import */ var _sheetx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sheetx */ "./src/sheetx.ts");


class XSheet {
    constructor(settings, cond_pat, cond_value) {
        this.src_sheetx = null;
        this.data_x = [[]];
        this.found_index = -1;
        this.width = 0;
        this.height = 0;
        this.dest_row = 0;
        this.dest_sheetx = null;
        this.cols = 0;
        this.settings = settings;
        this.cond_pat = cond_pat;
        this.cond_value = cond_value;
        this.ss = SpreadsheetApp.openById(settings.ss_id);
    }
    extract() {
        this.src_sheetx = new _sheetx__WEBPACK_IMPORTED_MODULE_1__.Sheetx(this.ss, this.settings.src_sheetname);
        Logger.log(`this.src_sheetx.hength=${this.src_sheetx.height}`);
        this.found_index = this.src_sheetx.find_blank();
        this.width = this.src_sheetx.width;
        this.height = this.src_sheetx.height;
        Logger.log(`found_index=${this.found_index}`);
        if (this.found_index < 0) {
            // do nothing
        }
        else {
            this.src_sheetx.reform(this.found_index);
            this.width = this.src_sheetx.width;
            this.height = this.src_sheetx.height;
            this.dest_sheetx = new _sheetx__WEBPACK_IMPORTED_MODULE_1__.Sheetx(this.ss, this.settings.dest_sheetname);
            if (this.dest_sheetx != null && this.dest_sheetx.sheet != null) {
                this.dest_sheetx.sheet.getDataRange().clear();
                this.data_x = this.src_sheetx.data_x;
                this.copy_to_dest(this.data_x, this.height, this.dest_sheetx, this.width, this.cond_pat, this.cond_value);
            }
        }
    }
    copy_to_dest(data_x, height, dest_sheetx, cols, cond_pat, cond_value) {
        let dest_array = [];
        dest_array.push(data_x[0]);
        let ret = false;
        for (let i = 1; i < height; i++) {
            ret = _condition__WEBPACK_IMPORTED_MODULE_0__.Condition.select(data_x, i, 1, cond_pat, cond_value);
            if (ret) {
                dest_array.push(data_x[i]);
            }
        }
        if (dest_sheetx.sheet != null) {
            const dest_range = dest_sheetx.sheet.getRange(1, 1, dest_array.length, cols);
            dest_range.setValues(dest_array);
        }
    }
}
// this.XSheet = XSheet


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _condition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./condition */ "./src/condition.ts");
/* harmony import */ var _sheetx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sheetx */ "./src/sheetx.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util.ts");
/* harmony import */ var _xsheet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./xsheet */ "./src/xsheet.ts");
/* harmony import */ var _infox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./infox */ "./src/infox.ts");
/*
import { sampleFunc } from 'sample_module';

// embed imported module function
(global as any).func1 = sampleFunc;

// embed arrow function
(global as any).func2 = (): void => {
  const msg: string = 'hello hello !!';
  console.log(msg);
};
*/





__webpack_require__.g.Condition = _condition__WEBPACK_IMPORTED_MODULE_0__.Condition;
__webpack_require__.g.Sheetx = _sheetx__WEBPACK_IMPORTED_MODULE_1__.Sheetx;
__webpack_require__.g.Util = _util__WEBPACK_IMPORTED_MODULE_2__.Util;
__webpack_require__.g.XSheet = _xsheet__WEBPACK_IMPORTED_MODULE_3__.XSheet;
__webpack_require__.g.Infox = _infox__WEBPACK_IMPORTED_MODULE_4__.Infox;

})();

/******/ })()
;