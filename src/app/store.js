import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import featureReducer from "../Features/feature/FeatureSlice";
import testimonialReducer from "../Features/testimonials/TestimonialSlice";
import testimonialCompanyReducer from "../Features/testimonials/TesimonialsCompanySlice";
import pricingPlanReducer from "../Features/price/PricingPlanSlice";
import authReducer from "../Features/auth/authSlice";

export const store = configureStore({
  reducer: {
    features: featureReducer,
    testimonials: testimonialReducer,
    testimonialsCompany: testimonialCompanyReducer,
    pricingPlan: pricingPlanReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // Add logger here
});
