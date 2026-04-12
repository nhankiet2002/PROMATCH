export const Endpoint = {
  LOGIN: "/auth/login",
  REFRESH_TOKEN: "/auth/refresh",
  OTP_REGISTER: "/auth/register",
  OTP_VERIFY: "/auth/verify-otp",
  RESEND_OTP: "/auth/resend-otp",

  UPDATE_ACCOUNT: "/customer/update",
  // UPDATE_PROFILE: "/student/update-profile",

  PRODUCTS: "/product",
  PRODUCT_ATTRIBUTE: "/product/attribute",
  PRODUCT_DETAIL: "/product/slug",
  COLLECTION: "/product/collection",
  REVIEWS: "/product/reviews",

  CART: "/cart",
  CLEAR_CART: "/cart/clear",
  UPDATE_CART: "/cart/update-user",
  ABANDONED_CART: "/cart/abandoned",

  ORDER: "/order",
  PAYMENT_CHECKOUT: "/order/checkout",
  CREATE_ORDER: "/order/create",
  CAPTURE: "/order/capture",
  SHIPPING_CONFIG: "/order/config/shipping",
  ORDER_TRACKING: "/order/tracking",

  // cart coupon
  APPLY_COUPON: "/order/coupon",

  SETTINGS: "/settings",
  DETAIL_PAGE: "/settings/page",
  SHOP_IDENTITY: "/settings/get-identity",

  //categories
  CATEGORIES: "/categories",

  //media
  UPLOAD: "/files/upload",

  //admin-controller
  MODIFY_SKILLS: "/admin/modify-skills",
  GET_SKILL_SET: "/admin/get-skill-set",

  //user-controller
  ADD_MEMBER: "/student/add-member",
  ADD_SKILLS: "/student/add-skills",
  CREATE_PROJECT: "/student/create-project",
  CREATE_STUDENT: "/student/create-student",
  DELETE_MEMBER: "/student/delete-member",
  FIND_POTENTIAL_CANDIDATE: "/student/find-potential-candidate",
  GET_OWN_PROJECT_LIST: "/student/get-own-project-list",
  GET_PROFILE: "/student/get-profile",
  MODIFY_MEMBER: "/student/modify-member",
  UPDATE_PROFILE: "/student/update-profile",
  UPDATE_PROJECT: "/student/update-project",
};
