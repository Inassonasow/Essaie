import { Component, EventEmitter, OnInit, Output, inject, output, signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule,TagModule, DialogModule, CommonModule, ProductFormComponent],
})
export class ProductListComponent implements OnInit {

  constructor() {}
  
  private readonly productsService = inject(ProductsService);
  public readonly products = this.productsService.products;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  ngOnInit() {
    this.productsService.get().subscribe();

  
  }

  public onCreate() {//cette methode est appeler dans le component product_list.html
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }
  
 // Méthode pour ajouter un produit au panier
 ajout_produit_panier(product: Product) {
  console.log("Produit ajouté au panier :", product);
  this.productsService.ajouter_panier(product); // Appel  du service
  alert("Produit ajouté au panier");
  console.log('Produit ajouté dans le composant enfant :', product);
}
  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }
}
