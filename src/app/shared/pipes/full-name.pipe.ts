import { Pipe, PipeTransform } from '@angular/core';
import { IStudent } from 'src/app/core/models/student';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: IStudent, ...args: unknown[]): unknown {
    const newValue = `${value.nombre} ${value.apellido}`;
    switch (args[0]) {
      case 'mayuscula':
        return newValue.toUpperCase();
      case 'minuscula':
        return newValue.toLowerCase();
      default:
        return newValue;
    }
  }

}
