import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarInitialsPipe } from 'app/pipes/avatar-initials.pipe';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule, AvatarInitialsPipe],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {
  @Input()username: string | undefined = 'KindChef420<';
  @Input()email: string | undefined = 'joedoe@example.com';

}
