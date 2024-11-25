import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatList, MatListItem } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { UserLoadingComponent } from '../user-loading/user-loading.component';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatIcon,
    MatProgressBarModule,
    CommonModule,
    FormsModule,
    UserLoadingComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Input() userNames: string[] = [];
  @Input() object: { userName: string; userLastName: string; userPhoto?: string }[] = [];
  @Input() loading = false;
  
  @Output() selectUser = new EventEmitter<string>();

  filterText = '';
  skeletonLoading: any[] = new Array(4);



  get filteredUserNames(): string[] {
    return this.filterText
      ? this.userNames.filter(user =>
          user.toLowerCase().includes(this.filterText.toLowerCase())
        )
      : this.userNames;
  }

  getUserPhoto(userName: string): string | undefined {
    const user = this.object.find(
      ({ userName: uName, userLastName }) => `${uName} ${userLastName}` === userName
    );
    return user?.userPhoto;
  }
}
