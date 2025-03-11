import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Speciality } from '../../interfaces/speciality';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SpecialityService } from '../../services/speciality.service';
import { SharedService } from 'src/app/shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { SpecialityModalComponent } from '../../modals/speciality-modal/speciality-modal.component';
import Swal from 'sweetalert2';
import { filter } from 'rxjs';

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

  specialityUpdate(speciality: Speciality){
    this.dialog
        .open(SpecialityModalComponent, {disableClose: true, width: '400px', data: speciality})
        .afterClosed()
        .subscribe((result) => {
          if(result === 'true') this.getSpeciality();
        })
  }


  specialityRemove(speciality: Speciality){

    Swal.fire({
      title: '¿Confirma eliminar la especialidad?',
      text: speciality.specialityName,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, Eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then((result) => {

      if(result.isConfirmed){
        this._specialityService.delete(speciality.id).subscribe({
          next: (data) => {
            if(data.success){
              this._specialityShare.showAlert('La especialidad fue eliminada', 'Complete');
              this.getSpeciality();
            }
            else{
              this._specialityShare.showAlert('No se pudo eliminar al especialidad', 'Error!');
            }
          },
          error: (e) => {
            this._specialityShare.showAlert(e.error.message, "Error!");
          }
        });
      }
    });
    
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
          this._specialityShare.showAlert('No se encontraron datos', 'Advertencia!');
        }      
      },
      error: (e) => {
        this._specialityShare.showAlert(e.error.message, "Error!");
      }  
    });
  }


  applyFilterList(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    //Valida si la tabla esta con paginardor. Si lo esta, lo devuelve a la pagina #1
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }

  }

  
  ngOnInit(): void {
    this.getSpeciality();
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.tablePaginator;
  }

}
