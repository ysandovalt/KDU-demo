import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  content: string;
  usuarios: any;

  page = 1;
  pages = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  getRequestParams(page, pageSize): any {
    let params = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveUsers(): void {

    const params = this.getRequestParams(this.page, this.pageSize);

    this.userService.getAllUsers(params)
      .subscribe(
        response => {
          const { usuarios, current, totalItems, totalPages } = response;
          this.usuarios = usuarios;
          this.count = totalItems;
          this.pages = totalPages;
         },
        err => {
          console.log(err);
          this.content = JSON.parse(err.error).message;
        });      
  }

  handlePageChange(event): void {
    this.page = event;
    this.retrieveUsers();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveUsers();
  }

}
