import { X } from "lucide-react";

function MediaPreview({ mediaPreviews, onRemove }) {
    if (mediaPreviews.length === 0) return null;

    return (
        <div className="mt-3 flex gap-2 flex-wrap">
            {mediaPreviews.map((preview, index) => (
                <div
                    key={index}
                    className="relative rounded-xl overflow-hidden group"
                >
                    {preview.type === "video" ? (
                        <video
                            src={preview.url}
                            className="h-40 w-auto max-w-[200px] object-cover rounded-xl"
                        />
                    ) : (
                        <img
                            src={preview.url}
                            alt={`Preview ${index + 1}`}
                            className="h-40 w-auto max-w-[200px] object-cover rounded-xl"
                        />
                    )}
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="absolute top-2 right-2 p-1 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X className="h-4 w-4 text-white" />
                    </button>
                </div>
            ))}
        </div>
    );
}

export default MediaPreview;
