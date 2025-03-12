import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { user } from '../../interfaces/user';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import { SharedService } from 'src/app/shared/shared.service';
import { UserModalComponent } from '../../modals/user-modal/user-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = [
    'userName',
    'name',
    'lastName',
    'email',
    'role'
  ];

  dataInitial: user[] = [];
  dataSource = new MatTableDataSource(this.dataInitial);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  /**
   *
   */
  constructor(
    private userService: UserService,
    private sharedService: SharedService,
    private dialog: MatDialog
  ) {    
  }

  getUsers(){
    this.userService.list().subscribe({
      next: (data) => {
        if(data.success) {
          this.dataSource = data.result;
          this.dataSource.paginator = this.paginator;
      }
      else{
        this.sharedService.showAlert('No se encontraron datos', 'Advertencia!');
      }
    },
    error: (e) => {}
    })
  }

  newUser(){
    this.dialog
            .open(UserModalComponent, {disableClose:true, width: '600px'})
            .afterClosed()
            .subscribe((result) => {
              if(result === 'true'){
                this.getUsers();
              }
            })
  }

  applyFilterList(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  
  
  ngOnInit(): void {
    this.getUsers();
  }

}
