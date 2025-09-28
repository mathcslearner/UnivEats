import React, {useState, type ChangeEvent, type FormEvent} from 'react';

export interface MealPayload {
    title: string;
    description: string;
    price: number;
    cuisine: string;
    dietary_tags: string[];
    availability: string;
    pickup_location: string;
    image_url: string;
}

type AddMealButtonProps = {
    onSubmit: (meal: Omit<MealPayload, "image_url">, imageFile: File) => Promise<void>;
}

const AddMealButton:React.FC<AddMealButtonProps> = ({onSubmit}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<MealPayload>({
        title: "",
        description: "",
        price: 0,
        cuisine: "",
        dietary_tags: [],
        availability: "",
        pickup_location: "",
        image_url: "",
    });

    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null> (null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: name==="price"? parseFloat(value) || 0: value}));
    }

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tags = e.target.value.split(",").map(tag => tag.trim());
        setFormData(prev => ({...prev, dietary_tags: tags}));
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);

        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile);
            setPreview(previewUrl);
        } else{
            setPreview(null);
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!file) {
            alert("Please select an image before submitting.");
            return;
        }
        
        setLoading(true);
        try {
            await onSubmit(formData, file);
            alert("Meal added successfully!");
            setIsOpen(false);

            setFormData({
                title: "",
                description: "",
                price: 0,
                cuisine: "",
                dietary_tags: [],
                availability: "",
                pickup_location: "",
                image_url: ""
              });
              setFile(null);
              setPreview(null);
        } catch (err) {
            console.error("Error adding meal:", err);
            alert("Failed to add meal");
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="relative">
            <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Add Meal
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-lg overflow-y-auto max-h-[90vh]">
                        <h2 className="text-xl font-semibold mb-4">
                            Add New Meal
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" required />
                            <textarea name="Description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" />
                            <input type="number" name="Price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" required />
                            <input type="text" name="cuisine" placeholder="Cuisine (e.g. Italian)" value={formData.cuisine} onChange={handleChange} className="w-full border p-2 rounded" />
                            <input type="text" name="dietary_tags" placeholder="Dietary Tags (comma separated)" value={formData.dietary_tags} onChange={handleTagsChange} className="w-full border p-2 rounded" />
                            <input type="text" name="availability" placeholder="Availability (e.g. 9am-5pm)" value={formData.availability} onChange={handleChange} className="w-full border p-2 rounded" />
                            <input type="text" name="pickup_location" placeholder="Pickup Location" value={formData.pickup_location} onChange={handleChange} className="w-full border p-2 rounded" required />

                            <div>
                                <label className="block mb-1 font-medium">Meal Image</label>
                                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" required />
                                {preview && <img src={preview} alt="Preview" className="mt-3 rounded-lg w-full object-cover" />}
                            </div>

                            <div className="flex justify-end space-x-2 mt-4">
                                <button type="button" onClick={() => setIsOpen(false)} className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400">
                                    Cancel
                                </button>
                                <button type="submit" disabled={loading} className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                    {loading? "Saving..." : "Save Meal"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddMealButton