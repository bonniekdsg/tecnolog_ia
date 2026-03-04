tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              primary: "#2563EB", 
              "primary-hover": "#1d4ed8",
              "background-light": "#F8FAFC",
              "background-dark": "#060B18",
              "surface-dark": "#0B1226",
              "surface-light": "#FFFFFF",
              "border-dark": "#1E293B",
              "border-light": "#E2E8F0",
            },
            fontFamily: {
              display: ["Sora", "sans-serif"],
              body: ["DM Sans", "sans-serif"],
              mono: ["JetBrains Mono", "monospace"],
            },
            borderRadius: {
              DEFAULT: "0.5rem",
              "xl": "1rem",
              "2xl": "1.5rem",
            },
            backgroundImage: {
              'grid-pattern': "linear-gradient(to right, rgba(37, 99, 235, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(37, 99, 235, 0.05) 1px, transparent 1px)",
            }
          },
        },
      };
