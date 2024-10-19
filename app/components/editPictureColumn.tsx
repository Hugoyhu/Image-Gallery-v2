import { editProps, deleteProps } from "@/app/components/props/propInterface";

const EditPictureColumn = ({ data } : { 
    data: {
        column: any,
        edit: {
            setPresetValues: (value: React.SetStateAction<{
                link: string;
                Model: string;
                Lens: string;
                Focal: string;
                FNumber: string;
                Exposure: string;
                ISO: number;
                location: string;
                Label: string;
                featured: string;
            }>) => void,
            openEditModal: () => void,
            setLink: (value: React.SetStateAction<{
                link: string;
            }>) => void,
            openDeleteModal: () => void,
            isEditModalOpen: boolean,
            isDeleteModalOpen: boolean,
            EditModal: React.FC<editProps>,
            DeleteModal: React.FC<deleteProps>
            closeEditModal: () => void,
            closeDeleteModal: () => void,
            handleFormSubmit: (updatedFormData: any) => void,
            handleImageDelete:(link: any) => void,
            presetValues: {
                link: string;
                Model: string;
                Lens: string;
                Focal: string;
                FNumber: string;
                Exposure: string;
                ISO: number;
                location: string;
                Label: string;
                featured: string;
            },
            link: string
        }
    }
}) => {
    return (
        <div className="flex flex-col w-1/3 px-1">
                {data.column.map((photo: any, index: any) => (
                    <div key={index} className="flex flex-col items-center mb-4">
                        <a target="_blank" rel="noopener noreferrer">
                            <img src={photo.Optimized} style={{ width: '100%' }} />
                        </a>
                        <figcaption className="bg-black text-white text-sm p-2 text-center w-full">
                            {photo.Model}, {photo.Lens}
                            <br />
                            {photo.Focal} <span>&#183;</span> {photo.Aperture} <span>&#183;</span> {photo.Exposure}s <span>&#183;</span> ISO {photo.ISO}
                            <br />
                            {photo.Location} <span>&#183;</span> {photo.Date}
                        </figcaption>
                        <figcaption className="w-full flex justify-between bg-teal-700 p-2">
                            <button
                                className="bg-teal-600 text-white text-sm p-2 w-1/2 cursor-pointer rounded-l"
                                onClick={() => {
                                    data.edit.setPresetValues({
                                        link: photo.link,
                                        Model: photo.Model,
                                        Lens: photo.Lens,
                                        Focal: photo.Focal,
                                        FNumber: photo.Aperture,
                                        Exposure: photo.Exposure,
                                        ISO: photo.ISO,
                                        location: photo.Location,
                                        Label: photo.Label,
                                        featured: photo.Featured
                                    });
                                    data.edit.openEditModal();
                                }}
                            >
                                EDIT
                            </button>

                            <button
                                className="bg-red-600 text-white text-sm p-2 w-1/2 cursor-pointer rounded-r"
                                onClick={() => {
                                    data.edit.setLink({
                                        link: photo.link
                                    });
                                    data.edit.openDeleteModal();
                                }}
                            >
                                DELETE
                            </button>
                            {data.edit.isEditModalOpen && (
                                <data.edit.EditModal closeModal={data.edit.closeEditModal} handleFormSubmit={data.edit.handleFormSubmit} initialValues={data.edit.presetValues} />
                            )}
                            {data.edit.isDeleteModalOpen && (
                                <data.edit.DeleteModal closeModal={data.edit.closeDeleteModal} handleConfirm={data.edit.handleImageDelete} link={data.edit.link} />
                            )}
                        </figcaption>
                    </div>
                ))}
            </div>
    )
}

export default EditPictureColumn;
