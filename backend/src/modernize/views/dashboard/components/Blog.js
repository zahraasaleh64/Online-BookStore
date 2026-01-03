import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Rating, Tooltip, Fab } from '@mui/material';
import { Stack } from '@mui/system';
import { IconBasket } from '@tabler/icons-react';
import BlankCard from '../../../components/shared/BlankCard';

const Blog = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.slice(0, 4)); // Only show top 4 for the dashboard
            })
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    return (
        <Grid container spacing={3}>
            {products.map((product, index) => (
                <Grid
                    key={index}
                    item
                    xs={12}
                    md={4}
                    lg={3}>
                    <BlankCard>
                        <Typography component={Link} to="/">
                            <img
                                src={product.image.startsWith('http') ? product.image : `${product.image}`}
                                alt={product.title}
                                width="100%"
                                style={{ height: '250px', objectFit: 'cover' }}
                            />
                        </Typography>
                        <Tooltip title="Add To Cart">
                            <Fab
                                size="small"
                                color="primary"
                                sx={{ bottom: '75px', right: '15px', position: 'absolute' }}
                            >
                                <IconBasket size="16" />
                            </Fab>
                        </Tooltip>
                        <CardContent sx={{ p: 3, pt: 2 }}>
                            <Typography variant="h6" noWrap>{product.title}</Typography>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="h6">${product.price}</Typography>
                                </Stack>
                                <Rating name="read-only" size="small" value={5} readOnly />
                            </Stack>
                        </CardContent>
                    </BlankCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default Blog;
