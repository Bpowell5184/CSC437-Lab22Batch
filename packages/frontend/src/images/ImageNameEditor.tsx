import { useState } from "react";

interface INameEditorProps {
    initialValue: string;
    imageId: string;
    onNameChange: (imageId: string, newName: string) => void;
}

export function ImageNameEditor(props: INameEditorProps) {
    const [isEditingName, setIsEditingName] = useState(false);
    const [input, setInput] = useState(props.initialValue);
    const [isWorking, setIsWorking] = useState(false);
    const [error, setError] = useState(false);

    async function handleSubmitPressed() {
        setIsWorking(true);
        setError(false);

        try {
            const response = await fetch("/api/images");
            if (!response.ok) throw new Error("Failed to fetch");

            await response.json();

            props.onNameChange(props.imageId, input);
            setIsEditingName(false);
        } catch (err) {
            setError(true);
        } finally {
            setIsWorking(false);
        }
    }

    if (isEditingName) {
        return (
            <div style={{ margin: "1em 0" }}>
                <label>
                    New Name <input value={input} onChange={e => setInput(e.target.value)}/>
                </label>
                <button disabled={input.length === 0} onClick={handleSubmitPressed}>Submit</button>
                <button onClick={() => setIsEditingName(false)}>Cancel</button>
                {isWorking && <p>Working...</p>}
                {error && <p style={{ color: "red" }}>Error: Please try again.</p>}
            </div>
        );
    } else {
        return (
            <div style={{ margin: "1em 0" }}>
                <button onClick={() => setIsEditingName(true)}>Edit name</button>
            </div>
        );
    }
}