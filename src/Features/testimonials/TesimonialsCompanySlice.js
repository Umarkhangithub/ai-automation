import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    items: [
        { id: 1, title: "Yahoo", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Yahoo%21_logo.svg/1920px-Yahoo%21_logo.svg.png" },
        { id: 2, title: "Zoom", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Zoom_Communications_Logo.svg/2560px-Zoom_Communications_Logo.svg.png" },
        { id: 3, title: "Tailwind CSS", image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
        { id: 4, title: "Instagram", image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" },
        { id: 5, title: "Twitter (X)", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/X_logo_2023_original.svg/1920px-X_logo_2023_original.svg.png" },
        { id: 6, title: "GitHub", image: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" },
        { id: 7, title: "OpenAI", image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/OpenAI_Logo.svg" },
        { id: 8, title: "Google", image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
        { id: 9, title: "Microsoft", image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
        { id: 10, title: "Amazon", image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
      ]
}

const testimonialsCompanySlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {}
})

// Selector function to get companies from the Redux store
export const selectCompanies = (state) => state.testimonialsCompany?.items || [];

export default testimonialsCompanySlice.reducer;
