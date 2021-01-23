import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class ParseQueryPipe<T> implements PipeTransform<T, T[]> {
  constructor(private readonly enumType: T) {}

  transform(value: unknown, metadata: ArgumentMetadata): T[] {
    if (isNil(value)) return [];

    const enumValues = Object.values(this.enumType);
    let params = [];
    if (
      typeof value === 'string' &&
      value !== '' &&
      enumValues.includes(value.toLowerCase())
    ) {
      params.push(value.toLowerCase());
    } else {
      params = Object.values(value)
        .map((v) => v.toLowerCase())
        .filter((v) => enumValues.includes(v));
    }

    return params;
  }
}
