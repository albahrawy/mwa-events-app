import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class PopupService {

    constructor(private _snackBar: MatSnackBar) { }

    show(message) {
        //alert(message);
        this._snackBar.open(message, 'X', {
            duration: 2000,
          });
    }

    confirm(message) {
        return confirm(message);
    }

}