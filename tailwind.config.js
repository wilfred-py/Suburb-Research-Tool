/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
    theme: {
        colors: {
            navigationBarBlue: "#112D4E",
            dashboardSelectorBlue: "#0174BE",
            hoverBlue: "#DBE2EF",
            footerBlue: "#F0F0FA",
            white: "#fff",
            offWhite: "#F8F5F1",
            black: "#000",
            orange: "#ffa500",
            red: "#ff0000",
            gray: "#F1F6F9",
            pastelPink: "#ED9ED6",
            buttonYellow: "#FFC436",
            buttonBlue: "#144272",
            hoverButtonBlue: "#43638f",
            buttonPressShadowWhite: "#F0F0F0",
        },
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
                "3xl": "2000px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",

                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            fontFamily: {
                sans: ["var(--font-inter)"],
            },
            fontWeight: {
                inter100: "100",
                inter200: "200",
                inter300: "300",
                inter400: "400",
                inter500: "500",
                inter600: "600",
                inter700: "700",
            },
            maxWidth: {
                "7/10": "70%",
            },
        },
        screens: {
            "mobile-s": "200px",
            "mobile-l": "425px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
            "3xl": "2000px",
            "4xl": "2200px",
            "5xl": "2500px",
            "6xl": "2800px",
            "7xl": "3000px",
            "8xl": "3200px",
        },
    },
    plugins: [require("tailwindcss-animate")],
};
