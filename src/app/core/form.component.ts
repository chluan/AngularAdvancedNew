import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { Observable } from "rxjs";
import { filter, map, distinctUntilChanged, first } from "rxjs/operators";

@Component({
    selector: "paForm",
    templateUrl: "form.component.html",
    styleUrls: ["form.component.css"]
})
export class FormComponent {

    product: Product = new Product();

    constructor(private model: Model,
        @Inject(SHARED_STATE) private stateEvents: Observable<SharedState>) {
        stateEvents
            // .pipe(map(state => state.mode == MODES.EDIT ? state.id : -1))
            // .pipe(distinctUntilChanged())
            // .pipe(filter(id => id != 3))
            // .subscribe((id) => { 
            //     this.editing = id != -1; 
            //     this.product = new Product(); 
            //     if (id != -1) { 
            //         Object.assign(this.product, this.model.getProduct(id)) 
            //     } 
            // });
            .pipe(distinctUntilChanged((firstState, secondState) => 
                firstState.mode == secondState.mode && firstState.id == secondState.id))
            .subscribe(update => {
                this.product = new Product();
                if (update.id != undefined) {
                    Object.assign(this.product, this.model.getProduct(update.id))
                }
                this.editing = update.mode == MODES.EDIT;
            });
    }

    // get editing(): boolean {
    //     return this.state.mode == MODES.EDIT;
    // }

    editing: boolean = false;

    submitForm(form: NgForm) {
        if (form.valid) {
            this.model.saveProduct(this.product);
            this.product = new Product();
            form.reset();
        }
    }
    resetForm() { this.product = new Product(); }
}