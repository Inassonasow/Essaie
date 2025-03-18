import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ProductsService {

    private readonly http = inject(HttpClient);
    private readonly path = "/api/products";
    
    private readonly _products = signal<Product[]>([]);
    public readonly products = this._products.asReadonly();

    // Signal pour stocker les produits du panier
    private readonly _cart = signal<Product[]>([]);
    public readonly cart = this._cart.asReadonly();

    // Ajouter un produit au panier
    public ajouter_panier(product: Product) {
        this._cart.update(cart => [...cart, product]);
    }

    // Supprimer un produit du panier
    public removeFromCart(productId: number) {
        this._cart.update(cart => cart.filter(product => product.id !== productId));
    }

    // Récupérer le nombre d'articles dans le panier
    public getCartCount(): number {
        return this._cart().length;
    }

    // Récupérer la liste des produits
    public get(): Observable<Product[]> {
        return this.http.get<Product[]>(this.path).pipe(
            catchError((error) => {
                return this.http.get<Product[]>("assets/products.json");
            }),
            tap((products) => this._products.set(products)),
        );
    }

    // Créer un nouveau produit
    public create(product: Product): Observable<boolean> {
        return this.http.post<boolean>(this.path, product).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => [product, ...products])),
        );
    }

    // Mettre à jour un produit existant
    public update(product: Product): Observable<boolean> {
        return this.http.patch<boolean>(`${this.path}/${product.id}`, product).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => {
                return products.map(p => p.id === product.id ? product : p)
            })),
        );
    }

    // Supprimer un produit
    public delete(productId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.path}/${productId}`).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => products.filter(product => product.id !== productId))),
        );
    }
}