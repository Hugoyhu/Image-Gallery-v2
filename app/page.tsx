import clientPromise from "../lib/mongodb";
import { userAgent } from "next/server";
import { headers } from 'next/headers'
import styles from './styles/styles.module.css';
import LoginSignoutButton from '@/app/components/loginSignoutButton';
import Header from '@/app/components/header';
import SingleColumn from "./components/singleColumn";
import EditSwitcher from "./components/edit";
import ButtonRow from "./components/selectButtons";

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

export default async function Gallery(props: any) {
  try {
    const client = await clientPromise;
    const db = client.db("Image-Gallery");
    const images = await db
      .collection("image-gallery")
      .find({})
      .sort({ Time: -1 })
      .limit(150)
      .toArray();

    const { device } = userAgent({ headers: headers() });
    const deviceType = device?.type === "mobile" ? "mobile" : "desktop";

    console.log(deviceType);

    let photoList: { [key: string]: any }[] = [];

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
          "Optimized": image.link.slice(0, 49) + "w_1200,f_auto/" + image.link.slice(49),
          "Label": image.Label,
          "Featured": String(image.featured)
        }
      )
    }


    if (deviceType == 'mobile') {
      // one column only
      // return generateHTML(1, photoList, [], []);
      
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
      return generateHTML(3, column0, column1, column2);
    }
  } catch (e) {
    console.error(e);
  }
};


function generateHTML(numRows: number, column0: { [key: string]: any }[], column1: { [key: string]: any }[], column2: { [key: string]: any }[]) {
  if (numRows == 3) {
    return (
      <div>
        <LoginSignoutButton />
        <Header />
        <ButtonRow />

        <EditSwitcher columns={{"column0": column0, "column1": column1, "column2": column2}} />
      </div>
    );
  } else {
    return (
      <div>
        <Header />

        <SingleColumn columns={{"column0": column0}} />
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