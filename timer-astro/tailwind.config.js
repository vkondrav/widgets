import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
        {
            custom_theme: {
                "primary": "#CC850A",
                "secondary": "#47A1AD",
                "accent": "#F2617A",
                "neutral": "#634F7D",
                "base-100": "#01394D",
                "info": "#CC850A",
                "base-content": "#EDF1F3",
            },
        },
        "light",
        "dark",
        "retro",
    ],
},
}


