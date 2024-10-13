// desktop version

import clientPromise from "@/lib/mongodb";
import React, { useState } from 'react';
import Modal from '@/app/components/modal';
import { useRouter } from "next/navigation";

const updatePhoto = async (updatedData: {
    link: string;
    Model: string;
    Lens: string;
    Focal: string;
    FNumber: string;
    Exposure: string;
    ISO: number;
    location: string;
    Label: string;
    featured: boolean;
}) => {
    const response = await fetch('/api/photos', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    console.log(data);
};


const EditThreeColumn = ({ columns }: { columns: { column0: any; column1: any; column2: any } }) => {
    let column0 = columns.column0;
    let column1 = columns.column1;
    let column2 = columns.column2;
    const router = useRouter();

    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const openEditModal = () => {
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
    };



    const handleFormSubmit = (updatedFormData: any) => {
        console.log("Form submitted with data: ", updatedFormData);

        updatePhoto(updatedFormData).then( () => {
            router.push("/");
            router.refresh();
        });
    };

    const [presetValues, setPresetValues] = useState({
        link: "",
        Model: "",
        Lens: "",
        Focal: "",
        FNumber: "",
        Exposure: "",
        ISO: 0,
        location: "",
        Label: "",
        featured: false
    });


    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-col w-1/3 px-1">
                {column0.map((photo: any, index: any) => (
                    <div key={index} className="flex flex-col items-center mb-4">
                        <a target="_blank" rel="noopener noreferrer">
                            <img src={photo.Optimized} style={{ width: '100%' }} />
                        </a>
                        <figcaption className="bg-black text-white italic text-sm p-2 text-center w-full">
                            {photo.Model}, {photo.Lens}
                            <br />
                            {photo.Focal} <span>&#183;</span> {photo.Aperture} <span>&#183;</span> {photo.Exposure}s <span>&#183;</span> ISO {photo.ISO}
                            <br />
                            {photo.Location} <span>&#183;</span> {photo.Date}
                        </figcaption>
                        <figcaption className="w-full bg-teal-700">
                            <button
                                className="text-white text-sm p-2 text-center w-full cursor-pointer"
                                onClick={() => {
                                    setPresetValues({
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
                                    openEditModal();
                                }
                                }  // Triggers the modal
                                style={{ border: 'none', background: 'none' }}  // Make it look like a regular figcaption
                            >
                                EDIT
                            </button>

                            {isEditModalOpen && (
                                <Modal closeModal={closeEditModal} handleFormSubmit={handleFormSubmit} initialValues={presetValues} />
                            )}
                        </figcaption>
                    </div>
                ))}
            </div>


            <div className="flex flex-col w-1/3 px-1">
                {column1.map((photo: any, index: any) => (
                    <div key={index} className="flex flex-col items-center mb-4">
                        <a target="_blank" rel="noopener noreferrer">
                            <img src={photo.Optimized} style={{ width: '100%' }} />
                        </a>
                        <figcaption className="bg-black text-white italic text-sm p-2 text-center w-full">
                            {photo.Model}, {photo.Lens}
                            <br />
                            {photo.Focal} <span>&#183;</span> {photo.Aperture} <span>&#183;</span> {photo.Exposure}s <span>&#183;</span> ISO {photo.ISO}
                            <br />
                            {photo.Location} <span>&#183;</span> {photo.Date}
                        </figcaption>
                        <figcaption className="w-full bg-teal-700">
                            <button
                                className="text-white text-sm p-2 text-center w-full cursor-pointer"
                                onClick={() => {
                                    setPresetValues({
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
                                    openEditModal();
                                }
                                }  // Triggers the modal
                                style={{ border: 'none', background: 'none' }}  // Make it look like a regular figcaption
                            >
                                EDIT
                            </button>

                            {isEditModalOpen && (
                                <Modal closeModal={closeEditModal} handleFormSubmit={handleFormSubmit} initialValues={presetValues} />
                            )}
                        </figcaption>
                    </div>
                ))}
            </div>
            <div className="flex flex-col w-1/3 px-1">
                {column2.map((photo: any, index: any) => (
                    <div key={index} className="flex flex-col items-center mb-4">
                        <a target="_blank" rel="noopener noreferrer">
                            <img src={photo.Optimized} style={{ width: '100%' }} />
                        </a>
                        <figcaption className="bg-black text-white italic text-sm p-2 text-center w-full">
                            {photo.Model}, {photo.Lens}
                            <br />
                            {photo.Focal} <span>&#183;</span> {photo.Aperture} <span>&#183;</span> {photo.Exposure}s <span>&#183;</span> ISO {photo.ISO}
                            <br />
                            {photo.Location} <span>&#183;</span> {photo.Date}
                        </figcaption>
                        <figcaption className="w-full bg-teal-700">
                            <button
                                className="text-white text-sm p-2 text-center w-full cursor-pointer"
                                onClick={() => {
                                    setPresetValues({
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
                                    openEditModal();
                                }
                                }  // Triggers the modal
                                style={{ border: 'none', background: 'none' }}  // Make it look like a regular figcaption
                            >
                                EDIT
                            </button>

                            {isEditModalOpen && (
                                <Modal closeModal={closeEditModal} handleFormSubmit={handleFormSubmit} initialValues={presetValues} />
                            )}
                        </figcaption>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditThreeColumn;



