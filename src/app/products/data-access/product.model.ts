export interface Product {
    id: number;
    code: string;
    name: string;
    description: string;
    image: string;
    category: string;
    price: number;
    quantity: number;
    internalReference: string;
    shellId: number;
    inventoryStatus: "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK";//Tu as trois statuts d'inventaire pour un produit
    rating: number;
    createdAt: number;
    updatedAt: number;
}