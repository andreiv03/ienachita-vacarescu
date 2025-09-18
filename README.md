# National College "Ienăchiță Văcărescu"

A **content‑driven site** powered by **Next.js 15 (App Router)** on the frontend and **Sanity Studio v4** as a headless CMS. It ships with modern styling, SEO-friendly pages, optimized images, and a clean content model (Posts, Categories, Authors).

## ✨ Features

- **Posts & Categories** with authored content (title, body, author, createdAt, category)
- **Static generation + ISR** (`revalidate = 60`) for fast + fresh pages
- **Modern App Router patterns** with Server Components and small Client components
- **Portable Text rendering** with custom image component
- **Optimized Sanity images** via `next/image` + `@sanity/image-url`
- **Responsive, accessible UI** with SCSS Modules
- **Social sharing** (Facebook, LinkedIn, Twitter) on post pages
- **Clean content model** in Sanity (`post`, `category`, `author`, `blockContent`)

## 🧱 Content Model (Sanity)

- **`author`** — `{ name (required) }`
- **`category`** — `{ name (required), slug (required) }`
- **`post`** — `{ title, slug, createdAt, author ->, category ->, body:blockContent }`
- **`blockContent`** — rich text + images (rendered via Portable Text in the client)

## ⚡ Technology Stack

- **Next.js 15 (App Router)**, **React 19**, **TypeScript**
- **Sanity v4** (`sanity`, `@sanity/vision`, `groq`, `@sanity/client`, `@sanity/image-url`)
- **SCSS Modules** for styling
- **React Icons** for UI glyphs
- **ESLint 9** + flat config, Turbopack dev/build

## ⚙️ Build & Installation

### Prerequisites

Before installing the project, ensure you have the following installed:

- **Node.js (16+)** – Required to run Next.js.
- **npm** or **yarn** – To install dependencies and run scripts.

### Installation Instructions

Follow these steps to clone, build, and run the National College "Ienăchiță Văcărescu" website:
```sh
# Clone the repository
git clone https://github.com/andreiv03/ienachita-vacarescu.git
cd ienachita-vacarescu

# Install dependencies
npm install

# Start the development server
npm run dev

# To create an optimized production build
npm run build

# To preview the production build
npm run start
```
The app will be accessible at [http://localhost:3000](http://localhost:3000).

## 🤝 Contributing

Contributions are welcome! If you'd like to enhance the project, follow these steps:

1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature-branch`)
3. **Commit** your changes (`git commit -m "feat: add new feature"`)
4. **Push** your changes (`git push origin feature-branch`)
5. Open a **Pull Request** 🚀

For suggestions or bug reports, feel free to open an issue with the appropriate label.

⭐ **If you find this project useful, consider giving it a star!** ⭐

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for details.
