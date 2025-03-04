import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Speciality } from '../../interfaces/speciality';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SpecialityService } from '../../services/speciality.service';
import { SharedService } from 'src/app/shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { SpecialityModalComponent } from '../../modals/speciality-modal/speciality-modal.component';

@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrls: ['./speciality-list.component.css']
})
export class SpecialityListComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = [
    'specialityName', 'description', 'state', 'actions'
  ];

  dataSpeciality: Speciality[] = [];
  
  dataSource = new MatTableDataSource(this.dataSpeciality);

  //paginacion de la tabla
  @ViewChild(MatPaginator) tablePaginator!: MatPaginator;

  /**
  */
  constructor(private _specialityService: SpecialityService,
              private _specialityShare: SharedService,
              private dialog: MatDialog) { }

  
    specialityNew(){
      this.dialog
          .open(SpecialityModalComponent, {disableClose: true, width: '400px'})
          .afterClosed()
          .subscribe((result) => {
            if(result === 'true') this.getSpeciality();
          })
    }

  getSpeciality(){
    this._specialityService.list().subscribe({
      next: (data) => {
        if(data.success)
        {
          this.dataSource = new MatTableDataSource(data.result);
          this.dataSource.paginator = this.tablePaginator;
        }
        else
        {
          this._specialityShare.showAlert(
            'No se encontraron datos',
            'Advertencia!'
          );
        }      
      },
      error: (e) => {}  
    });
  }
  
  ngOnInit(): void {
    this.getSpeciality();
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.tablePaginator;
  }

}
