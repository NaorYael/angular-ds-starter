import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type DsAvatarSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-avatar',
  templateUrl: './ds-avatar.component.html',
  styleUrl: './ds-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsAvatarComponent {
  readonly name = input('');
  readonly imageUrl = input('');
  readonly size = input<DsAvatarSize>('md');

  protected readonly initials = computed(() => {
    const parts = this.name()
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (!parts.length) {
      return '?';
    }

    return parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');
  });
}
