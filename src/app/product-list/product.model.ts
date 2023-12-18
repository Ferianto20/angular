export interface product {
  id: number,
  name: string,
  category_id: number,
  price: number
}

export interface ProductWithCategory extends product {
  category_name: string;
}