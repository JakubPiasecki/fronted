import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NameTransformationService {
  toUpperCase(name: string): string {
    return name.toUpperCase();
  }

  toLowerCase(name: string): string {
    return name.toLowerCase();
  }

  capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
