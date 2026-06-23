import { Pipe, PipeTransform } from '@angular/core';
import { DsAvatarBackgroundColor } from '../enums/ds-avatar-background-color.enum';

const AVATAR_BACKGROUND_COLOR_CYCLE: readonly DsAvatarBackgroundColor[] = [
  DsAvatarBackgroundColor.Blue,
  DsAvatarBackgroundColor.Pink,
  DsAvatarBackgroundColor.Purple,
  DsAvatarBackgroundColor.Teal,
  DsAvatarBackgroundColor.CleanPoolBlue,
];

@Pipe({
  name: 'avatarColorSelector',
})
export class AvatarColorSelectorPipe implements PipeTransform {
  transform(value: string): DsAvatarBackgroundColor {
    if (!value) {
      return DsAvatarBackgroundColor.CleanPoolBlue;
    }
    const cp = value.codePointAt(0);
    if (cp === undefined) {
      return DsAvatarBackgroundColor.CleanPoolBlue;
    }
    const idx = cp % AVATAR_BACKGROUND_COLOR_CYCLE.length;
    return AVATAR_BACKGROUND_COLOR_CYCLE[idx];
  }
}
