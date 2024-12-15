# Image Inpainting Widget

This is a React-based application that allows users to upload an image, draw masks on it, and generate a mask image where the drawn areas are white, and the rest is black. The application is designed to simplify inpainting workflows and provide an intuitive user experience.

---

## **Features**

- Upload an image (JPEG/PNG format).
- Draw on the image with a customizable brush.
- Export the generated mask with drawn areas in white and the rest in black.
- Clear the canvas or reset to upload a new image.

## **How to Run the Project Locally**

1. **Clone the Repository**
   ```bash
   git clone ```https://github.com/Vrushabh1217/image-inpainting-widget.git```
   cd image-inpainting-widget
   ```
2. Install Dependencies Ensure you have Node.js installed, then run:

   ```bash
   npm install
   ```

3. Start the Development Server Launch the application locally:
   ```bash
    npm run dev
   ```

Open http://localhost:5173 in your browser to view the app.

4. Build for Production To create a production build:
   ```bash
   npm run build
   ```

## **Libraries Used**

*React*: Core framework for building the UI.
*Fabric.js*: Powerful canvas library for drawing functionalities.
*Tailwind CSS*: Utility-first framework for responsive and modern styling.
*Vite*: Fast development environment and build tool.

## **Challenges Faced and How I Overcame Them**

1. Drawing Accuracy on the Canvas

*Challenge*: Ensuring the brush strokes were accurate and the mask aligned perfectly with the original image.

*Solution*: I used fabric.js to manage canvas interactions. It provides excellent drawing capabilities and allowed me to control the brush size and colors effectively.

2. Generating the Mask

*Challenge*: Converting the drawing data into a mask where drawn areas are white and the rest is black.

*Solution*: I used a secondary canvas element to process the image data. By iterating through pixel data, I mapped the drawn areas to white and everything else to black.

3. Image Scaling and Responsiveness

*Challenge*: Adapting the uploaded image to fit the canvas dimensions while maintaining its aspect ratio.

*Solution*: Leveraged fabric.Image to load the image dynamically and scale it to match the canvas dimensions.

4. Performance Issues with High-Resolution Images

*Challenge*: Handling large images caused noticeable delays during mask generation.

*Solution*: Optimized the canvas operations by limiting resolution during processing and utilizing efficient loops for image data handling.

5. User Experience

*Challenge*: Ensuring the interface is intuitive and responsive for both technical and non-technical users.

*Solution*: Added clear buttons for resetting the canvas, saving the mask, and adjusting brush size. Tailwind CSS ensured a clean, modern design.

## **Future Enhancements**

=> Add a feature to download the generated mask image directly.
=> Support for multi-layered masks with different colors.
=> Implement a back-end API (e.g., FastAPI) to process masks on the server.
