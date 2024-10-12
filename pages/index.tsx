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
  deviceType: string;
}

const Images: React.FC<ImageProps> = ({ images , deviceType }) => {

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

  if (deviceType == 'mobile') {
    // one column only
    return generateHTML(1, photoList, [], []);
  } else {
    let column0 = [];
    let column1 = [];
    let column2 = [];

    for (let i = 0; i < photoList.length; i++) {
      let photo = photoList[i];

      if (i % 3 == 0) {
        column0.push(photo);
      } else if (i % 3 == 1) {
        column1.push(photo);
      } else if (i % 3 == 2) {
        column2.push(photo);
      }
    }
    return generateHTML(2, column0, column1, column2);
  }  
};

export default Images;
export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const client = await clientPromise;
        const db = client.db("Image-Gallery");
        const images = await db
            .collection("image-gallery")
            .find({})
            .sort({ Time: -1 })
            .limit(150)
            .toArray();
        
        const userAgent = context.req.headers['user-agent'] || '';
        const isMobile = /mobile/i.test(userAgent);

        return {
            props: { 
              images: JSON.parse(JSON.stringify(images)),
              deviceType: isMobile ? 'mobile' : 'desktop',
            },
        };
    } catch (e) {
        console.error(e);
        return { props: { images: [] , deviceType: 'unknown' } };
    }
};

function generateHTML (numRows: number, column0: { [key: string]: any }[], column1: { [key: string]: any }[], column2: {[key: string]: any}[]) {
  if (numRows == 3) {
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
          </div>

          <div className="flex flex-row justify-between">
          <div className="flex flex-col w-1/3 px-1">
              {column0.map((photo, index) => (
                <div key={index} className="flex flex-col items-center mb-4">
                <a href={photo.link} target="_blank" rel="noopener noreferrer">
                    <img src={photo.Optimized} style={{ width: '100%' }}/>
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
      
          <div className="flex flex-col w-1/3 px-1">
              {column1.map((photo, index) => (
                <div key={index} className="flex flex-col items-center mb-4">
                <a href={photo.link} target="_blank" rel="noopener noreferrer">
                    <img src={photo.Optimized} style={{ width: '100%' }}/>
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
          <div className="flex flex-col w-1/3 px-1">
              {column2.map((photo, index) => (
                <div key={index} className="flex flex-col items-center mb-4">
                <a href={photo.link} target="_blank" rel="noopener noreferrer">
                    <img src={photo.Optimized} style={{ width: '100%' }}/>
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
  } else {
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
          </div>

          <div>
            {column0.map((photo, index) => (
                <div key={index} className="flex flex-col items-center mb-4">
                <a href={photo.link} target="_blank" rel="noopener noreferrer">
                    <img src={photo.Optimized} style={{ width: '100%' }}/>
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
    );
  }
}

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