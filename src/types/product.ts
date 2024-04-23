export interface Product {
  id: string;
  majorCategory: string;
  middleCategory: string;
  productImage: string[];
  productName: string;
  sellerId: string | undefined;
  createAt: Date;
  updateAt: Date;
}

export interface ProductOptions {
  id: string;
  productId: "" | string;
  optionName: string;
  price: number;
  quantity: number;
}
