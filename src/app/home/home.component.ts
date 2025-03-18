import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { Router } from '@angular/router';
import {  inject,  signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ProductsService } from "app/products/data-access/products.service";



@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [CardModule, RouterLink, ButtonModule, DataViewModule,DialogModule,TagModule,CommonModule],
})
export class HomeComponent {
  public readonly appTitle = "SDIAGNE SHOP";
  constructor(private router: Router) {}
  private readonly productsService = inject(ProductsService);
  public readonly products = this.productsService.products;

  exploreProducts() {
    this.router.navigate(['/products']); // Redirige vers la page des produits
  }

  produit = [
    {
    name: "Bamboo Watch",
		image:"assets/images/bamboo-watch.jpg",
    price: 65
    },
    {
      name: "grey-t-shirt",
      image:"assets/images/grey-t-shirt.jpg",
      price: 65
    },
    {
      name: "lime-band",
      image:"assets/images/lime-band.jpg",
      price: 65
    },
    {
      name: "mini-speakers",
      image: "assets/images/mini-speakers.jpg",
      price: 65
    },
    {
      name: "painted-phone",
      image:"assets/images/painted-phone-case.jpg",
      price: 65
    },
    {
      name: "pink-band",
      image:"assets/images/pink-band.jpg",
      price: 65
    },
  ];
  
}
