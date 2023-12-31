import { useState, useEffect } from "react";
import { listFilesInPath } from "../../utils/tauriApi.ts";
import File from "./File.tsx";

type propTypes = {
    // Define the prop types here
    path: string;
    changeFile: (s: string) => void;
};

function SideBar(props: propTypes) {
    const path = props.path;
    const changeFile = props.changeFile;
    const [filesList, updateFilesList] = useState<string[]>([]);

    // list files on path change
    useEffect(() => {
        try {
            (async () => {
                const filesList = await listFilesInPath(path);
                console.log(`Files listed in ${path}: `, filesList);
                updateFilesList(filesList);
            })();
        } catch (error) {
            console.log("Cannot list files: " + error);
        }
    }, [path]);

    return (
        <nav>
            <ul className="mb-8 mt-8 w-[100%]">
                {filesList.map((item, index) => {
                    return <File key={index} item={item} callback={changeFile} />;
                })}
            </ul>
        </nav>
    );
}

export default SideBar;
