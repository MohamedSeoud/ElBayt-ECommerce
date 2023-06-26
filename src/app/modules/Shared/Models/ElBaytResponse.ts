import { EnumResponseResult } from '../Enums/EnumResponseResult';

export class ElBaytResponse<T> {
  public Result: EnumResponseResult;
  public Data: T;
  public Errors: Array<string>;

  constructor() { }
}
