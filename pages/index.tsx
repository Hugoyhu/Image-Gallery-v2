import clientPromise from "../lib/mongodb";
import { GetServerSideProps } from 'next';
import styles from './styles/styles.module.css';

interface Image {
    _id: string;
    link: string;
    Manufacturer: string;
    Model: string;
    Time: Date;
    Width: number;
    Height: number;
    Exposure: string;
    FNumber: string;
    Lens: string;
    Focal: string;
    ISO: number;
    Label: string;
    location: string;
    featured: boolean;
}
interface ImageProps {
   images: Image[];
}

const Images: React.FC<ImageProps> = ({ images }) => {

    let photoList : { [key: string]: any }[] = [];

    for (let i = 0; i < images.length; i++) {
        let image = images[i];
        
        photoList.push(
            {
                "link": image.link,
                "Lens": image.Lens,
                "Manufacturer": image.Manufacturer,
                "Model": image.Model,
                "Focal": image.Focal,
                "Aperture": image.FNumber,
                "Exposure": image.Exposure,
                "ISO": image.ISO,
                "Location": image.location,
                "Date": formatTimecode(String(image.Time)),
                "Optimized": image.link.slice(0, 49) + "w_1200,f_auto/" + image.link.slice(49)
            }
        )
    }

    let column0 = [];
    let column1 = [];
    let column2 = [];

    for (let i = 0; i < photoList.length; i++) {
        let photo = photoList[i];

        if (i % 2 == 0) {
            column0.push(photo);
        } else if (i % 2 == 1) {
            column1.push(photo);
        } 
    }


    return (
        <div> 
            <div className="text-center p-8">
                <h1 className="text-3xl font-bold">HUGO HU</h1>
                
                <h3>
                    <a href="https://www.hugohu.me" className="text-blue-500 underline">
                        https://www.hugohu.me
                    </a>
                </h3>
                <h3>
                    <a href="mailto:photography@hugohu.me" className="text-blue-500 underline">
                        photography@hugohu.me
                    </a>
                </h3>
                    

                {/* <h3 className="mt-6">Sort By:</h3>
                <div className="mt-2">
                    <a href="/" className="text-blue-500 underline">Time (Newest First)</a>&nbsp;&nbsp;
                    <a href="/random" className="text-blue-500 underline">Random Order</a>
                </div>

                <div className="mt-4">
                    <a href="/category/landscape" className="text-blue-500 underline">Landscape</a>&nbsp;&nbsp;
                    <a href="/category/nature" className="text-blue-500 underline">Nature</a>&nbsp;&nbsp;
                    <a href="/category/birds" className="text-blue-500 underline">Birds</a>&nbsp;&nbsp;
                    <a href="/category/animals" className="text-blue-500 underline">Animals</a>&nbsp;&nbsp;
                    <a href="/category/metropolitan" className="text-blue-500 underline">Metropolitan</a>&nbsp;&nbsp;
                    <a href="/category/flowers" className="text-blue-500 underline">Flowers</a>&nbsp;&nbsp;
                    <a href="/category/craft" className="text-blue-500 underline">Craft</a>&nbsp;&nbsp;
                    <a href="/category/astrophotography" className="text-blue-500 underline">Astro</a>
                </div> */}
            </div>

            <div className="flex flex-row justify-between">
            <div className="flex flex-col w-1/2 px-1">
                {column0.map((photo, index) => (
                <div key={index} className="flex flex-col items-center mb-4">
                <a href={photo.link} target="_blank" rel="noopener noreferrer">
                    <img src={photo.link} style={{ width: '100%' }}/>
                </a>
                <figcaption className="bg-black text-white italic p-2 text-center w-full">
                    {photo.Model}, {photo.Lens}
                    <br />
                    {photo.Focal} <span>&#183;</span> {photo.Aperture} <span>&#183;</span> {photo.Exposure}s <span>&#183;</span> ISO {photo.ISO}
                    <br />
                    {photo.Location} <span>&#183;</span> {photo.Date}
                </figcaption>
                </div>
                ))}
            </div>
        
            <div className="flex flex-col w-1/2 px-1">
                {column1.map((photo, index) => (
                <div key={index} className="flex flex-col items-center mb-4">
                <a href={photo.link} target="_blank" rel="noopener noreferrer">
                    <img src={photo.link} style={{ width: '100%' }}/>
                </a>
                <figcaption className="bg-black text-white italic p-2 text-center w-full">
                    {photo.Model}, {photo.Lens}
                    <br />
                    {photo.Focal} <span>&#183;</span> {photo.Aperture} <span>&#183;</span> {photo.Exposure}s <span>&#183;</span> ISO {photo.ISO}
                    <br />
                    {photo.Location} <span>&#183;</span> {photo.Date}
                </figcaption>
                </div>
                ))}
            </div>
            </div>
        </div>
      );
};

export default Images;
export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const client = await clientPromise;
        const db = client.db("Image-Gallery");
        const images = await db
            .collection("image-gallery")
            .find({})
            .sort({ Time: -1 })
            .limit(150)
            .toArray();
        return {
            props: { images: JSON.parse(JSON.stringify(images)) },
        };
    } catch (e) {
        console.error(e);
        return { props: { images: [] } };
    }
};

function formatTimecode(timecode: string): string {
    const date = new Date(timecode);
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
  
    return date.toLocaleDateString('en-US', options);
}