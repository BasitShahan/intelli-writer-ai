"use client"
import React, { useState } from 'react';
import Button from "@/components/Button";
import Select from "react-select";
import Editor from '../../../../../ckEditor/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import createBlog from '@/utils/createBlog';
import { MdCloudUpload } from 'react-icons/md';

interface BlogDataProps {
    title: string;
    description: string;
    publishDate: string;
    image: File | null;
    slug: string;
    tags: string;
    category: string;
}
interface BlogValidationDataProps {
    title?: string | null;
    description?: string | null;
    publishDate?: string | null;
    image?: string | null;
    slug?: string | null;
    tags?: string | null;
    category?: string | null;
}
interface CustomButtonProps {
    title: string;
    btnType?: "button" | "submit" | "reset" | undefined;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; // Adjusted type
}

const Page = () => {
    const [categoryOptions] = useState<any>([
        { label: 'Blog Content', value: 'Blog Content' },
        { label: 'Social Media', value: 'Social Media' },
        { label: 'Marketing', value: 'Marketing' },
        { label: "Website", value: "Website" },
        { label: "Course Builder", value: "Course Builder" },
    ]);
    const [image, setImage] = useState<File | Blob | null>();
    const [validationError, setValidationError] = useState<BlogValidationDataProps | null>(null);
    
    
    const initialFormData: BlogDataProps = {
        title: '',
        description: '',
        publishDate: '',
        image: null,
        slug: '',
        tags: '',
        category: ''
    };
    
    const [formData, setFormData] = useState<BlogDataProps|any>(initialFormData);
    

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setFormData({
                ...formData,
                image: file
            });
            setImage(file);
        }
    };

    const handleCancelImage = () => {
        setImage(null);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const fieldErrors:any = {};
    
            // Define required fields
            const requiredFields = ['title', 'description', 'publishDate', 'image', 'slug', 'tags', 'category'];
    
            // Validate each required field
            requiredFields.forEach(field => {
                if (!formData[field]) {
                    fieldErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
                }
            });
    
            // Set validation errors if any
            if (Object.keys(fieldErrors).length > 0) {
                setValidationError(fieldErrors);
                return;
            }
    
            // If no validation errors, proceed with form submission
            console.log(formData);
            const result = await createBlog(formData);
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name + value);
        setFormData((prev: any) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditorChange = (content: string) => {
        setFormData({
            ...formData,
            description: content
        });
    };

    //Editor
    const editorConfig = {
        toolbar: {
            items: [
                'undo', 'redo',
                '|', 'heading',
                '|', 'fontSize', 'fontFamily',
                '|', 'bold', 'italic', 'strikethrough', 'underline',
                '|', 'link', 'bulletedList', 'numberedList', 'blockQuote',
                '|', 'alignment', 'fontColor', 'fontBackgroundColor',
                '|', 'indent', 'outdent',
                '|', 'highlight', 'removeFormat',
                '|', 'code', 'codeBlock'
            ],
            shouldNotGroupWhenFull: false
        }
    }

    return (
        <div className="py-10 px-3 md:px-[5%] min-h-screen w-full bg-opacity-80  bg-gradient-to-b from-[#0B0427] via-[#20082F] to-[#0B0427] text-white">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Create New Blog</h2>
            <form className='flex md:flex-row flex-col border border-t-[#3d2b87c5] border-b-[#3d2b87cc] border-r-[#6b2c92d2] border-l-[#6b2c92d7]  shadow-2xl rounded-lg p-2' onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleFormSubmit(e)}>
                <div className="flex-4 md:w-4/5 w-full p-0 md:p-8">
                    <div className="mb-4">
                        <label htmlFor="title" className="block mb-2">Title</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-transparent border border-[#0F2C7F] rounded-lg px-4 py-2" />
                        {validationError?.title && <div className="text-red-500 m-1">{validationError.title}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-2">Description</label>
                        {validationError?.description && <div className="text-red-500 m-1">{validationError.description}</div>}
                    </div>
                </div>

                <div className="flex-2 md:w-1/4 w-full p-0 md:p-8">
                    <div className="mb-4">
                        <label htmlFor="publishDate" className="block mb-2">Publish Date</label>
                        <input type="date" id="publishDate" name="publishDate" value={formData.publishDate} onChange={handleInputChange} className="w-full bg-transparent border border-[#0F2C7F] rounded-lg px-4 py-2" />
                        {validationError?.publishDate && <div className="text-red-500 m-1">{validationError.publishDate}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block mb-2">Feature Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="hidden"
                            id="upload-image"
                        />
                        <div
                            className="cursor-pointer w-full h-[8vh] rounded-md border border-gray-600 bg-[rgba(32,45,72,0.41)] flex gap-3 items-center justify-center px-2"
                            onClick={() => document.getElementById("upload-image")?.click()}
                        >
                            <MdCloudUpload className="text-2xl md:text-4xl text-white" />
                            <span className="text-sm leading-none">Upload Image</span>
                        </div>

                        {image && (
                            <div className="mt-2">
                                <img src={URL.createObjectURL(image)} alt="Uploaded Image" className="w-full rounded-lg" />
                                <button onClick={handleCancelImage} className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Remove Image</button>
                            </div>
                        )}
                        {validationError?.image && <div className="text-red-500 m-1">{validationError.image}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="slug" className="block mb-2">Slug</label>
                        <input type="text" id="slug" name="slug" value={formData.slug} onChange={handleInputChange} className="w-full bg-transparent border border-[#0F2C7F] rounded-lg px-4 py-2" />
                        {validationError?.slug && <div className="text-red-500 m-1">{validationError.slug}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tags" className="block mb-2">Tags</label>
                        <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleInputChange} className="w-full bg-transparent border border-[#0F2C7F] rounded-lg px-4 py-2" />
                        {validationError?.tags && <div className="text-red-500 m-1">{validationError.tags}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block mb-2">Category</label>
                        <Select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={(selectedOption) => setFormData({ ...formData, category: selectedOption ? selectedOption : "" })}
                            options={categoryOptions}
                            className="w-full bg-transparent border-[#0F2C7F] rounded-lg"
                            placeholder="Select Category"
                        />
                        {validationError?.category && <div className="text-red-500 m-1">{validationError.category}</div>}
                    </div>
                    <div className='w-full flex items-center justify-center my-5'>
                        <Button title="Publish" btnType="submit" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Page;
