import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface User {
  id: number;
  name: string;
  age: number;
}

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {

  private _users: User[] = [];
  private _users$ = new Subject<User[]>();
  users$: Observable<User[]> = this._users$.asObservable();
  editingUser: User | null = null;


  // ------------------------------------------------------------------------------------
  constructor() {
    this._users = [
      { id: 1, name: 'User 1', age: 30 },
      { id: 2, name: 'User 2', age: 25 },
      { id: 3, name: 'User 3', age: 35 },
    ];
  }

  // ------------------------------------------------------------------------------------
  ngOnInit(): void {
    //  algo pasa con este ngOnInit que cae antes de que tengamos datos en los observables
    setTimeout( () => { this.refreshUsers(); }, 0 );
  }

  // ------------------------------------------------------------------------------------
  refreshUsers = () => {
    console.log(`refreshUsers ${this._users.length} `);
    this._users$.next(this._users);
  }

  // ------------------------------------------------------------------------------------
  editUser(user: User) {
    this.editingUser = { ...user };
  }

  // ------------------------------------------------------------------------------------
  cancelEditing() {
    this.editingUser = null;
  }

  // ------------------------------------------------------------------------------------
  saveUser() {
    if (this.editingUser) {
      if (this.editingUser.id === 0) {
        // Assign an id to the new user
        this.editingUser.id = this._users.length + 1;
        this._users.push(this.editingUser);
      } else {
        const index = this._users.findIndex(u => u.id === this.editingUser?.id);
        this._users[index] = this.editingUser;
      }
      this._users$.next(this._users);
      this.editingUser = null;
    }
  }

  // ------------------------------------------------------------------------------------
  addUser() {
    this.editingUser = { id: 0, name: '', age: 0 };
  }

  // ------------------------------------------------------------------------------------
  deleteUser(user: User) {
    // delete the user and update the observable array here
    const index = this._users.findIndex(u => u.id === user.id);
    this._users.splice(index, 1);
    this._users$.next(this._users);
  }


}
