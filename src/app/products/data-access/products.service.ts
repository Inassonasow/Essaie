import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: "root"
}) export class ProductsService {

    private readonly http = inject(HttpClient);
    private readonly path = "/api/products";
    
    private readonly _products = signal<Product[]>([]);
    public readonly products = this._products.asReadonly();

    //Signal pour stocker les produits du panier
    private readonly _cart = signal<Product[]>([]);
    public readonly cart = this._cart.asReadonly();

    // Ajouter un produit au panier
    public ajouter_panier(product: Product) {
        this._cart.update(cart => [...cart, product]);
    }


    public removeFromCart(productId: number) {
        this._cart.update(cart => cart.filter(product => product.id !== productId));
      }

    // Récupérer le nombre d'articles dans le panier
  public getCartCount(): number {
    return this._cart().length;
  }



  

    public get(): Observable<Product[]> {
        return this.http.get<Product[]>(this.path).pipe(
            catchError((error) => {
                return this.http.get<Product[]>("assets/products.json");
            }),//Récupère la liste des produits via une requête HTTP GET. En cas d'erreur (par exemple si l'API ne répond pas), il charge les produits à partir d'un fichier local assets/products.json.
            tap((products) => this._products.set(products)),
        );
    }

    public create(product: Product): Observable<boolean> {//Crée un nouveau produit via une requête HTTP POST. En cas d'erreur, il renvoie un true (simule une réussite) et met à jour localement la liste des produits en ajoutant le nouveau produit.
        return this.http.post<boolean>(this.path, product).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => [product, ...products])),
        );
    }

    public update(product: Product): Observable<boolean> {// Met à jour un produit existant via une requête HTTP PATCH. En cas d'erreur, il renvoie également true et met à jour la liste localement avec le produit mis à jour.
        return this.http.patch<boolean>(`${this.path}/${product.id}`, product).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => {
                return products.map(p => p.id === product.id ? product : p)
            })),
        );
    }

    public delete(productId: number): Observable<boolean> {//Supprime un produit via une requête HTTP DELETE. En cas d'erreur, il renvoie true et met à jour la liste en supprimant le produit localement.
        return this.http.delete<boolean>(`${this.path}/${productId}`).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => products.filter(product => product.id !== productId))),
        );
    }
}
//Ce service est utilisé pour interagir avec l'API backend (ou un fichier JSON) pour effectuer des actions CRUD (création, lecture, mise à jour, suppression) sur les produits. 
//Il gère aussi l'état des produits via un signal (signal<Product[]>).


//La gestion des produits se fait dans le service à l'aide du signal,
//  ce qui permet de suivre l'état des produits dans l'application sans avoir besoin de stocker cela dans un store externe.