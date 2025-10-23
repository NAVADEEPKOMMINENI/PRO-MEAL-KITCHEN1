# **App Name**: Diet Plan

## Core Features:

- Restaurant Feed: Display a feed of healthy restaurants based on user location and filters (e.g., High Protein, Vegan).
- Meal Customization: Allow users to build custom meal plans (Breakfast/Lunch/Snacks/Dinner) and view calculated macros and calories.
- Nutrition Dashboard: Provide a dashboard for users to track daily/weekly nutrition intake with a macro balance pie chart, comparing intake vs goals and suggest improvements using basic logic.
- Intelligent Recommendation Tool: Use a generative AI tool to provide meal recommendations based on the user's dietary preferences, health goals, and past order history.
- Delivery and Maps: Integrate with Google Maps API to detect user location and display nearby healthy restaurants, as well as to show route + ETA for delivery.
- Ordering Flow: Implement a cart management and checkout flow with address selection, multiple payment methods (Stripe/Razorpay), and order confirmation with status updates.
- User Authentication: Implement login/signup functionality via Email + Password, Phone (OTP), or Google OAuth with JWT-based authentication and profile setup with dietary preferences, allergies and health goals saved in MongoDB.

## Style Guidelines:

- Primary color: Vibrant mint green (#3BB273) to convey health and freshness.
- Background color: Desaturated light green (#F0FAF5) for a clean and airy feel.
- Accent color: Soft blue-green (#3BA2B2), for secondary actions.
- Body and headline font: 'Inter' (sans-serif) for a modern and clean aesthetic. Note: currently only Google Fonts are supported.
- Sticky bottom navigation with icons for Home, Plan, Orders, Support, and Profile.
- Use simple card-based design with nutrient tags to display meals.
- Calorie progress ring or daily goal bar for tracking nutrition intake.
