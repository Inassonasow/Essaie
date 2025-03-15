import {
  Component,  
} from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { BadgeModule } from 'primeng/badge';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CommonModule } from "@angular/common";
import { ProductListComponent } from "./products/features/product-list/product-list.component";
import { ProductsService } from "app/products/data-access/products.service";
import {  effect } from '@angular/core';
import { Product } from "app/products/data-access/product.model";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ContactComponent } from '../app/contact/contact.component';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, BadgeModule, CommonModule,DialogModule, ButtonModule,ProductListComponent,ContactComponent],
})
export class AppComponent {
  title = "E-shop";
  quantPanier: number =0 ;
  panier: Product[] = []; // Variable pour stocker la liste des produits du panier
  displayDialog: boolean = false; // Variable pour contrôler l'affichage du dialogue



 
  constructor(private router: Router, private productsService: ProductsService) {
    console.log("🔥 AppComponent chargé !");

    

    // Utilise un "effect" pour mettre à jour quantPanier chaque fois que le panier change
    effect(() => {
      this.panier = this.productsService.cart(); // Met à jour la liste des produits du panier
      this.quantPanier = this.productsService.getCartCount();// Met à jour le nombre d'articles dans le panier
      console.log("quantPanier mis à jour :", this.quantPanier);
    });
  }
  // Méthode pour ouvrir le dialogue
  showDialog() {
    this.displayDialog = true;
  }

  // Méthode pour fermer le dialogue
  hideDialog() {
    this.displayDialog = false;
  }


   // Méthode pour supprimer un produit du panier
   removeFromCart(productId: number) {
     // Supprime le produit du panier dans le service
  this.productsService.removeFromCart(productId);

  // Met à jour le panier local
  this.panier = this.productsService.cart();

  // Met à jour la quantité du panier
  this.quantPanier = this.productsService.getCartCount();
  }

  

  ngOnInit() {
    // Initialisation supplémentaire si nécessaire
  }
 
}
