import { useEffect, useState } from "react";
import Button from "./Button";

interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const ImagesCollection: React.FC = () => {
  const [imagesData] = useState<ImageData[]>([
    {
      src: "/imagesCollection/image1.webp",
      alt: "Image 1",
      width: 300,
      height: 300,
    },
    {
      src: "/imagesCollection/image2.webp",
      alt: "Image 2",
      width: 400,
      height: 400,
    },
    {
      src: "/imagesCollection/image3.webp",
      alt: "Image 3",
      width: 400,
      height: 400,
    },
    {
      src: "/imagesCollection/image4.png",
      alt: "Image 4",
      width: 400,
      height: 400,
    },
    {
      src: "/imagesCollection/image5.jpg",
      alt: "Image 5",
      width: 400,
      height: 400,
    },
    {
      src: "/imagesCollection/image6.jpg",
      alt: "Image 6",
      width: 400,
      height: 400,
    },
    {
      src: "/imagesCollection/image7.png",
      alt: "Image 6",
      width: 400,
      height: 400,
    },
    {
      src: "/imagesCollection/image8.webp",
      alt: "Image 6",
      width: 400,
      height: 400,
    },
    {
      src: "/imagesCollection/image9.jpg",
      alt: "Image 6",
      width: 400,
      height: 400,
    },
    {
      src: "/imagesCollection/image10.jpg",
      alt: "Image 6",
      width: 400,
      height: 400,
    },

    {
      src: "/imagesCollection/image11.jpg",
      alt: "Image 6",
      width: 400,
      height: 400,
    },
    {
      src: "/imagesCollection/image12.jpg",
      alt: "Image 6",
      width: 400,
      height: 400,
    },
  ]);

  const [shuffledImages, setShuffledImages] = useState<ImageData[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    shuffleImages();

    const shuffleInterval = setInterval(() => {
      shuffleImages();
    }, 5000);

    return () => {
      clearInterval(shuffleInterval);
    };
  }, []);

  useEffect(() => {
    setShuffledImages(shuffleImages());
  }, [imagesData]);

  const shuffleImages = (): ImageData[] => {
    const shuffledImages = imagesData.map((image) => ({ ...image }));

    shuffledImages.sort(() => Math.random() - 0.5);

    setShuffledImages(shuffledImages);
    return shuffledImages;
  };

  const openModal = (index: number): void => {
    setSelectedImage(index);
  };

  const closeModal = (): void => {
    setSelectedImage(null);
  };

  const downloadImage = (imageUrl: string): void => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "image";
    link.click();
  };

  const generateGalleryLayout = (): JSX.Element => {
    const items: JSX.Element[] = [];
    const numImagesToShow = window.innerWidth >= 768 ? 12 : 4; // Ensure we don't exceed the number of images available
  
    if (shuffledImages.length > 0) {
      for (let index = 0; index < numImagesToShow; index++) {
        const image = shuffledImages[index];
        items.push(
          <div key={index} className="w-[100px] ml-5 md:ml-0 md:pl-0 p-1 md:p-2 md:w-[16.66%]">
            <img
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="block h-full w-full rounded-lg object-cover object-center cursor-pointer"
              src={image.src}
              onClick={() => openModal(index)}
            />
          </div>
        );
      }
    }
    return (
      <div className="overflow-y-auto max-h-[600px]">
        <div className="flex flex-wrap">{items}</div>
      </div>
    );
  };
  

  return (
    <div className="w-[100%] px-0 py-2">
      {generateGalleryLayout()}

      {selectedImage !== null && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div
            className="max-w-2xl w-full relative"
            style={{ width: "800px", height: "600px" }}
          >
            <img
              alt={shuffledImages[selectedImage].alt}
              width={800}
              height={600}
              className="block h-full w-full rounded-lg object-cover object-center"
              src={shuffledImages[selectedImage].src}
            />

            <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
              <button
                type="button"
                className="text-white bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
                onClick={closeModal}
              >
                Close
              </button>
              <Button
                btnType="button"
                title="Download"
                className="!w-fit !rounded-lg"
                onClick={() => downloadImage(shuffledImages[selectedImage].src)} 
                />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesCollection;
