// mobile version

const SingleColumn = ({ columns }: { columns: { column0: any } }) => {
    let column0 = columns.column0;
    
    return (
        <div>
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
    );
  };

export default SingleColumn;
