export interface editProps {
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
            featured: string;
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
        featured: string;
    };
}

export interface deleteProps {
    closeModal: () => void;
    handleConfirm: (link: string) => void;
    link: string;
}