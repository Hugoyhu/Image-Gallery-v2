import clientPromise from "@/lib/mongodb";
import { userAgent } from "next/server";
import { headers } from 'next/headers'
import { generateHTML, formatTimecode } from "@/app/pageHelpers";

export default async function Gallery(props: any) {
  try {
    const client = await clientPromise;
    const db = client.db("Image-Gallery");
    const images = await db
      .collection("image-gallery")
      .find({ "Label": "astro" })
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

      return generateHTML("astro", 1, photoList, [], []);
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
      return generateHTML("astro", 3, column0, column1, column2);
    }
  } catch (e) {
    console.error(e);
  }
};