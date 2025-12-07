const listingSchema = {
  name: { required: true, minLength: 5 },
  image: { required: true },
  price: { required: true, min: 0 },
  category: { required: true },
  description: { required: true, minLength: 10 },
};

export function validateListing(formData) {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = 'Product name is required';
  } else if (formData.name.length < 5) {
    errors.name = 'name must be at least 5 characters';
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
