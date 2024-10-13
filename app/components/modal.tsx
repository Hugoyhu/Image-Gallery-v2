import { useState, useRef } from 'react';
import { useRouter } from "next/navigation";

interface ModalProps {
    closeModal: () => void;
    handleFormSubmit: (formData: 
        {
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
        }) => void;
    initialValues: {
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
    };
}

const Modal: React.FC<ModalProps> = ({ closeModal, handleFormSubmit, initialValues }) => {
    const router = useRouter();

    const modelRef = useRef<HTMLInputElement>(null);
    const lensRef = useRef<HTMLInputElement>(null);
    const focalRef = useRef<HTMLInputElement>(null);
    const apertureRef = useRef<HTMLInputElement>(null);
    const exposureRef = useRef<HTMLInputElement>(null);
    const isoRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLInputElement>(null);
    const featuredRef = useRef<HTMLInputElement>(null);

    console.log(initialValues);

    const onSubmit = (e: React.FormEvent) => {
        const formData = {
            link: initialValues.link,
            Model: modelRef.current.value,
            Lens: lensRef.current.value,
            Focal: focalRef.current.value,
            FNumber: apertureRef.current.value,
            Exposure: exposureRef.current.value,
            ISO: Number(isoRef.current.value),
            location: locationRef.current.value,
            Label: labelRef.current.value,
            featured: Boolean(featuredRef.current.value),
        };

        handleFormSubmit(formData);
        closeModal(); 
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Edit Fields</h2>

                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Model</label>
                        <input
                            type="text"
                            defaultValue={initialValues.Model}
                            ref={modelRef}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Lens</label>
                        <input
                            type="text"
                            defaultValue={initialValues.Lens}
                            ref={lensRef}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Focal Length</label>
                        <input
                            type="text"
                            defaultValue={initialValues.Focal}
                            ref={focalRef}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Aperture</label>
                        <input
                            type="text"
                            defaultValue={initialValues.FNumber}
                            ref={apertureRef}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Exposure Time</label>
                        <input
                            type="text"
                            defaultValue={initialValues.Exposure}
                            ref={exposureRef}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">ISO Speed</label>
                        <input
                            type="text"
                            defaultValue={initialValues.ISO}
                            ref={isoRef}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Location</label>
                        <input
                            type="text"
                            defaultValue={initialValues.location}
                            ref={locationRef}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Category / Label</label>
                        <input
                            type="text"
                            defaultValue={initialValues.Label}
                            ref={labelRef}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Featured?</label>
                        <input
                            type="text"
                            defaultValue={String(initialValues.featured)}
                            ref={featuredRef}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={onSubmit}
                        >   
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
