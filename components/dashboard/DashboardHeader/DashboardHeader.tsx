import Image from "next/image";
import { Avtar, GlobalSearchbar } from "@/components/core";

type GlobalSearchbarProps = {
    data: any[];
    onSearch: (filteredData: any[]) => void;
};

export const DashboardHeader = ({ data, onSearch }: GlobalSearchbarProps) => {
    return (
        <div className="bg-white shadow-sm">
            <div className="container mx-auto ">
                <header className="flex  shrink-0 items-center px-4 py-3 gap-10 ">
                    <div className="w-[30%]">
                        <Image src="/images/skilline.png" width={1331} height={182} alt="logo" className="w-[60%]" />
                    </div>
                    <div className="w-[55%]">
                        <GlobalSearchbar data={data} onSearch={onSearch} />
                    </div>
                    <div className="flex gap-2 w-[15%] justify-end">
                        <Avtar />
                    </div>
                </header>
            </div>
        </div>
    )
}

