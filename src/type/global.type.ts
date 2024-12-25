type UserRole = "Admin" | "Vendor" | "Customer";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  username: string;
  password?: string; // Optional for input; exclude in responses
  profileImage: string;
  role: UserRole;
  address?: string;
  phone?: string;
  isSuspended: boolean;
  isDeleted: boolean;
  lastLoginAt: string;
  createdAt: Date;
  updatedAt: Date;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
};

export type TShop = {
  _id: string;
  name: string;
  description?: string;
  logo?: string; // Optional logo URL
  vendorId: string;
  isBlacklisted: boolean;
  IShop: string; // Refers to the vendor (User ID)
  createdAt: Date;
  updatedAt: Date;
  products?: TProduct[];
  orders?: TOrder[];
  followers?: TUser[];
};

// Defines the structure of a product variant (e.g., size, color, material)
interface ProductVariant {
  name: string; // Name of the variant (e.g., 'Size', 'Color')
  options: string; // Options available for the variant (e.g., 'S, M, L' or 'Red, Blue, Green')
  stock?: number; // Optional stock count for this variant
  price?: number; // Optional custom price for the variant (if different from the base price)
  images?: string[]; // Optional array of image URLs specific to the variant
}

// The main product interface, which includes variants and other details
export type TProduct = {
  _id: string; // Unique identifier for the product
  name: string; // Name of the product
  description: string; // Product description
  price: number; // Base price of the product
  slug: string; // SEO-friendly slug
  discount?: number; // Optional discount in percentage (e.g., 10 for 10% off)
  stock: number; // Total stock available for the product
  images: string[]; // Array of image URLs for the product
  category: string; // Category of the product (e.g., 'Electronics', 'Fashion')
  shop: TShop;
  variants: ProductVariant[]; // Array of variants for the product
  inventory: number;
  visibility: "active" | "inactive" | "archived"; // Product status

  createdAt: Date;
  updatedAt: Date;
};

// type OrderStatus =
//   | "Pending"
//   | "Processing"
//   | "Shipped"
//   | "Delivered"
//   | "Cancelled";

export type TOrder = {
  _id: string; // Order ID
  user?: TUser; // User ID
  shop?: TShop;
  paymentType: "COD" | "ONLINE"; // Type of payment
  totalAmount: number; // Total order amount
  status: "pending" | "completed" | "canceled"; // Order status
  items: {
    product: TProduct;
    quantity: number; // Quantity of the product
    _id: string; // Unique ID for the item
  }[];
  createdAt: string; // Order creation timestamp
  updatedAt: string; // Order last update timestamp
  payment?: TPayment | null; // Payment details (optional, may be null for COD)
  isReviewed: boolean;
};

type PaymentStatus = "success" | "failed" | "pending";

export type TPayment = {
  _id: string;
  order: string; // Refers to the Order ID
  user: TUser; // Refers to the User ID (Customer)
  amount: number;
  status: PaymentStatus;
  transactionId?: string;
  method: string; // e.g., "Credit Card", "PayPal", "COD"
  createdAt: Date;
  updatedAt: Date;
};
export type TReview = {
  _id: string;
  product: TProduct; // Refers to the Product ID
  user: TUser;
  shop: TShop; // Refers to the User ID (Customer)
  rating: number; // e.g., 1 to 5
  image: string;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
};
