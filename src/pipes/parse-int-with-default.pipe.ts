import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class ParseIntWithDefaultPipe<T = string, R = number>
  implements PipeTransform<T, R> {
  constructor(private readonly defaultValue: R) {}

  transform(value: T, metadata?: ArgumentMetadata): R {
    if (isNil(value) || typeof value !== 'string') {
      return this.defaultValue;
    }

    const val = parseInt(value, 10);
    if (isNaN(val) || val < 0) {
      return this.defaultValue;
    }
    return (val as unknown) as R;
  }
}
