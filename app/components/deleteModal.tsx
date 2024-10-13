import React from 'react';
import { deleteProps } from "@/app/components/props/propInterface"


const Modal: React.FC<deleteProps> = ({ closeModal, handleConfirm, link }) => {
    const onSubmit = (e: React.FormEvent) => {
        handleConfirm(link);
        closeModal();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
                <p className="mb-6">This action cannot be undone.</p>
                <div className="flex justify-between">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded w-1/2 mr-2"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>

                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded w-1/2 ml-2"
                        onClick={onSubmit}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
