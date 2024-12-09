type UserRole = "Admin" | "Vendor" | "Customer";

export type TUser = {
  id: string;
  name: string;
  email: string;
  password?: string; // Optional for input; exclude in responses
  role: UserRole;
  address?: string;
  phone?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TShop = {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string; // Optional logo URL
  ownerId: string; // Refers to the vendor (User ID)
  createdAt: Date;
  updatedAt: Date;
};

export type TProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number; // Optional discount in percentage
  stock: number;
  images: string[]; // Array of image URLs
  category: string; // e.g., "Electronics", "Fashion"
  shopId: string; // Refers to the Shop ID
  createdAt: Date;
  updatedAt: Date;
};

type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export type TOrder = {
  id: string;
  userId: string; // Refers to the User ID (Customer)
  shopId: string; // Refers to the Shop ID
  products: Array<{
    productId: string;
    quantity: number;
    price: number; // Final price after discount
  }>;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
};

type PaymentStatus = "Pending" | "Completed" | "Failed";

export type TPayment = {
  id: string;
  orderId: string; // Refers to the Order ID
  userId: string; // Refers to the User ID (Customer)
  amount: number;
  status: PaymentStatus;
  method: string; // e.g., "Credit Card", "PayPal", "COD"
  createdAt: Date;
  updatedAt: Date;
};
export type TReview = {
  id: string;
  productId: string; // Refers to the Product ID
  userId: string; // Refers to the User ID (Customer)
  rating: number; // e.g., 1 to 5
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
};
