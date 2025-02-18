import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default: localStorage

import logger from "redux-logger";
import featureReducer from "../Features/feature/FeatureSlice";
import testimonialReducer from "../Features/testimonials/TestimonialSlice";
import testimonialCompanyReducer from "../Features/testimonials/TesimonialsCompanySlice";
import pricingPlanReducer from "../Features/price/PricingPlanSlice";
import authReducer from "../Features/auth/authSlice";
import automationReducer from "../Features/automations/AutomationSlice";
import analyticsReducer from "../Features/analytics/AnalyticsSlice";
import settingReducer from "../Features/setting/SettingSlice";
import subscriptionReducer from "../Features/subscription/SubscriptionSlice";

const persistConfig = {
  key: "root",
  storage, // use localStorage or sessionStorage
  whitelist: ["auth"], // only auth will be persisted
};

const rootReducer = combineReducers({
  features: featureReducer,
  testimonials: testimonialReducer,
  testimonialsCompany: testimonialCompanyReducer,
  pricingPlan: pricingPlanReducer,
  auth: authReducer,
  automation: automationReducer,
  analytics: analyticsReducer,
  setting: settingReducer,
  subscription: subscriptionReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();

    // Conditionally add logger middleware based on the environment
    if (import.meta.env.VITE_REACT_APP_MODE === "development") {
      middlewares.push(logger);
    }

    return middlewares;
  },
});

const persistor = persistStore(store);

export { persistor, store };
