# DevLinks 🚀

Welcome to **DevLinks**! This is your one-stop shop for creating a sleek, developer-focused profile page that links to all your favorite platforms. Whether you're showing off your GitHub repos, tweeting your latest thoughts, or sharing your Figma designs, DevLinks has got you covered. 🛠️

## What is DevLinks?

Ever wanted a place to organize all your developer profiles and social media links in one clean, minimalistic page? Yep, that's what DevLinks is all about. Think of it as your digital business card, but way cooler and totally geared toward devs. 💻

## Features

- **Customizable Links**: Add, edit, or remove links to all your favorite platforms.
- **Profile Picture/Banner**: Show off your latest avatar and banner, or stick with a slick color background.
- **Social Media Icons**: We’ve got you covered with icons for GitHub, Twitter, LinkedIn, and more. Plus, you can add whatever else you fancy!
- **Developer-Friendly**: Designed with devs in mind. Simple, minimalistic, and straight to the point.

## How to Get Started

1. **Clone the repo**:  
   `git clone https://github.com/FinzyPHINZy/devlinks.git`
2. **Install dependencies**:  
   `pnpm install`

3. **Set up environment variables**:  
   Create a `.env` file in the root of your project and add the following:

   ```bash
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   MONGODB_URI=your-mongodb-uri
   SECRET_KEY=your-secret-key
   BUCKET_NAME=your-s3-bucket-name
   S3_ACCESS_KEY=your-s3-access-key
   S3_SECRET_ACCESS_KEY=your-s3-secret-access-key
   URL=http://localhost:3000/
   NEXTAUTH_URL=http://localhost:3000/
   ```

   Make sure to replace the placeholders with your actual keys and URLs. These are essential for running the project locally.

4. **Fire it up**:  
   `pnpm dev`  
   and watch your DevLinks page come to life in your browser.

5. **Start customizing**:  
   Jump into the code and start adding your links. The UI is pretty straightforward, but the magic happens in your creativity.

## Tech Stack

- **Frontend and Backend**: Next.js, ShadCN UI, TailwindCSS
- **Other Cool Stuff**: S3 bucket for file uploads, Vite for build, Recharts for the analytics, Sortablejs to create sortable lists, MongoDB, NextAuth for authentication, React Hot Toast for notifications, and some sprinkles of love ❤️

## Contributing

Want to make DevLinks even better? Feel free to fork the repo, make some changes, and submit a PR. I’d love to see what you come up with!

## License

This project is open-source, so feel free to use it, share it, and make it your own.

---

And that's a wrap! Go ahead and make your profile page shine with DevLinks. If you’ve got any questions or ideas, don’t hesitate to reach out. Happy coding! 🎉

---
