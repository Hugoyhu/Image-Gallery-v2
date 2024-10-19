// desktop version

import clientPromise from "@/lib/mongodb";
import React, { useState } from 'react';
import EditModal from '@/app/components/editModal';
import DeleteModal from '@/app/components/deleteModal';
import { useRouter } from "next/navigation";
import EditPictureColumn from "@/app/components/editPictureColumn";

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
    featured: string;
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

const deletePhoto = async (link: string) => {
    const response = await fetch('/api/delete', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(link),
    });

    const data = await response.json();
    console.log(data);
}


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


    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const openDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
    };



    const handleFormSubmit = (updatedFormData: any) => {
        updatePhoto(updatedFormData).then(() => {
            router.refresh();
        });
    };

    const handleImageDelete = (link: any) => {
        deletePhoto(link).then(() => {
            router.refresh();
        })
    }

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
        featured: ""
    });

    const [link, setLink] = useState({
        link: ""
    });


    return (
        <div className="flex flex-row justify-between">
            <EditPictureColumn
                data={{
                    "column": column0,
                    "edit": {
                        "setPresetValues": setPresetValues,
                        "openEditModal": openEditModal,
                        "setLink": setLink,
                        "openDeleteModal": openDeleteModal,
                        "isEditModalOpen": isEditModalOpen,
                        "isDeleteModalOpen": isDeleteModalOpen,
                        "EditModal": EditModal,
                        "DeleteModal": DeleteModal,
                        "closeEditModal": closeEditModal,
                        "closeDeleteModal": closeDeleteModal,
                        "handleFormSubmit": handleFormSubmit,
                        "handleImageDelete": handleImageDelete,
                        "presetValues": presetValues,
                        "link": link.link
                    }
                }}
            />

            <EditPictureColumn
                data={{
                    "column": column1,
                    "edit": {
                        "setPresetValues": setPresetValues,
                        "openEditModal": openEditModal,
                        "setLink": setLink,
                        "openDeleteModal": openDeleteModal,
                        "isEditModalOpen": isEditModalOpen,
                        "isDeleteModalOpen": isDeleteModalOpen,
                        "EditModal": EditModal,
                        "DeleteModal": DeleteModal,
                        "closeEditModal": closeEditModal,
                        "closeDeleteModal": closeDeleteModal,
                        "handleFormSubmit": handleFormSubmit,
                        "handleImageDelete": handleImageDelete,
                        "presetValues": presetValues,
                        "link": link.link
                    }
                }}
            />

            <EditPictureColumn
                data={{
                    "column": column2,
                    "edit": {
                        "setPresetValues": setPresetValues,
                        "openEditModal": openEditModal,
                        "setLink": setLink,
                        "openDeleteModal": openDeleteModal,
                        "isEditModalOpen": isEditModalOpen,
                        "isDeleteModalOpen": isDeleteModalOpen,
                        "EditModal": EditModal,
                        "DeleteModal": DeleteModal,
                        "closeEditModal": closeEditModal,
                        "closeDeleteModal": closeDeleteModal,
                        "handleFormSubmit": handleFormSubmit,
                        "handleImageDelete": handleImageDelete,
                        "presetValues": presetValues,
                        "link": link.link
                    }
                }}
            />


        </div>
    );
};

export default EditThreeColumn;



