// desktop version

const ThreeColumn = ({ columns }: { columns: { column0: any; column1: any; column2: any } }) => {
    let column0 = columns.column0;
    let column1 = columns.column1;
    let column2 = columns.column2;

    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-col w-1/3 px-1">
                {column0.map((photo: any, index: any) => (
                    <div key={index} className="flex flex-col items-center mb-4">
                        <a href={photo.link} target="_blank" rel="noopener noreferrer">
                            <img src={photo.Optimized} style={{ width: '100%' }} />
                        </a>
                        <figcaption className="bg-black text-white italic text-sm p-2 text-center w-full">
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
                {column1.map((photo: any, index: any) => (
                    <div key={index} className="flex flex-col items-center mb-4">
                        <a href={photo.link} target="_blank" rel="noopener noreferrer">
                            <img src={photo.Optimized} style={{ width: '100%' }} />
                        </a>
                        <figcaption className="bg-black text-white italic text-sm p-2 text-center w-full">
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
                {column2.map((photo: any, index: any) => (
                    <div key={index} className="flex flex-col items-center mb-4">
                        <a href={photo.link} target="_blank" rel="noopener noreferrer">
                            <img src={photo.Optimized} style={{ width: '100%' }} />
                        </a>
                        <figcaption className="bg-black text-white italic text-sm p-2 text-center w-full">
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
};

export default ThreeColumn;



