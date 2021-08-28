import React, { FormEvent, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { MainButton } from '../../buttons/mainButton';
import agent from '../../../app/api/agent';
import { toast } from 'react-toastify';
import { ICategory } from '../../../app/models/category';

interface IProps {
    categories: ICategory[];
}

const CreateCategory: React.FC<IProps> = (props) => {
    const [categories, setCategories] = useState<ICategory[]>(props.categories);
    const [category, setCategory] = useState<ICategory>({
        title: '',
        description: '',
        photos: [],
        events: []
    });
    const handleInputCategoryChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setCategory({ ...category, [name]: value });
    }
    const handleCreateCategory = (category: ICategory) => {
        try {
            agent.Categories.create(category).then(() => {
                toast.success('Successfully created category!');
                setCategories([...categories, category])
            })
        } catch (e) {
            e.preventDefault();
            toast.error('Could not create category!');
            console.error(e);
        }
    }
    const handleSubmit = (e: any) => {
        // e.preventDefault();
        handleCreateCategory(category);
        // console.log(category);
    }
    return (
        <div>
            <form onSubmit={handleSubmit} action='/dashboard/categories'>
                <div className='editingFields'>
                    <div className='primaryEditFields'>
                        <h2>Category Details</h2>
                        <TextField
                            onChange={handleInputCategoryChange}
                            required
                            id="outlined-required"
                            label="Title"
                            name="title"
                            variant="outlined"
                            className='editPrimaryInputField'
                        />
                        <TextField
                            onChange={handleInputCategoryChange}
                            required
                            id="outlined-required"
                            label="Description"
                            name="description"
                            value={category.description}
                            variant="outlined"
                            className='editPrimaryInputField'
                        />
                    </div>
                </div>
                <div className='editingFields'>
                </div>
                <div className='submitEditBtn'>
                    <button className='submitEditBtn'><MainButton title='Submit' component='a' /></button>
                </div>
            </form>
        </div>
    )
}
export default CreateCategory
