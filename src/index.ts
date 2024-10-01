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
import { Condition } from "./condition"
import { Sheetx } from "./sheetx"
import { Util } from "./util"
import { XSheet } from './xsheet';

declare const global: {
  [x: string]: unknown;
};

global.Condition = Condition;
global.Sheetx = Sheetx;
global.Util = Util;
global.XSheet = XSheet;
