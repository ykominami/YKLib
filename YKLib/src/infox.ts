import { SpreadSheetx } from "./spreadsheetx";
import { SSheet } from "./ssheet"
import { Util } from "./util";
import { Itemx } from "./itemx";
import { SearchItem } from "./searchitem";
import { Itemvalue } from "./itemvalue";

type StringOrNull = string | null;


export class Infox {
    ss_id: string
    sheet_name: string
    ssxx: SpreadSheetx | null
    ssheet: SSheet | null
    values: string[][]
    constructor(ss_id:string, sheet_name: string) {
        if( ! Util.is_valid_string(ss_id)) {
            throw new Error("Infox ss_id is invalide");
        }
        if( ! Util.is_valid_string(sheet_name)) {
            throw new Error("Infox sheet_name is invalide");
        }
        this.ss_id = ss_id;
        this.sheet_name = sheet_name;
        this.ssxx = null;
        this.ssheet = null;
        this.values = [[""]];
        if( ! Util.is_valid_string(this.ss_id) || ! Util.is_valid_string(this.sheet_name)){
            throw new Error("Infox this.ss_id is invalide");
        }
        this.getValues()
    }
    setup(): void {
        if (this.ssxx === null){
            this.ssxx = new SpreadSheetx(this.ss_id);
        }
        if( this.ssxx !== null){
            this.ssheet = this.ssxx.getSheet(this.sheet_name);
        }
    }
    appendRow(data_array: any[]): void {
        // [this.name, this.email, this.inquiry, "受付", new Date(), new Date()]);
        this.setup();
        if( this.ssheet !== null){
            this.ssheet.appendRow(data_array)
        }
    }

    getValues(): string[][] {
        this.setup();
        if (this.ssheet !== null){
            this.ssheet.fetchAndSetDataRange();
            this.values = this.ssheet.getValues();
        }
        return this.values
    }
     getSSId(infoparam: InfoParam): string {
        const values = this.getValues();
        const year: StringOrNull = infoparam.year;
        const kind: StringOrNull = infoparam.kind;
        const kind2: StringOrNull = infoparam.kind2;
        const item: SearchItem = this.make_item(
            year,
            kind,
            kind2);
        return this.get_id_from_values(values, item);
    }
    make_item(year_str: StringOrNull = null,
        kind_str: StringOrNull = null,
        kind2_str: StringOrNull = null): SearchItem {
        const INDEX_ID: number = 4;
        const INDEX_KIND: number = 0
        const INDEX_YEAR: number = 1
        // const INDEX_TITLE: number = 2
        const INDEX_KIND2: number = 3
        // const INDEX_URL: number = 6

        const value_item: Itemvalue = new Itemvalue({ index: INDEX_ID, value: "" });
        const search_items: Itemx[] = [];
        if (year_str != null) {
            const s1_item: Itemx = new Itemx({ index: INDEX_YEAR, name: year_str });
            search_items.push(s1_item);
        }
        if (kind_str != null) {
            const s2_item: Itemx = new Itemx({ index: INDEX_KIND, name: kind_str });
            search_items.push(s2_item);
        }
        if (kind2_str != null) {
            const s3_item: Itemx = new Itemx({ index: INDEX_KIND2, name: kind2_str });
            search_items.push(s3_item);
        }
        const searchitem: SearchItem = new SearchItem({ searches: search_items, value: value_item });
        return searchitem;
    }
    get_id_from_values(d: string[][], item: SearchItem): string {
        let result_start: string[][] = d
        let result_end: string[][] = []
        let ret_str: string = "";
        let xstr: string = "";
        const search_items = item.searches;
        const value_item = item.value;

        // Util.log(`Infox get_id_from_values result_start=${result_start}`);
        // Util.log(`Infox get_id_from_values =1-X d d.length=${d.length}`);
        d.map(it => {
            it.map(x => {
                Util.log(`${x}, `)
            });

            Util.log("\n");
        })

        const count = search_items.length;
        for (let i = 0; i < count; i++) {
            const item = search_items[i];
            xstr = item.name == null ? "null" : "not null";
            // Util.log(`Infox get_id_from_values =4-X i=${i} item.value=${xstr} result_start.length=${result_start.length}`);
            result_end = result_start.filter((v) => {
                return v[item.index] == item.name
            })
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
