import React, { FormEvent, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { MainButton } from '../../buttons/mainButton';
import agent from '../../../app/api/agent';
import { toast } from 'react-toastify';
import { ICategory } from '../../../app/models/category';

interface IProps {
    category: ICategory;
    categories: ICategory[];
}

const EditCategories: React.FC<IProps> = ({ category, categories }) => {
    const [newCategory, setNewCategory] = useState<ICategory>(category);
    const [newCategories, setNewCategories] = useState<ICategory[]>(categories);

    const handleInputEditChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setNewCategory({ ...newCategory, [name]: value });
    }
    const handleEditCategory = (category: ICategory) => {
        try {
            agent.Categories.update(category).then(() => {
                setNewCategories([...newCategories.filter(a => a.id !== category.id), category])
                toast.success('Successfully edited category!');
            })
        } catch (e) {
            toast.error('Could not edit category!');
            console.error(e);
        }
    }
    const handleSubmit = (e: any) => {
        // e.preventDefault();
        handleEditCategory(newCategory);
        // console.log(newCategory);
    }
    return (
        <div>
            <form onSubmit={handleSubmit} action='/dashboard/categories'>
                <div className="editingTopbar">
                    <h1>Editing Category: {category.title}</h1>
                </div>
                <div className='editingFields'>
                    <div className='primaryEditFields'>
                        <h2>Category Details</h2>
                        <TextField
                            onChange={handleInputEditChange}
                            required
                            id="outlined-required"
                            label="Title"
                            name="title"
                            defaultValue={category.title}
                            variant="outlined"
                            className='editPrimaryInputField'
                        />
                        <TextField
                            onChange={handleInputEditChange}
                            required
                            id="outlined-required"
                            label="Description"
                            name="description"
                            multiline
                            rows={7}
                            defaultValue={category.description}
                            variant="outlined"
                            className='editPrimaryInputField'
                        />
                    </div>
                </div>
                <div className='submitEditBtn'>
                    <button className='submitEditBtn'><MainButton title='Submit' component='a' /></button>
                </div>
            </form>
        </div>
    )
}
export default EditCategories
