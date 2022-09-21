import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Post } from '../../Post.model';

@Component({
  selector: 'kendo-grid-edit-form',
  styles: [
    `
      input[type='text'] {
        width: 100%;
      }
      .k-inline-checkbox {
        display: inline-flex;
      }
    `,
  ],
  template: `
    <kendo-dialog
      *ngIf="active"
      [width]="300"
      [height]="450"
      (close)="closeForm()"
    >
      <kendo-dialog-titlebar>
        {{ isNew ? 'Add new post' : 'Edit post' }}
      </kendo-dialog-titlebar>

      <form novalidate class="k-form" [formGroup]="editForm">
        <kendo-formfield>
          <kendo-label [for]="id" text="ID"></kendo-label>
          <kendo-numerictextbox
            formControlName="id"
            #id
            format="n0"
            [disabled]="true"
          ></kendo-numerictextbox>
        </kendo-formfield>
        <kendo-formfield>
          <kendo-label [for]="userId" text="UserID"></kendo-label>
          <kendo-numerictextbox
            formControlName="userId"
            #userId
            required
            format="n0"
          ></kendo-numerictextbox>

          <kendo-formhint>Type UserID</kendo-formhint>
          <kendo-formerror>Error: UserID is required</kendo-formerror>
        </kendo-formfield>

        <kendo-formfield>
          <kendo-label [for]="title" text="Title"></kendo-label>
          <kendo-textbox formControlName="title" #title required>
          </kendo-textbox>

          <kendo-formhint>Type title</kendo-formhint>
          <kendo-formerror>Error: Title is required</kendo-formerror>
        </kendo-formfield>

        <kendo-formfield>
          <kendo-label [for]="body" text="Body"></kendo-label>
          <kendo-textbox formControlName="body" #body required> </kendo-textbox>

          <kendo-formhint>Type body</kendo-formhint>
          <kendo-formerror>Error: Body is required</kendo-formerror>
        </kendo-formfield>
      </form>

      <kendo-dialog-actions>
        <button kendoButton (click)="onCancel($event)">Cancel</button>
        <button
          kendoButton
          themeColor="primary"
          [disabled]="!editForm.valid"
          (click)="onSave($event)"
        >
          Save
        </button>
      </kendo-dialog-actions>
    </kendo-dialog>
  `,
})
export class GridEditFormComponent {
  public active = false;
  public editForm: FormGroup = new FormGroup({
    id: new FormControl(),
    userId: new FormControl(),
    title: new FormControl(),
    body: new FormControl(),
  });

  @Input() public isNew = false;

  @Input() public set model(post: Post) {
    this.editForm.reset(post);

    // toggle the Dialog visibility
    this.active = post !== undefined;
  }

  @Output() cancel: EventEmitter<undefined> = new EventEmitter();
  @Output() save: EventEmitter<Post> = new EventEmitter();

  public onSave(e: PointerEvent): void {
    e.preventDefault();
    this.save.emit(this.editForm.value);
    this.active = false;
  }

  public onCancel(e: PointerEvent): void {
    e.preventDefault();
    this.closeForm();
  }

  public closeForm(): void {
    this.active = false;
    this.cancel.emit();
  }
}
