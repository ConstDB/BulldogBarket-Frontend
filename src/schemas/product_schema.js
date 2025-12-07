const listingSchema = {
  title: { required: true, minLength: 5 },
  description: { required: true, minLength: 10 },
  price: { required: true, min: 0 },
  category: { required: true },
  image: { required: true }
};

export function validateListing(formData) {
  const errors = {};

  if (!formData.title?.trim()) {
    errors.title = 'Product title is required';
  } else if (formData.title.length < 5) {
    errors.title = 'Title must be at least 5 characters';
  }

  if (!formData.description?.trim()) {
    errors.description = 'Description is required';
  } else if (formData.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }

  if (!formData.price) {
    errors.price = 'Price is required';
  } else if (Number(formData.price) <= 0) {
    errors.price = 'Price must be greater than 0';
  }

  if (!formData.category) {
    errors.category = 'Please select a category';
  }

  if (!formData.itemImageFile) {
    errors.image = 'Please upload a product image';
  }

  return errors;
}