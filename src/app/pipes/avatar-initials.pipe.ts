import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarInitials',
  standalone: true
})
export class AvatarInitialsPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }

    // Split the value into words (assuming each word is separated by a space)
    const words = value.split(' ');

    // Take the first letter from each word and join them
    const initials = words.map(word => word.charAt(0)).join('');

    return initials.toUpperCase();
  }

}
