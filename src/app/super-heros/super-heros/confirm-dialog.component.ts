import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>Confirmación</h2>
    <mat-dialog-content>¿Estás seguro de querer borrar a {{data.name}}?</mat-dialog-content>
    <mat-dialog-actions class="action-buttons">
      <button mat-raised-button color="primary" [mat-dialog-close]="true">Aceptar</button>
      <button mat-raised-button color="accent" [mat-dialog-close]="false">Cancelar</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./super-heros.component.sass']
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }) {}
}
