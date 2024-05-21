// ! varient type
export type Tvarient = {
  type: string;
  value: string;
};

// ! Inventory  type
export type Tinventory = {
  quantity: number;
  inStock: boolean;
};

// ! product type
export type Tproduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: Tvarient[];
  inventory: Tinventory;
};
