import LoginSignoutButton from '@/app/components/loginSignoutButton';
import Header from '@/app/components/header';
import SingleColumn from "@/app/components/singleColumn";
import EditSwitcher from "@/app/components/edit";
import ButtonRow from "@/app/components/selectButtons"
import DropdownButton from './components/selectDropdown';

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

export function generateHTML(highlight: string, numRows: number, column0: { [key: string]: any }[], column1: { [key: string]: any }[], column2: { [key: string]: any }[]) {
    if (numRows == 3) {
        return (
            <div>
                <LoginSignoutButton />
                <Header />
                <ButtonRow highlight={highlight} />


                <EditSwitcher columns={{ "column0": column0, "column1": column1, "column2": column2 }} />
            </div>
        );
    } else {
        return (
            <div>
                <DropdownButton highlight={highlight} />
                <Header />
                

                <SingleColumn columns={{ "column0": column0 }} />
            </div>
        );
    }
}

export function formatTimecode(timecode: string): string {
    const date = new Date(timecode);

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    return date.toLocaleDateString('en-US', options);
}
