/* @flow */

import Type from './Type';

import getErrorMessage from "../getErrorMessage";
import type Validation, {ErrorTuple, IdentifierPath} from '../Validation';

export default class NumericLiteralType<T: number> extends Type {
  typeName: string = 'NumericLiteralType';
  value: T;

  *errors (validation: Validation<any>, path: IdentifierPath, input: any): Generator<ErrorTuple, void, void> {
    const {value} = this;
    if (input !== value) {
      yield [path, getErrorMessage('ERR_EXPECT_EXACT_VALUE', value), this];
    }
  }

  accepts (input: any): boolean {
    return input === this.value;
  }

  compareWith (input: Type<any>): -1 | 0 | 1 {
    if (input instanceof NumericLiteralType && input.value === this.value) {
      return 0;
    }
    else {
      return -1;
    }
  }

  toString (): string {
    return `${this.value}`;
  }

  toJSON () {
    return {
      typeName: this.typeName,
      value: this.value
    };
  }
}