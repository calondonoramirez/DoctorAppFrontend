import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Doctor } from '../../interfaces/doctor';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DoctorService } from '../../services/doctor.service';
import { SharedService } from 'src/app/shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDoctorComponent } from '../../modals/modal-doctor/modal-doctor.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = [
    'name',
    'lastName',
    'phone',
    'genre',
    'nameSpeciality',
    'state',
    'actions'
  ];

  /**   *
   */
  constructor(
    private _doctorService: DoctorService,
    private _sharedService: SharedService,
    private  dialog: MatDialog
  ){}
  
  dataInitial: Doctor[] = [];
  dataSource = new MatTableDataSource(this.dataInitial);
  @ViewChild(MatPaginator) paginator! : MatPaginator;

 
  GetDoctors(){
    this._doctorService.list().subscribe({
      next: (data) => {
        if(data.success){
          this.dataSource = new MatTableDataSource(data.result);
          this.dataSource.paginator = this.paginator;
        }
        else{
          this._sharedService.showAlert('No se encontraron datos', 'Advertencia!');
        }
      },
      error: (e) => {
        this._sharedService.showAlert(e.error.message, "Error!");
      }
    });
  }

  newDoctor(){
    this.dialog
        .open(ModalDoctorComponent, {disableClose:true, width: '600px'})
        .afterClosed()
        .subscribe((result) => {
          if(result.success){
            this.GetDoctors();
          }
        })
  }

  updateDoctor(doctor: Doctor){
    this.dialog
        .open(ModalDoctorComponent, {disableClose: true, width: '600px', data: doctor })
        .afterClosed()
        .subscribe((result) => {
          if(result === 'true'){
            this.GetDoctors();
          }
        });
  }

  removeDoctor(doctor: Doctor){
    Swal.fire({
      title: '¿Desea eliminar el Doctor?',
      text: doctor.name + ' ' + doctor.lastName,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.isConfirmed){
        this._doctorService.delete(doctor.id).subscribe({
          next: (data) => {
            if(data.success){
              this._sharedService.showAlert('El medico fue eliminado con exito', 'Complete');
              this.GetDoctors();
            }
            else{
              this._sharedService.showAlert('No se pudo eliminar el medico', 'Complete');
            }
          },
          error: (e) => {
            this._sharedService.showAlert(e.error.message, "Error!");
          }
        })
      }
    })
  }

  applyFilterList(event: Event)
  {
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
    this.GetDoctors();
  }

}
