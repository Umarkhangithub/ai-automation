import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: 1,
      name: "John Doe",
      title: "CEO at TechCorp",
      description: "“This AI tool saved me 10+ hours per week! It's a game-changer.”",
      review: 5,
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Sarah Smith",
      title: "CTO at InnovateX",
      description: "“AI Automate helped us scale faster and improve efficiency by 30%!”",
      review: 5,
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Mike Johnson",
      title: "Founder at StartupHub",
      description: "“Seamless integration & incredible support! Highly recommended.”",
      review: 4,
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Lisa Wong",
      title: "Product Manager at Appify",
      description: "“Super intuitive and easy to use. AI Automate is a must-have!”",
      review: 5,
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "James Brown",
      title: "Head of Operations at FastTech",
      description: "“We've cut manual work by 50% with AI Automate.”",
      review: 4,
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 6,
      name: "Emily Davis",
      title: "Marketing Lead at GrowthHub",
      description: "“The automation features are incredible. A huge time-saver!”",
      review: 5,
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 7,
      name: "David Wilson",
      title: "CEO at CloudSync",
      description: "“Our workflow is now 2x faster. Highly recommend this tool!”",
      review: 5,
      image: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      id: 8,
      name: "Sophia Martinez",
      title: "HR Director at PeopleFirst",
      description: "“AI Automate has made hiring and onboarding a breeze!”",
      review: 4,
      image: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      id: 9,
      name: "Alex Turner",
      title: "Lead Developer at CodeWorks",
      description: "“This AI-powered solution changed the way we code!”",
      review: 5,
      image: "https://randomuser.me/api/portraits/men/9.jpg",
    },
  ]
};

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {},
});

export const selectTestimonials = (state) => state.testimonials?.items || [];

export default testimonialsSlice.reducer;
