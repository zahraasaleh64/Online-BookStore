import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Stack,
    TextField,
    MenuItem
} from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        category: '',
        image: ''
    });

    const [selectedFile, setSelectedFile] = useState(null);

    const categories = ['Fiction', 'Classic', 'Business', 'Career', 'Fantasy', 'Non-Fiction'];

    useEffect(() => {
        if (isEdit) {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`/api/products/${id}`);
                    const data = await response.json();
                    setFormData(data);
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            };
            fetchProduct();
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isEdit ? `/api/products/${id}` : '/api/products';
            const method = isEdit ? 'PUT' : 'POST';

            const data = new FormData();
            data.append('title', formData.title);
            data.append('author', formData.author);
            data.append('price', formData.price);
            data.append('category', formData.category);
            data.append('image', formData.image); // Keep the URL option as fallback
            if (selectedFile) {
                data.append('imageFile', selectedFile);
            }

            const response = await fetch(url, {
                method,
                body: data
            });

            if (response.ok) {
                navigate('/products');
            }
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    return (
        <DashboardCard title={isEdit ? "Edit Product" : "Add New Product"}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        name="title"
                        label="Product Title"
                        variant="outlined"
                        fullWidth
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        name="author"
                        label="Author"
                        variant="outlined"
                        fullWidth
                        value={formData.author}
                        onChange={handleChange}
                    />
                    <TextField
                        name="price"
                        label="Price (e.g. $19.99)"
                        variant="outlined"
                        fullWidth
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <TextField
                        name="category"
                        label="Category"
                        variant="outlined"
                        fullWidth
                        select
                        value={formData.category}
                        onChange={handleChange}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} mb={1}>
                            Product Image
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Button
                                variant="outlined"
                                component="label"
                            >
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Button>
                            {selectedFile && (
                                <Typography variant="body2">
                                    {selectedFile.name}
                                </Typography>
                            )}
                        </Stack>
                        <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                            Or provide an image URL:
                        </Typography>
                        <TextField
                            name="image"
                            label="Image URL"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={formData.image}
                            onChange={handleChange}
                            sx={{ mt: 1 }}
                        />
                    </Box>

                    <Box>
                        <Button variant="contained" color="primary" type="submit" size="large">
                            {isEdit ? "Update Product" : "Save Product"}
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => navigate('/products')} sx={{ ml: 2 }} size="large">
                            Cancel
                        </Button>
                    </Box>
                </Stack>
            </form>
        </DashboardCard>
    );
};

export default ProductForm;
