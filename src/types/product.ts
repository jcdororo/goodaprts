export interface Product {
  id: string;
  majorCategory: string;
  middleCategory: string;
  productImage: {}[];
  productName: string;
  sellerId: string | undefined;
  representativePrice: number;
  createAt: Date;
  updateAt: Date;
}

export interface ProductWithOptions extends Product {
  options?: {}[];
}

export interface ProductOptions {
  id: string;
  productId: "" | string;
  optionName: string;
  price: number;
  quantity: number;
}

export interface SelectedOption extends ProductOptions {
  orderQuantity?: number;
}
