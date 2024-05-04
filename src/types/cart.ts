export interface Cart {
  id: string;
  productId: string;
  productName: string;
  sellerId: string;
  productImage: string[];
  createdAt: Date;
  selectedOptions: {
    id: string;
    optionName: string;
    orderQuantity: number;
    price: number;
    quantity: number;
  };
  totalPrice: number;
}
